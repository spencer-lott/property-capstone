//THESE URL'S MUST MATCH EXACTLY HOW THEY SHOW IN SWAGGER (ie BACKEND)
const baseUrl = '/api/MaintenanceHistory';
// https://localhost:5001/api/MaintenanceHistory/GetPropertyMaintenanceHistory/1

export const getMaintenanceHistoryByPropertyId = (id) => {
    return fetch(`${baseUrl}/GetPropertyMaintenanceHistory/${id}`).then((res) => res.json())
}

export const addMaintenanceHistory = (singleNote) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleNote)
    });
}

export const deleteMaintenanceHistory = (id) => {
    return fetch(`/api/MaintenanceHistory/${id}`, {
      method: "DELETE",
    })
  };

  export const editMaintenanceHistory = (maintenanceHistory) => {
    console.log(maintenanceHistory)
    return fetch(`/api/MaintenanceHistory/${maintenanceHistory.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(maintenanceHistory)
    })
    // .then(() => getAllProperties())
}

export const getMaintenanceHistoryById = (id) => {
    return fetch(`/api/MaintenanceHistory/${id}`).then((res) => res.json())
}


