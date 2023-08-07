using PropertyManager.Models;
using PropertyManager.Utils;
using System.Data;

namespace PropertyManager.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirstName, LastName, Email, IsEmployee, IsAdmin, Phone, Employment, EmergencyContactName, EmergencyContactPhone, GeneralNotes 
                        FROM UserProfile
                        ";

                    var reader = cmd.ExecuteReader();

                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfiles.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            IsEmployee = reader.GetBoolean(reader.GetOrdinal("IsEmployee")),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin")),
                            Phone = DbUtils.GetString(reader, "Phone"),
                            Employment = DbUtils.GetString(reader, "Employment"),
                            EmergencyContactName = DbUtils.GetString(reader, "EmergencyContactName"),
                            EmergencyContactPhone = DbUtils.GetString(reader, "EmergencyContactPhone"),
                            GeneralNotes = DbUtils.GetString(reader, "GeneralNotes")
                        });
                    }

                    reader.Close();

                    return userProfiles;
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id AS UId, u.FirstName, u.LastName, u.Email, u.IsEmployee, u.IsAdmin, u.Phone, u.Employment, u.EmergencyContactName, u.EmergencyContactPhone, u.GeneralNotes, p.Id AS PId, p.StreetAddress, p.City, p.State, p.Type, p.SizeDescription, p.Rent, p.Vacant, p.UserProfileId 
                        FROM UserProfile u
                        LEFT JOIN Property p ON u.Id = p.UserProfileId
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    UserProfile userProfile = null;
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            IsEmployee = reader.GetBoolean(reader.GetOrdinal("IsEmployee")),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin")),
                            Phone = DbUtils.GetString(reader, "Phone"),
                            Employment = DbUtils.GetString(reader, "Employment"),
                            EmergencyContactName = DbUtils.GetString(reader, "EmergencyContactName"),
                            EmergencyContactPhone = DbUtils.GetString(reader, "EmergencyContactPhone"),
                            GeneralNotes = DbUtils.GetString(reader, "GeneralNotes"),
                            Property = new Property()
                            {
                                Id = DbUtils.GetInt(reader, "PId"),
                                StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                                City = DbUtils.GetString(reader, "City"),
                                State = DbUtils.GetString(reader, "State"),
                                Type = DbUtils.GetString(reader, "Type"),
                                SizeDescription = DbUtils.GetString(reader, "SizeDescription"),
                                Rent = DbUtils.GetInt(reader, "Rent"),
                                Vacant = reader.GetBoolean(reader.GetOrdinal("Vacant")),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                            }

                        };

                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FirstName, LastName, Email, IsEmployee, IsAdmin, Phone, Employment, EmergencyContactName, EmergencyContactPhone, GeneralNotes 
                        FROM UserProfile
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            IsEmployee = reader.GetBoolean(reader.GetOrdinal("IsEmployee")),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin")),
                            Phone = DbUtils.GetString(reader, "Phone"),
                            Employment = DbUtils.GetString(reader, "Employment"),
                            EmergencyContactName = DbUtils.GetString(reader, "EmergencyContactName"),
                            EmergencyContactPhone = DbUtils.GetString(reader, "EmergencyContactPhone"),
                            GeneralNotes = DbUtils.GetString(reader, "GeneralNotes")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }


        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile (FirstName, LastName, Email, IsEmployee, IsAdmin)
                        OUTPUT INSERTED.ID
                        VALUES (@FirstName, @LastName, @Email, @IsEmployee, @IsAdmin, @Phone, @Employment, @EmergencyContactName, @EmergencyContactPhone, @GeneralNotes)";
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@IsEmployee", userProfile.IsEmployee);
                    DbUtils.AddParameter(cmd, "@IsAdmin", userProfile.IsAdmin);
                    DbUtils.AddParameter(cmd, "@Phone", userProfile.Phone);
                    DbUtils.AddParameter(cmd, "@Employment", userProfile.Employment);
                    DbUtils.AddParameter(cmd, "@EmergencyContactName", userProfile.EmergencyContactName);
                    DbUtils.AddParameter(cmd, "@EmergencyContactPhone", userProfile.EmergencyContactPhone);
                    DbUtils.AddParameter(cmd, "@GeneralNotes", userProfile.GeneralNotes);
                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM UserProfile WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                           SET FirstName = @FirstName,
                               LastName = @LastName,
                               Email = @Email,
                               IsEmployee = @IsEmployee,
                               IsAdmin = @IsAdmin,
                               Phone = @Phone,
                               Employment = @Employment,
                               EmergencyContactName = @EmergencyContactName,
                               EmergencyContactPhone = @EmergencyContactPhone,
                               GeneralNotes = @GeneralNotes
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@IsEmployee", userProfile.IsEmployee);
                    DbUtils.AddParameter(cmd, "@IsAdmin", userProfile.IsAdmin);
                    DbUtils.AddParameter(cmd, "@Phone", userProfile.Phone);
                    DbUtils.AddParameter(cmd, "@Employment", userProfile.Employment);
                    DbUtils.AddParameter(cmd, "@EmergencyContactName", userProfile.EmergencyContactName);
                    DbUtils.AddParameter(cmd, "@EmergencyContactPhone", userProfile.EmergencyContactPhone);
                    DbUtils.AddParameter(cmd, "@GeneralNotes", userProfile.GeneralNotes);
                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
