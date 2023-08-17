import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getAllUserProfiles } from "../APIManagers/UserProfileManager"
import { deleteMaintenanceHistory, getMaintenanceHistoryByPropertyId } from "../APIManagers/MaintenanceHistoryManager"

export const MaintenanceHistory = ({ note, setNotes, property }) => {
    const {id} = useParams()
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUserProfiles().then(allUserProfiles => setUsers(allUserProfiles))
    },[])

    //This function displays the name of the user who completed the request. I did it this way because it wasn't set up in my backend for me to do it another way. It was a good reminder of how to loop.
    const completedBy = () => {
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            if (user.id === note.userProfileId){
                return `${user.lastName} ${user.firstName} on`
            }
        }
    }

    //format date function found on stack overflow
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString()
    }

    //I used a default date to distinguish between completed requests and incomplete requests. Incomplete are 1999-09-09T13:40:50.993, and completed are anything else. Incomplete are font colored red, and complete are font colored green.
    const status = () => {
        if (note.dateCompleted === '1999-09-09T13:40:50.993'){
            return <div style={{color: "red"}}>INCOMPLETE</div>
        } else {
            const formattedDate = formatDate(note.dateCompleted)
            return <div style={{color: "green"}}>{completedBy()} {formattedDate} </div>
        }
    }

    //Delete method to delete an individual request. After deleted, it fetches all the requests for that property so that it's updated for the user to see.
    const handleDelete = (event) => {
        event.preventDefault()
        deleteMaintenanceHistory(note.id).then(() => getMaintenanceHistoryByPropertyId(id)).then(propertyNotes => setNotes(propertyNotes))
      };   

    return(<>
        <tbody>
            <tr>
                <td> {status()} </td>
                <td> {note.description} </td>
                <td> {formatDate(note.dateRequested)} </td>
                <td><Link to={`/maintenance-history/edit/${note.id}/${property.id}`}> Edit</Link>{" "}
                <Link onClick={handleDelete}>Delete</Link>
                </td>
            </tr>
        </tbody>
    </>)
}