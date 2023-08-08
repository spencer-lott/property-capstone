using PropertyManager.Models;

namespace PropertyManager.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Delete(int id);
        List<UserProfile> GetAll();
        List<UserProfile> GetAllWithProperty();
        UserProfile GetByEmail(string email);
        UserProfile GetById(int id);
        void Update(UserProfile userProfile);

        UserProfile GetUserProfileByIdWithProperty(int id);
    }
}