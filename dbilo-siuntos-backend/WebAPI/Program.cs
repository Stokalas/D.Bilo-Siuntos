global using Infrastructure;
global using Microsoft.EntityFrameworkCore;
using Infrastructure.DataAccess;
using Infrastructure.Services;
using Infrastructure.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Infrastructure.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using WebAPI;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(cors =>
        {
            cors.AddPolicy("dev", builder => builder.AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed(origin => true).AllowCredentials());
        });

builder.Services.AddIdentity<User, IdentityRole<int>>().AddEntityFrameworkStores<DatabaseContext>()
       .AddDefaultTokenProviders();

var tokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("AppSettings:Secret"))),
    ValidateIssuer = false,
    ValidateAudience = false,
    ValidateLifetime = false,
};

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Cookie.Name = "token";
                    options.TicketDataFormat = new CustomJwtDataFormat(SecurityAlgorithms.HmacSha256,
                        tokenValidationParameters);
                    options.Events.OnRedirectToLogin = (context) =>
                    {
                        context.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    };
                });

builder.Services.AddLogging(loggingBuilder =>
{
    loggingBuilder.AddFile("logs/app_{0:yyyy}-{0:MM}-{0:dd}.log", fileLoggerOpts =>
    {
        fileLoggerOpts.FormatLogFileName = fName =>
        {
            return String.Format(fName, DateTime.UtcNow);
        };
    });
});

builder.Services.AddScoped<IParcelService, ParcelService>();
builder.Services.AddSingleton<ITrackingNumberGenerator, TrackingNumberGenerator>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITerminalService, TerminalService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<DatabaseContext>();
    context.Database.Migrate();

    var roleManager = services.GetRequiredService<RoleManager<IdentityRole<int>>>();

    if (!roleManager.RoleExistsAsync(UserRoles.Admin).Result)
    {
        roleManager.CreateAsync(new IdentityRole<int>(UserRoles.Admin)).Wait();
    }
    if (!roleManager.RoleExistsAsync(UserRoles.User).Result)
    {
        roleManager.CreateAsync(new IdentityRole<int>(UserRoles.User)).Wait();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("dev");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();