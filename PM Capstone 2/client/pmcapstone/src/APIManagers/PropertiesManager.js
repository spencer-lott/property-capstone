//THESE URL'S MUST MATCH EXACTLY HOW THEY SHOW IN SWAGGER (ie BACKEND)
const baseUrl = '/api/property';

//Gets all the properties in the database
export const getAllProperties = () => {
    return fetch(baseUrl).then((res) => res.json())
};

//Get single property by its id
export const getPropertyById = (id) => {
    return fetch(`/api/property/${id}`).then((res) => res.json())
}

//ADD
export const addProperty = (singleProperty) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleProperty)
    });
}

//Delete
export const deleteProperty = (id) => {
    return fetch(`/api/property/${id}`, {
      method: "DELETE",
    })
      .then(() => getAllProperties())
  };

//Edit
export const editProperty = (property) => {
    return fetch(`/api/property/${property.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(property)
    }).then(() => getAllProperties())
}

//Search properties according to input and match it with the criteria
export const searchProperties = (q) => {
    return fetch(`${baseUrl}/search?q=${q}`).then((res) => res.json())
}

