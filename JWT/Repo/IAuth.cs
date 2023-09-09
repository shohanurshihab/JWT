namespace JWT.Repo
{
    public interface IAuth
    {
        int Authenticate(string email, string password);
    }
}
