using JWT.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using JWT.Repo;
using Microsoft.Extensions.Configuration;

namespace JWT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuth repo;

        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration, IAuth repository)
        {
            repo = repository;
            _configuration = configuration;
        }
        [HttpPost("login")]
        public IActionResult Login(Login user)
        {
            
            var res = repo.Authenticate(user.email, user.password);
            if (res!=null)
            {
                var token = CreateToken(user);
                return Ok(new { token = token, res = res });
            }
            return BadRequest("no user");
        }

        

        private string CreateToken(Login user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.email)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my top secret key"));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                 claims: claims,
                 expires: DateTime.Now.AddMinutes(30),
                 signingCredentials: creds
             );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
