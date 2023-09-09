using JWT.Model;

namespace JWT.Repo
{
    public class UserRepo : IUserRepo
    {
        private DataContext _context;
        public UserRepo(DataContext context)
        {
            _context = context;
        }
        public void Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            _context.Users.Remove(GetById(id));
            _context.SaveChanges();
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }

        public void Update(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }
    }
}
