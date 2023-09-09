using JWT.Model;

namespace JWT.Repo
{
    public interface IUserRepo
    {
        IEnumerable<User> GetAll();
        User GetById(int id);
        void Create(User user);
        void Update(User user);
        void Delete(int id);
    }
}
