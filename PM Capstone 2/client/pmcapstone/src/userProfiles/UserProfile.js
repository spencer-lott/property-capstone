import { Link, useNavigate } from "react-router-dom"
import { deleteUserProfile } from "../APIManagers/UserProfileManager"
import { Alert } from "react-bootstrap";
import { useState } from "react"
import "./UserProfiles.css"

export const UserProfile = ({ user, setUsers }) => {
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

    //This presents a user type to be displayed in the table based on what requirements they meet in the database
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

    //A user can only be deleted if there is no property attached to them. If someone tries to delete a profile with a property attached, the program will show an alert to prevent bugs
    const handleDelete = () => {
        if (user?.property === null){
            deleteUserProfile(user.id)
            .then(users => setUsers(users))
            .then(() => {
                setShowAlert(false)
                navigate(`/users`)
            })
        } else {
            //This window alert prevents the bug
            window.alert(`This user is assigned to the property at ${user?.property.streetAddress} and must be UNASSIGNED first before you can delete them.`);
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
            {user.isAdmin === false || user.isEmployee === false ?
                <td>
                    <Link style={{color: "blue" }} to={handleUserTypeEdit()}>Edit</Link>
                </td>
                :<td>Restricted Privileges</td>
            }
            {user.isAdmin === false || user.isEmployee === false ?
                <td>
                <Link style={{color: "red" }} variant="danger" type="delete"onClick={() => {setShowAlert(true)}}> 
                Delete
                </Link>
                </td>
                :<td>Restricted Privileges</td>
            }
            </tr>
                {showAlert && deleteUserProfileAlert()}
        </tbody>
        </>
    )

}