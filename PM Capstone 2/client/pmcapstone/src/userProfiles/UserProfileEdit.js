import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editUserProfile, getUserProfileById } from "../Managers/UserProfileManager"

export const UserProfileEdit = () => {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [user, update] = useState({
        firstName: "",
        lastName: "",
        email: "",
        isEmployee: false,
        isAdmin: false})

    useEffect(() => {
        getUserProfileById(userId)
        .then((userArray) => {
            update(userArray)
        })
    }, [userId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const userToSendToAPI = {
            Id: parseInt(userId),
            FirstName: user.firstName,
            LastName: user.lastName,
            Email: user.email,
            IsEmployee: user.isEmployee,
            IsAdmin: user.isAdmin
        }

        return editUserProfile(userToSendToAPI).then(navigate(`/users`))
    }

    return (
        <>
            <div>
                <h1>Create a new user profile</h1>
                <form className="user-profile-form">
                    <h2 className="user-profile-form">New User</h2>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="first">First Name</label>
                            <input id="title" type="text" className="form-control"
                                value={
                                    user.firstName
                                }
                                onChange={
                                    (event) => {
                                        const copy = {
                                            ...user
                                        }
                                        copy.firstName = event.target.value
                                        update(copy)
                                    }
                                }/>
                        </div>
                </fieldset>



                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="last">Last Name</label>
                            <input id="title" type="text" className="form-control"
                                value={
                                    user.lastName
                                }
                                onChange={
                                    (event) => {
                                        const copy = {
                                            ...user
                                        }
                                        copy.lastName = event.target.value
                                        update(copy)
                                    }
                                }/>
                        </div>
                </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="title" type="text" className="form-control"
                                value={
                                    user.email
                                }
                                onChange={
                                    (event) => {
                                        const copy = {
                                            ...user
                                        }
                                        copy.email = event.target.value
                                        update(copy)
                                    }
                                }/>
                        </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <input type="checkbox"
                            checked={user.isEmployee ? true : false}
                            onChange={
                                (event) => {
                                    const copy = {
                                        ...user
                                    }
                                    copy.isEmployee = event.target.checked
                                    update(copy)

                                }
                            }/>
                        <label htmlFor="employee-check">Employee</label>
                    </div>
            </fieldset>

            <fieldset>
                    <div className="form-group">
                        <input type="checkbox"
                            checked={user.isAdmin ? true : false}
                            onChange={
                                (event) => {
                                    const copy = {
                                        ...user
                                    }
                                    copy.isAdmin = event.target.checked
                                    update(copy)

                                }}/>
                        <label htmlFor="admin-check">Admin (also check employee when making an admin)</label>
                    </div>
            </fieldset>

            <button className="btn btn-primary"
                onClick={
                    (clickEvent) => handleSaveButtonClick(clickEvent)
            }>
                Submit new user</button>
        </form>
    </div>
</>
    )
}