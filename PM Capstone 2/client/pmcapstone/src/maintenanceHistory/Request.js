import { useEffect, useState } from "react"
import { getAllUserProfilesWithProperty } from "../APIManagers/UserProfileManager"
import { Link, useNavigate } from "react-router-dom"

export const Request = ({ request }) => {
    const navigate = useNavigate()

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

    const [isChecked, setIsChecked] = useState(false); // Set initial value to false
    const [showCheckbox, setShowCheckbox] = useState(false)

    useEffect(() => {
        setIsChecked(false)
      }, [])

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
                <td>Date requested: {formatDate(request.dateRequested)}<br></br> Date completed: {completedStatus()}</td>
                <td>{request.description}</td>
                {requestBy()}
                <td><Link to={`/properties/${request?.property?.id}`}>{request?.property?.streetAddress}</Link></td>

            </tr>
        </tbody>
        </>
    )
}