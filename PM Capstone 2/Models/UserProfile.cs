using System.ComponentModel.DataAnnotations;

namespace PropertyManager.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public bool IsAdmin { get; set; }

        [Required]
        public bool IsEmployee { get; set; }

        public string FullName
        {
            get
            {
                return $"{LastName}, {FirstName}";
            }
        }
        public string Phone { get; set; }

        public string Employment { get; set; }

        public string EmergencyContactName { get; set; }

        public string EmergencyContactPhone { get; set; }

        public string GeneralNotes { get; set; }

        public Property? Property { get; set; }


    }
}
