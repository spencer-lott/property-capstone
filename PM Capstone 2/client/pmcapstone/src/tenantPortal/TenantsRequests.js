import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMaintenanceHistory, getAllMaintenanceHistory } from "../APIManagers/MaintenanceHistoryManager";

//This function handles the actual information that is displayed in the tenant's requests table
export const TenantsRequests = ({personalRequest, setAllHistory, user}) => {
    const [showLinks, setShowLinks] = useState(false)

    //function found on stack overflow to format the date nicely
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString()
    }

    const status = () => {
        if (personalRequest.dateCompleted === '1999-09-09T13:40:50.993'){
            return <div style={{color: "red"}}>INCOMPLETE</div>
        } else {
            const formattedDate = formatDate(personalRequest.dateCompleted)
            return <div style={{color: "green"}}>COMPLETED {formattedDate} </div>
        }
    }

    const handleDelete = (event) => {
        event.preventDefault()
        deleteMaintenanceHistory(personalRequest.id)
        .then(() => getAllMaintenanceHistory())
        .then(history => setAllHistory(history))
      };   

    //This makes it so that edit and delete links are available if the request is incomplete still
    useEffect(() => {
        if (personalRequest.dateCompleted === '1999-09-09T13:40:50.993') {
            setShowLinks(true)
        } else {
            setShowLinks(false)
        }

    },[])

    return (
        <>
        <tbody>
            <tr>
                <td>{status()}</td>
                <td>{formatDate(personalRequest.dateRequested)}</td>
                <td id="C">{personalRequest.description}</td>
                {
                    showLinks ? (
                        <>
                        <td><Link to={`/maintenance-history/edit/${personalRequest.id}/${user?.property?.id}`}> Edit</Link></td>
                        <td><Link onClick={handleDelete}> Delete</Link></td>
                        
                        </>
                    )
                    : <>
                    <td></td>
                    <td></td>
                    </>
                }
            </tr>
        </tbody>
        </>
    )
}

