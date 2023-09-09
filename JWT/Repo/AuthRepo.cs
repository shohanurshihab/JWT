using JWT.Model;
using Microsoft.AspNetCore.Http.HttpResults;

namespace JWT.Repo
{
    public class AuthRepo : IAuth
    {
        private DataContext _context;
        public AuthRepo(DataContext context)
        {
            _context = context;
        }
        public int Authenticate(string email, string password)
        {
            var data = _context.Users.FirstOrDefault(u => u.Email.Equals(email) && u.PasswordHash.Equals(password));
            return data.Id;
        }
    }

}
