using NewsReal.Data;
using NewsReal.Models;
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

        public UserProfile GetByEmail(string email)
        {
            return _context.UserProfile.FirstOrDefault(up => up.Email == email);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
    }
}