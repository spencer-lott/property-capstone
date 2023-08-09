using Microsoft.Extensions.Hosting;
using PropertyManager.Models;
using PropertyManager.Utils;

namespace PropertyManager.Repositories
{
    public class MaintenanceHistoryRepository : BaseRepository, IMaintenanceHistoryRepository
    {
        public MaintenanceHistoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<MaintenanceHistory> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Description, DateCompleted, DateRequested, PropertyId, UserProfileId FROM MaintenanceHistory
                        ORDER BY DateCompleted DESC                        
                        ";

                    var reader = cmd.ExecuteReader();

                    var notes = new List<MaintenanceHistory>();
                    while (reader.Read())
                    {
                        notes.Add(new MaintenanceHistory()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Description = DbUtils.GetString(reader, "Description"),
                            DateCompleted = DbUtils.GetDateTime(reader, "DateCompleted"),
                            DateRequested = DbUtils.GetDateTime(reader, "DateRequested"),
                            PropertyId = DbUtils.GetInt(reader, "PropertyId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                        });
                    }

                    reader.Close();

                    return notes;
                }
            }
        }

        public MaintenanceHistory GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Description, DateCompleted, DateRequested, PropertyId, UserProfileId FROM MaintenanceHistory
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    MaintenanceHistory note = null;
                    if (reader.Read())
                    {
                        note = new MaintenanceHistory()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Description = DbUtils.GetString(reader, "Description"),
                            DateCompleted = DbUtils.GetDateTime(reader, "DateCompleted"),
                            DateRequested = DbUtils.GetDateTime(reader, "DateRequested"),
                            PropertyId = DbUtils.GetInt(reader, "PropertyId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                        };
                    }
                    reader.Close();

                    return note;
                }
            }
        }

        public List<MaintenanceHistory> GetMaintenanceHistoryByPropertyId(int propertyId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Description, DateCompleted, DateRequested, PropertyId, UserProfileId FROM MaintenanceHistory
                        WHERE PropertyId = @propertyId
                        ORDER BY DateRequested Desc";

                    cmd.Parameters.AddWithValue("@propertyId", propertyId);
                    var reader = cmd.ExecuteReader();

                    var notes = new List<MaintenanceHistory>();

                    while (reader.Read())
                    {
                        notes.Add(new MaintenanceHistory()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Description = DbUtils.GetString(reader, "Description"),
                            DateCompleted = DbUtils.GetDateTime(reader, "DateCompleted"),
                            DateRequested = DbUtils.GetDateTime(reader, "DateRequested"),
                            PropertyId = DbUtils.GetInt(reader, "PropertyId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId")
                        });
                    }

                    reader.Close();

                    return notes;
                }
            }
        }

        public List<MaintenanceHistory> GetAllMaintenanceHistoryWithProperty()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT m.Id AS MId, m.Description, m.DateCompleted, m.DateRequested, m.PropertyId, m.UserProfileId AS MUserProfileId,  p.Id AS PId, p.StreetAddress, p.City, p.State, p.Type, p.SizeDescription, p.Rent, p.Vacant, p.UserProfileId AS PUserProfileId
                        FROM MaintenanceHistory m
                        LEFT JOIN Property p ON p.Id = m.PropertyId
                        ORDER BY m.DateCompleted ASC                        
                        ";

                    var reader = cmd.ExecuteReader();

                    var notes = new List<MaintenanceHistory>();
                    while (reader.Read())
                    {
                        notes.Add(new MaintenanceHistory()
                        {
                            Id = DbUtils.GetInt(reader, "MId"),
                            Description = DbUtils.GetString(reader, "Description"),
                            DateCompleted = DbUtils.GetDateTime(reader, "DateCompleted"),
                            DateRequested = DbUtils.GetDateTime(reader, "DateRequested"),
                            PropertyId = DbUtils.GetInt(reader, "PropertyId"),
                            UserProfileId = DbUtils.GetInt(reader, "MUserProfileId"),
                            Property = reader.IsDBNull(reader.GetOrdinal("PId"))
                                ? null
                                : new Property()
                                {
                                    Id = DbUtils.GetInt(reader, "PId"),
                                    StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                                    City = DbUtils.GetString(reader, "City"),
                                    State = DbUtils.GetString(reader, "State"),
                                    Type = DbUtils.GetString(reader, "Type"),
                                    SizeDescription = DbUtils.GetString(reader, "SizeDescription"),
                                    Rent = DbUtils.GetInt(reader, "Rent"),
                                    Vacant = reader.GetBoolean(reader.GetOrdinal("Vacant")),
                                    UserProfileId = DbUtils.GetInt(reader, "PUserProfileId")
                                }

                        });
                    }

                    reader.Close();

                    return notes;
                }
            }
        }



        public void Add(MaintenanceHistory note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO MaintenanceHistory (Description, DateCompleted, DateRequested, PropertyId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (@Description, @DateCompleted, @DateRequested, @PropertyId, @UserProfileId)";
                    DbUtils.AddParameter(cmd, "@Description", note.Description);
                    DbUtils.AddParameter(cmd, "@DateCompleted", note.DateCompleted);
                    DbUtils.AddParameter(cmd, "@DateRequested", note.DateRequested);
                    DbUtils.AddParameter(cmd, "@PropertyId", note.PropertyId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", note.UserProfileId);
                    note.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM MaintenanceHistory WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(MaintenanceHistory note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE MaintenanceHistory
                           SET Description = @Description,
                               DateCompleted = @DateCompleted,
                               DateRequested = @DateRequested,
                               PropertyId = @PropertyId,
                               UserProfileId = @UserProfileId

                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Description", note.Description);
                    DbUtils.AddParameter(cmd, "@DateCompleted", note.DateCompleted);
                    DbUtils.AddParameter(cmd, "@DateRequested", note.DateRequested);
                    DbUtils.AddParameter(cmd, "@PropertyId", note.PropertyId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", note.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Id", note.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
