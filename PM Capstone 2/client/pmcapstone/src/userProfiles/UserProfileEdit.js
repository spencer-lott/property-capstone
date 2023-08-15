import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editUserProfile, getUserProfileById } from "../APIManagers/UserProfileManager"
import { Container, Col, Button } from "react-bootstrap"

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

    return (<>
    <Container>
        <Col className="form-col">
        <div className="xButton">
                    <Button 
                        style={{backgroundColor: "transparent",
                        border: "none"}}
                        onClick={()=> navigate(`/properties`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                    </Button>
                </div>

                <h1 className="form-header">Create a new user profile</h1>
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
    </Col>
    </Container>

</>
    )
}