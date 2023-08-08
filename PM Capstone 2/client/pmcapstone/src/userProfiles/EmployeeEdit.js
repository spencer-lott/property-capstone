import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editUserProfile, getUserProfileById } from "../APIManagers/UserProfileManager"

export const EmployeeEdit = () => {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [user, updateUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        isEmployee: true,
        isAdmin: false,
    })

    useEffect(() => {
        getUserProfileById(userId)
        .then((userProfileArray) => {
            updateUser(userProfileArray)
        })
    }, [userId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
    
        const userToSendToAPI = {
            Id: parseInt(userId),
            FirstName: user.firstName,
            LastName: user.lastName,
            Email: user.email,
            IsEmployee: user.isEmployee,
            IsAdmin: user.isAdmin,
        }
    
        return editUserProfile(userToSendToAPI).then(navigate(`/users`))

    };    
    
    return (
        <>
            <div>
                <form className="user-form">
                    <h1>Edit Tenant</h1>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="first">First Name</label>
                            <input id="title" type="text" className="form-control"
                                required
                                value={user.firstName}
                                onChange={
                                    (event) => {
                                        const copy = {
                                            ...user
                                        }
                                        copy.firstName = event.target.value
                                        updateUser(copy)
                                    }
                                }/>
                        </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="last">Last Name</label>
                        <input id="title" type="text" className="form-control"
                            required
                            value={user.lastName}
                            onChange={
                                (event) => {
                                    const copy = {
                                        ...user
                                    }
                                    copy.lastName = event.target.value
                                    updateUser(copy)
                                }
                            }/>
                        </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="title" type="text" className="form-control"
                            required
                            value={
                                user.email
                            }
                            onChange={
                                (event) => {
                                    const copy = {
                                        ...user
                                    }
                                    copy.email = event.target.value
                                    updateUser(copy)
                                }
                            }/>
                        </div>
                </fieldset>

            <button className="btn btn-primary"
                onClick={
                    (clickEvent) => handleSaveButtonClick(clickEvent)
            }>Submit User</button>
        </form>
    </div>
</>
    )
}