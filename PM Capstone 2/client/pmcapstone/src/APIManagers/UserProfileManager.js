const apiUrl = "https://localhost:5001";
const baseUrl = "/api/userprofile"

//Login fetch call (this was provided to us)
export const login = (userObject) => {
  return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
  .then((r) => r.json())
    .then((userProfile) => {
      if(userProfile.id){
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        return userProfile
      }
      else{
        return undefined
      }
    });
};

//Logout (provided to us)
export const logout = () => {
      localStorage.clear()
};

//Gets all UserProfiles
export const getAllUserProfiles = () => {
  return fetch('/api/UserProfile').then((res) => res.json())
};

//Gets all UserProfiles with their property
export const getAllUserProfilesWithProperty = () => {
  return fetch('/api/UserProfile/GetAllWithProperty').then((res) => res.json())
};

//Gets single UserProfile by its id
export const getUserProfileById = (id) => {
  return fetch(`/api/UserProfile/${id}`).then((res) => res.json())
}

//Gets single UserProfile by its id wit the property attached
export const getUserProfileByIdWithProperty = (id) => {
  return fetch(`/api/UserProfile/GetUserProfileByIdWithProperty/${id}`).then((res) => res.json())
}

//Add
export const addUserProfile = (singleProfile) => {
  return fetch(baseUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(singleProfile)
  });
}

//Delete
export const deleteUserProfile = (id) => {
  return fetch(`/api/userProfile/${id}`, {
    method: "DELETE",
  })
    .then(() => getAllUserProfiles())
};

//Edit
export const editUserProfile = (user) => {
  return fetch(`/api/UserProfile/${user.Id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  }).then(() => getAllUserProfiles())
}

//Search UserProfiles according to input and match it with the criteria
export const searchUserProfiles = (q) => {
  return fetch(`${baseUrl}/search?q=${q}`).then((res) => res.json())
}
