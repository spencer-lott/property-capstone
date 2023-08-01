using PropertyManager.Models;

namespace PropertyManager.Repositories
{
    public interface IMaintenanceHistoryRepository
    {
        void Add(MaintenanceHistory note);
        void Delete(int id);
        List<MaintenanceHistory> GetAll();
        List<MaintenanceHistory> GetMaintenanceHistoryByPropertyId(int propertyId);
        MaintenanceHistory GetById(int id);
        void Update(MaintenanceHistory note);
    }
}