// #nullable enable

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;

namespace WebAPI;

public class CustomJwtDataFormat : ISecureDataFormat<AuthenticationTicket>
{
    private readonly string _algorithm;
    private readonly TokenValidationParameters _validationParameters;

    public CustomJwtDataFormat(string algorithm, TokenValidationParameters validationParameters)
    {
        this._algorithm = algorithm;
        this._validationParameters = validationParameters;
    }

    public AuthenticationTicket? Unprotect(string? protectedText)
        => Unprotect(protectedText, null);

    public AuthenticationTicket? Unprotect(string? protectedText, string? purpose)
    {
        var handler = new JwtSecurityTokenHandler();
        ClaimsPrincipal principal;

        try
        {
            principal = handler.ValidateToken(protectedText, this._validationParameters, out var validToken);

            var validJwt = validToken as JwtSecurityToken;
            if (validJwt == null)
            {
                throw new ArgumentException("Invalid JWT");
            }
        }
        catch (Exception)
        {
            return null;
        }

        return new AuthenticationTicket(principal, new AuthenticationProperties(), "Cookie");
    }

    public string Protect(AuthenticationTicket data)
    {
        throw new NotImplementedException();
    }

    public string Protect(AuthenticationTicket data, string? purpose)
    {
        throw new NotImplementedException();
    }
}
