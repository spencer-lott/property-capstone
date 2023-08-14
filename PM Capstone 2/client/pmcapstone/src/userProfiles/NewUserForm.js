import { useState} from "react"
import {useNavigate} from "react-router-dom"
import {addUserProfile} from "../APIManagers/UserProfileManager"
import { Col, Container, Button, Form } from "react-bootstrap"
import "./UserProfiles.css"

export const NewUserForm = () => {

    const [showTenantInputs, setShowTenantInputs] = useState(true)
    const navigate = useNavigate()
    const [user, updateUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        isEmployee: null,
        isAdmin: false,
        phone: "",
        employment: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        generalNotes: ""
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
    
        let userToSendToAPI = {
            FirstName: user.firstName,
            LastName: user.lastName,
            Email: user.email,
            IsEmployee: user.isEmployee,
            IsAdmin: user.isAdmin,
            Phone: user.phone,
            Employment: user.employment,
            EmergencyContactName: user.emergencyContactName,
            EmergencyContactPhone: user.emergencyContactPhone,
            GeneralNotes: user.generalNotes
        }

        if (user.isEmployee === true) {
            userToSendToAPI = {FirstName: user.firstName,
            LastName: user.lastName,
            Email: user.email,
            IsEmployee: user.isEmployee,
            IsAdmin: user.isAdmin}
        }
    
        return addUserProfile(userToSendToAPI).then(navigate(`/users`))

    };    

    const userSelect = (event) => {
        const selectedUserType = event.target.value === "true";
        const copy = {
            ...user,
            isEmployee: selectedUserType,
            phone: selectedUserType ? null : "",
            employment: selectedUserType ? null : "",
            emergencyContactName: selectedUserType ? null : "",
            emergencyContactPhone: selectedUserType ? null : "",
            generalNotes: selectedUserType ? null : "",
        };
        updateUser(copy);
        setShowTenantInputs(selectedUserType);
    };
    
    return (<>
    <Container>
        <Col className="form-col">
                <form className="user-form">
                <div className="xButton">
                    <Button 
                        style={{backgroundColor: "transparent",
                        border: "none"}}
                        onClick={()=> navigate(`/users`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                    </Button>
                </div>

                    <h1 className="form-header">Create New User</h1>

                    <fieldset>
                        <div className="form-group">
                        <label htmlFor="userType-select">User type</label>
                        <Form.Select id="type" className="form-control"
                                required
                                value={user.isEmployee}
                                onChange={userSelect}>
                                    <option value="0">Select</option>
                                    <option value="true">Employee</option>
                                    <option value="false">Tenant</option>
                                </Form.Select>  
                            </div>
                    </fieldset>

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

{!showTenantInputs? 
            <>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input id="title" type="number" className="form-control"
                            value={
                                user.phone
                            }
                            onChange={
                                (event) => {
                                    const copy = {
                                        ...user
                                    }
                                    copy.phone = event.target.value
                                    updateUser(copy)
                                }
                            }/>
                        </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="employment">Employment</label>
                        <input id="title" type="text" className="form-control"
                            value={
                                user.employment
                            }
                            onChange={
                                (event) => {
                                    const copy = {
                                        ...user
                                    }
                                    copy.employment = event.target.value
                                    updateUser(copy)
                                }
                            }/>
                        </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="emergency-name">Emergency Contact Name</label>
                        <input id="title" type="text" className="form-control"
                            value={
                                user.emergencyContactName
                            }
                            onChange={
                                (event) => {
                                    const copy = {
                                        ...user
                                    }
                                    copy.emergencyContactName = event.target.value
                                    updateUser(copy)
                                }
                            }/>
                    </div>
                </fieldset>
    
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="emergency-phone">Emergency Contact Phone</label>
                        <input id="title" type="number" className="form-control"
                            value={
                                user.emergencyContactPhone
                            }
                            onChange={
                                (event) => {
                                    const copy = {
                                        ...user
                                    }
                                    copy.emergencyContactPhone = event.target.value
                                    updateUser(copy)
                                }
                            }/>
                        </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="notes">General notes</label>
                        <input id="title" type="text" className="form-control"
                            value={
                                user.generalNotes
                            }
                            onChange={
                                (event) => {
                                    const copy = {
                                        ...user
                                    }
                                    copy.generalNotes = event.target.value
                                    updateUser(copy)
                                }
                            }/>
                    </div>
                </fieldset>

                </>
                : <></>

                        }

            <button className="btn btn-primary"
                onClick={
                    (clickEvent) => handleSaveButtonClick(clickEvent)
            }>Submit User</button>
        </form>
    </Col>
    </Container>

</>
    )
}
