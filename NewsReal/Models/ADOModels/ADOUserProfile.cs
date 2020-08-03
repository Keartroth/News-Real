using System;

namespace NewsReal.Models.ADOModels
{
    public class ADOUserProfile
    {
        public int Id { get; set; }

        public string FirebaseUserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DisplayName { get; set; }

        public string Email { get; set; }

        public string ImageLocation { get; set; }

        public DateTime CreateDateTime { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}