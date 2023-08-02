import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllUserProfiles } from "../Managers/UserProfileManager"
import { deleteMaintenanceHistory, getMaintenanceHistoryByPropertyId } from "../Managers/MaintenanceHistoryManager"

export const MaintenanceHistory = ({ note, setNotes, property }) => {
    const {id} = useParams()
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUserProfiles().then(allUserProfiles => setUsers(allUserProfiles))
    },[])

    const completedBy = () => {
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            if (user.id === note.userProfileId){
                return user.email
            }
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString()
    }

    const status = () => {
        if (note.dateCompleted === '1999-09-09T13:40:50.993'){
            return <div style={{color: "red"}}>INCOMPLETE</div>
        } else {
            const formattedDate = formatDate(note.dateCompleted)
            return <div style={{color: "green"}}>{completedBy()} {formattedDate} </div>
        }
    }

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