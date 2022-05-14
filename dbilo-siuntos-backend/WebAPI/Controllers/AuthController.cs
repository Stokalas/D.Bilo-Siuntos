using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.DataAccess;
using Infrastructure.Interfaces;
using Infrastructure.Services;
using Infrastructure.Contracts.Authentication;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<User> userManager, IConfiguration configuration, RoleManager<IdentityRole<int>> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status409Conflict, "User already exists!");

            var user = new User
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = model.Email,
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            var result = await _userManager.CreateAsync(user, model.Password);

            //Add every new user to this role:
            if (await _roleManager.RoleExistsAsync(UserRoles.User))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.User);
            }

            return !result.Succeeded
                ? StatusCode(StatusCodes.Status403Forbidden,
                    "Your password does not meet the requirements.")
                : Ok("User created successfully!");
        }

        [HttpPost]
        [Route("newcookie")]
        public async Task<IActionResult> NewCookie()
        {
            if (Request.Cookies["token"] is null)
                return Ok("noCookie");

            var token = new JwtSecurityTokenHandler().ReadJwtToken(Request.Cookies["token"]);
            var email = token.Claims.First(claim => claim.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);
            var userRolesList = await _userManager.GetRolesAsync(user);

            var response = new LoginResponse()
            {
                Email = email,
                ID = user.Id,
                Role = userRolesList.Count == 0 ? null : userRolesList[0]
            };

            if (token.Claims.Any(claim => claim.Type == "rememberMe"))
                return Ok(response);

            var authClaims = new List<Claim>
            {
                new Claim("email", user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var role in userRolesList)
                authClaims.Add(new Claim(ClaimTypes.Role, role));

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AppSettings:Secret"]));

            var expirationTime = DateTime.Now.AddMinutes(15);

            var newToken = new JwtSecurityToken(
                expires: expirationTime,
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            var cookieOptions = new CookieOptions
            {
                SameSite = SameSiteMode.None,
                HttpOnly = true,
                Secure = true,
                Expires = expirationTime,
            };

            HttpContext.Response.Cookies.Append("token", new JwtSecurityTokenHandler().WriteToken(newToken), cookieOptions);

            return Ok(response);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return StatusCode(StatusCodes.Status403Forbidden,
                    "Check your details and try again.");

            var authClaims = new List<Claim>
            {
                new Claim("email", user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var userRolesList = await _userManager.GetRolesAsync(user);

            foreach (var role in userRolesList)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            if (model.Remember)
                authClaims.Add(new Claim("rememberMe", "true"));

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AppSettings:Secret"]));

            var expirationTime = model.Remember ? DateTime.Now.AddMonths(1) : DateTime.Now.AddMinutes(15);

            var token = new JwtSecurityToken(
                expires: expirationTime,
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            var cookieOptions = new CookieOptions
            {
                SameSite = SameSiteMode.None,
                HttpOnly = true,
                Secure = true,
                Expires = expirationTime,
            };

            HttpContext.Response.Cookies.Append("token", new JwtSecurityTokenHandler().WriteToken(token), cookieOptions);

            return Ok(new LoginResponse()
            {
                ID = user.Id,
                Email = user.Email,
                Role = userRolesList.Count <= 0 ? null : userRolesList[0]
            });
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = "Cookies")]
        [Route("logout")]
        public ActionResult Logout()
        {
            HttpContext.Response.Cookies.Append("token", "",
                new CookieOptions
                {
                    Expires = DateTimeOffset.MinValue,
                    SameSite = SameSiteMode.None,
                    HttpOnly = true,
                    Secure = true,
                });
            return Ok();
        }
    }
}
