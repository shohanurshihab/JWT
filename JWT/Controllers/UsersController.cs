using JWT.Model;
using JWT.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using System.IO;
namespace JWT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /*[Authorize]*/
    public class UsersController : ControllerBase
    {
        private IUserRepo repo;
        private IFileProvider _fileProvider;
        public UsersController(IUserRepo repository, IFileProvider fileProvider)
        {
            repo = repository;
            _fileProvider = fileProvider;
        }
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = repo.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromForm] User user, IFormFile? photo)
        {
            if (photo != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await photo.CopyToAsync(memoryStream);
                    user.Photo = memoryStream.ToArray();
                }
            }

            repo.Create(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromForm] User user, IFormFile? photo,int id)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            if (photo != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await photo.CopyToAsync(memoryStream);
                    user.Photo = memoryStream.ToArray();
                }
            }
            repo.Update(user);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            repo.Delete(id);
            return NoContent();
        }
        
    }

}
