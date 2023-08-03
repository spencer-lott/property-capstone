import { useEffect, useState } from "react"
import { getAllUserProfiles } from "../Managers/UserProfileManager"

export const UserProfilesList = () => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        getAllUserProfiles().then(allUsers => setUsers(allUsers))
    }
    
    useEffect(() => {
        getUsers()
    }, [])



}