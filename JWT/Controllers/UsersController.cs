using JWT.Model;
using JWT.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JWT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /*[Authorize]*/
    public class UsersController : ControllerBase
    {
        private IUserRepo repo;
        public UsersController(IUserRepo repository)
        {
            repo = repository;
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
        public IActionResult CreateUser(User user)
        {
            repo.Create(user);
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
        [AllowAnonymous]
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
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
