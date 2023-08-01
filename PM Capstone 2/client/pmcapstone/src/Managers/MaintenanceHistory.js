//THESE URL'S MUST MATCH EXACTLY HOW THEY SHOW IN SWAGGER (ie BACKEND)
const baseUrl = '/api/MaintenanceHistory';

export const getMaintenanceHistoryByPropertyId = (id) => {
    return fetch(`${baseUrl}/GetPropertyMaintenanceHistory/${id}`).then((res) => res.json())
}

// https://localhost:5001/api/MaintenanceHistory/GetPropertyMaintenanceHistory/1
