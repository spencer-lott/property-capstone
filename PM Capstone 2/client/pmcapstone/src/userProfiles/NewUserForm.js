import { useState} from "react"
import {useNavigate} from "react-router-dom"
import {addUserProfile, getAllUserProfiles} from "../APIManagers/UserProfileManager"

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
    
    return (
        <>
            <div>
                <form className="user-form">
                    <h1>Create New User</h1>

                    <fieldset>
                        <div className="form-group">
                        <label htmlFor="userType-select">User type</label>
                            <select id="type"
                                required
                                value={user.isEmployee}
                                onChange={userSelect}>
                                    <option value="0">Select</option>
                                    <option value="true">Employee</option>
                                    <option value="false">Tenant</option>
                                </select>  
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
    </div>
</>
    )
}
