using NewsReal.Data;
using NewsReal.Models.EFModels;
using System.Linq;

namespace NewsReal.Repositories
{
    public class UserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile.FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public UserProfile GetByEmail(string email, string displayName)
        {
            return _context.UserProfile.FirstOrDefault(up => up.Email == email || up.DisplayName == displayName);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
    }
}