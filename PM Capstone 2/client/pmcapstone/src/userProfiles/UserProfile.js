import { Link, useNavigate } from "react-router-dom"
import { deleteUserProfile } from "../APIManagers/UserProfileManager"
import { Alert, Button } from "react-bootstrap";
import { useState } from "react"

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

    const handleDelete = () => {
        deleteUserProfile(user.id)
        .then(users => setUsers(users))
        .then(() => {
          setShowAlert(false)
          navigate(`/users`)
        })
        
      };   
      
    const handleCancel = () => {
        setShowAlert(false) 
    }

    const deleteUserProfileAlert = () => {
        return (<>
        <Alert variant="danger" key={'danger'}>
          Are you sure you want to delete this user? If a tenant is attached, it will also delete all of their information.
          <br></br><Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
        </Alert>
        </>)
      }


    return (<>
        <tbody>
            <tr>
                <td>{user.lastName}, {user.firstName}</td>
                <td> {user.email} </td>
                {userType()}
                <Button onClick={() => navigate(`/users/edit/${user.id}`)}>Edit</Button>
                <Button variant="danger" type="delete"onClick={() => {setShowAlert(true)}}> 
                Delete
                </Button>
            </tr>
                {showAlert && deleteUserProfileAlert()}
        </tbody>
        </>
    )

}