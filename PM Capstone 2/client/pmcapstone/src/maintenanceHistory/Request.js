import { useEffect, useState } from "react"
import { getAllUserProfilesWithProperty } from "../APIManagers/UserProfileManager"
import { Link, useNavigate } from "react-router-dom"

//This is the function that provides the information for the table on the AllRequestsList page. Very similar to MaintenanceHistory.js except this is for all the requests and not just ones attached to a single property.
export const Request = ({ request }) => {
    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(false)
    const [showCheckbox, setShowCheckbox] = useState(false)

    const [users, setUsers] = useState([])
    useEffect(() => {
        getAllUserProfilesWithProperty().then(allUserProfiles => setUsers(allUserProfiles))
    },[])

    const requestBy = () => {
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            if (user.id === request.property.userProfileId){
                return <td>{user.lastName}, {user.firstName}</td>
            }
        }
    }

    useEffect(() => {
        setIsChecked(false)
    }, [])
    
    //Checkbox to help signify that it is incomplete
    useEffect(() => {
        if (request.dateCompleted === "1999-09-09T13:40:50.993") {
          setShowCheckbox(true);
        }
      }, [request.dateCompleted]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString()
    }

    const completedStatus = () => {
        if (request.dateCompleted === '1999-09-09T13:40:50.993'){
            return <div style={{color: "red"}}>INCOMPLETE</div>
        } else {
            const formattedDate = formatDate(request.dateCompleted)
            return <div style={{color: "green"}}>{formattedDate} </div>
        }
    }

    return(
        <>
        <tbody>
            <tr>
                {showCheckbox ?
                <td>
                <input className="tasksInput" type="checkbox"  value={isChecked} checked={isChecked} onChange={() => navigate(`/maintenance-history/edit/${request.id}/${request?.property.id}`)}  />
                </td>
                    : <td>COMPLETE</td>}
                <td>{completedStatus()}</td>
                <td>{formatDate(request.dateRequested)}</td>
                <td>{request.description}</td>
                {requestBy()}
                <td><Link to={`/properties/${request?.property?.id}`}>{request?.property?.streetAddress}</Link></td>
            </tr>
        </tbody>
        </>
    )
}