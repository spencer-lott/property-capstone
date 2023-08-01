//THESE URL'S MUST MATCH EXACTLY HOW THEY SHOW IN SWAGGER (ie BACKEND)
const baseUrl = '/api/property';

//Fetching every single property in the database
export const getAllProperties = () => {
    return fetch(baseUrl).then((res) => res.json())
};

export const getPropertyById = (id) => {
    return fetch(`/api/property/${id}`).then((res) => res.json())
}

//POST fetch to add a property to the database
export const addProperty = (singleProperty) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleProperty)
    });
}

export const deleteProperty = (id) => {
    return fetch(`/api/property/${id}`, {
      method: "DELETE",
    })
      .then(() => getAllProperties())
  };

  export const editProperty = (property) => {
    console.log(property)
    return fetch(`/api/property/${property.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(property)
    }).then(() => getAllProperties())
}

