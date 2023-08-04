const baseUrl = '/api/Tenant';
export const getAllTenants = () => {
    return fetch('/api/Tenant').then((res) => res.json())
  }
  
export const getAllTenantsWithPropertyAndUserProfile = () => {
    return fetch('/api/Tenant/GetAllTenantsWithPropertyAndUserProfile').then((res) => res.json())
  };
  
  export const getTenantById = (id) => {
    return fetch(`/api/Tenant/${id}`).then((res) => res.json())
  }
  
  export const addTenant = (singleTenant) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleTenant)
    });
  }
  
//   export const deleteUserProfile = (id) => {
//     return fetch(`/api/userProfile/${id}`, {
//       method: "DELETE",
//     })
//       .then(() => getAllUserProfiles())
//   };
  
//   export const editUserProfile = (user) => {
//     return fetch(`/api/UserProfile/${user.Id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(user)
//     }).then(() => getAllUserProfiles())
//   }
  