import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteUserProfile, getUserProfileByIdWithProperty } from "../APIManagers/UserProfileManager"
import { Alert } from "react-bootstrap";
import { useEffect, useState } from "react"

export const UserProfile = ({ user, setUsers }) => {
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

    const userType = () => {
        if (user.isAdmin === false && user.isEmployee === false)
            return <td>Tenant</td>
        else if (user.isEmployee === true && user.isAdmin === true) {
            return <td>Admin</td>
        }
        else if (user.isEmployee === true) {
            return <td>Employee</td>
        }
        else {
            return <td>N/A</td>
        }
    }

    // console.log(user?.property)

    const handleDelete = () => {
        if (user?.property === null){

            deleteUserProfile(user.id)
            .then(users => setUsers(users))
            .then(() => {
                setShowAlert(false)
                navigate(`/users`)
            })
        } else {
            window.alert("This user is assigned to a property and must be UNASSIGNED first before you can delete them.");

            // Update the state to control the visibility of the alert
            setShowAlert(false);
        }
      }      
      
    const handleCancel = () => {
        setShowAlert(false) 
    }

    const deleteUserProfileAlert = () => {
        return (<>
        <Alert variant="danger" key={'danger'}>
          Are you sure you want to delete this user? It will delete all of their information.
          <br></br>
          <Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
        </Alert>
        </>)
      }

    const handleUserTypeEdit = () => {
        if (user.isEmployee === true){
            return `/users/employee-edit/${user.id}`
        } else {
            return `/users/tenant-edit/${user.id}`
        }
    }

    return (<>
        <tbody>
            <tr>
                <td>{user.lastName}, {user.firstName}</td>
                <td> {user.email} </td>
                {userType()}
                <td>
                    <Link style={{color: "blue" }} to={handleUserTypeEdit()}>Edit</Link>
                </td>
                <td>
                <Link style={{color: "red" }} variant="danger" type="delete"onClick={() => {setShowAlert(true)}}> 
                Delete
                </Link>
                </td>
            </tr>
                {showAlert && deleteUserProfileAlert()}
        </tbody>
        </>
    )

}