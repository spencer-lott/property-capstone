const apiUrl = "https://localhost:5001";
const baseUrl = "/api/userprofile"

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

export const logout = () => {
      localStorage.clear()
};

export const getAllUserProfiles = () => {
  return fetch('/api/UserProfile').then((res) => res.json())
};

export const getAllUserProfilesWithProperty = () => {
  return fetch('/api/UserProfile/GetAllWithProperty').then((res) => res.json())
};

export const getUserProfileById = (id) => {
  return fetch(`/api/UserProfile/${id}`).then((res) => res.json())
}

export const getUserProfileByIdWithProperty = (id) => {
  return fetch(`/api/UserProfile/GetUserProfileByIdWithProperty/${id}`).then((res) => res.json())
}

export const addUserProfile = (singleProfile) => {
  return fetch(baseUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(singleProfile)
  });
}

export const deleteUserProfile = (id) => {
  return fetch(`/api/userProfile/${id}`, {
    method: "DELETE",
  })
    .then(() => getAllUserProfiles())
};

export const editUserProfile = (user) => {
  return fetch(`/api/UserProfile/${user.Id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  }).then(() => getAllUserProfiles())
}

export const searchUserProfiles = (q) => {
  return fetch(`${baseUrl}/search?q=${q}`).then((res) => res.json())
}
