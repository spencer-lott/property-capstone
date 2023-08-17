//THESE URL'S MUST MATCH EXACTLY HOW THEY SHOW IN SWAGGER (ie BACKEND)
const baseUrl = '/api/MaintenanceHistory';

//Gets all the maintenance history
export const getAllMaintenanceHistory = () => {
    return fetch(baseUrl).then((res) => res.json())
};

//Gets all of the maintenance history and gets all the properties
export const getAllMaintenanceHistoryWithProperty = () => {
    return fetch('/api/MaintenanceHistory/GetAllMaintenanceHistoryWithProperty').then((res) => res.json())
};

//Gets all the maintenance history with the single property table it is attached to
export const getMaintenanceHistoryByPropertyId = (id) => {
    return fetch(`${baseUrl}/GetPropertyMaintenanceHistory/${id}`).then((res) => res.json())
}

//Add
export const addMaintenanceHistory = (singleNote) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleNote)
    });
}

//Delete
export const deleteMaintenanceHistory = (id) => {
    return fetch(`/api/MaintenanceHistory/${id}`, {
      method: "DELETE",
    })
  };

//Edit
export const editMaintenanceHistory = (maintenanceHistory) => {
    return fetch(`/api/MaintenanceHistory/${maintenanceHistory.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(maintenanceHistory)
    })
}

//Gets the single MH by id
export const getMaintenanceHistoryById = (id) => {
    return fetch(`/api/MaintenanceHistory/${id}`).then((res) => res.json())
}


