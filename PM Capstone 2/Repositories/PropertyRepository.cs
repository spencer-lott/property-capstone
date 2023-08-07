using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using PropertyManager.Models;
using PropertyManager.Utils;
using System.Data;
using Microsoft.Extensions.Hosting;
using System.Reflection.PortableExecutable;

namespace PropertyManager.Repositories
{
    public class PropertyRepository : BaseRepository, IPropertyRepository
    {
        public PropertyRepository(IConfiguration configuration) : base(configuration) { }

        public List<Property> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, StreetAddress, City, State, Type, SizeDescription, Rent, Vacant, UserProfileId 
                        FROM Property
                        ORDER BY State ASC
                        ";

                    var reader = cmd.ExecuteReader();

                    var properties = new List<Property>();
                    while (reader.Read())
                    {
                        properties.Add(new Property()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                            City = DbUtils.GetString(reader, "City"),
                            State = DbUtils.GetString(reader, "State"),
                            Type = DbUtils.GetString(reader, "Type"),
                            SizeDescription = DbUtils.GetString(reader, "SizeDescription"),
                            Rent = DbUtils.GetInt(reader, "Rent"),
                            Vacant = reader.GetBoolean(reader.GetOrdinal("Vacant")),
                            UserProfileId = DbUtils.GetNullableInt(reader, "UserProfileId")
                        });
                    }

                    reader.Close();

                    return properties;
                }
            }
        }

        public Property GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id AS PId, p.StreetAddress, p.City, p.State, p.Type, p.SizeDescription, p.Rent, p.Vacant, COALESCE(u.Id, -1) as UId, COALESCE(p.UserProfileId, -1) AS UserProfileId
                        FROM Property p
                        LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                        WHERE p.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Property property = null;
                    if (reader.Read())
                    {
                        property = new Property()
                        {
                            Id = DbUtils.GetInt(reader, "PId"),
                            StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                            City = DbUtils.GetString(reader, "City"),
                            State = DbUtils.GetString(reader, "State"),
                            Type = DbUtils.GetString(reader, "Type"),
                            SizeDescription = DbUtils.GetString(reader, "SizeDescription"),
                            Rent = DbUtils.GetInt(reader, "Rent"),
                            Vacant = reader.GetBoolean(reader.GetOrdinal("Vacant")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UId"),
                            }
                        };



                    }
                    reader.Close();

                    return property;
                }
            }
        }

        public void Add(Property property)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Property (StreetAddress, City, State, Type, SizeDescription, Rent, Vacant, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@StreetAddress, @City, @State, @Type, @SizeDescription, @Rent, @Vacant, @UserProfileId)";
                    DbUtils.AddParameter(cmd, "@StreetAddress", property.StreetAddress);
                    DbUtils.AddParameter(cmd, "@City", property.City);
                    DbUtils.AddParameter(cmd, "@State", property.State);
                    DbUtils.AddParameter(cmd, "@Type", property.Type);
                    DbUtils.AddParameter(cmd, "@SizeDescription", property.SizeDescription);
                    DbUtils.AddParameter(cmd, "@Rent", property.Rent);
                    DbUtils.AddParameter(cmd, "@Vacant", property.Vacant);
                    DbUtils.AddParameter(cmd, "@UserProfileId", property.UserProfileId);
                    property.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM Property WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Property property)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Property
                           SET StreetAddress = @StreetAddress,
                               City = @City,
                               State = @State,
                               Type = @Type,
                               SizeDescription = @SizeDescription,
                               Rent = @Rent,
                               Vacant = @Vacant,
                               UserProfileId = @UserProfileId

                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@StreetAddress", property.StreetAddress);
                    DbUtils.AddParameter(cmd, "@City", property.City);
                    DbUtils.AddParameter(cmd, "@State", property.State);
                    DbUtils.AddParameter(cmd, "@Type", property.Type);
                    DbUtils.AddParameter(cmd, "@SizeDescription", property.SizeDescription);
                    DbUtils.AddParameter(cmd, "@Rent", property.Rent);
                    DbUtils.AddParameter(cmd, "@Vacant", property.Vacant);
                    DbUtils.AddParameter(cmd, "@UserProfileId", property.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Id", property.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
