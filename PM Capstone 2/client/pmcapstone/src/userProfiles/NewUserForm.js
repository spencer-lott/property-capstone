import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {addTenant} from "../APIManagers/TenantManager"
import {addUserProfile, getAllUserProfiles} from "../APIManagers/UserProfileManager"
import { getAllProperties } from "../APIManagers/PropertiesManager"

export const NewTenantForm = () => {
    const getProperties = () => {
        getAllProperties().then(allProperties => setProperties(allProperties));
    }
    useEffect(() => {
        getProperties();
    },[])

    const [properties, setProperties] = useState([])
    const navigate = useNavigate()
    const [user, updateUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        isEmployee: false,
        isAdmin: false,
        phone: "",
        employment: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        generalNotes: ""
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
    
        const userToSendToAPI = {
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
    
        };
    
        return addUserProfile(userToSendToAPI).then(navigate(`/users`))

    };    
    
    //THIS MIGHT BE WRONG
    const selectProperty = (event) => {
        const selectedPropertyId = parseInt(event.target.value);
        const selectedProperty = properties.find(property => property.id === selectedPropertyId);
        
        if (selectedProperty && selectedProperty.vacant) {
            const copy = { ...user };
            copy.userProfileId = selectedPropertyId;
            updateUser(copy);
        }
    }
    
//IF SELECT TRUE FOR IS TENANT => THEN POPULATE THE REST OF THE FORM TO PUT IN PHONE AND OTHER DETAILS
    return (
        <>
            <div>
                <form className="tenant-form">
                    <h1>Create a new tenant</h1>
                    <h2 className="tenant-form">New Tenant</h2>
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
                                        updateUser(copy)
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
                                    updateUser(copy)
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
                                updateUser(copy)
                            }
                        }/>
                </div>
        </fieldset>
--------------------------------------
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="category-select">Category</label>
                        <select id="type"
                                required
                                value={tenant.propertyId}
                                onChange={event => selectProperty(event)}>
                                <option value="0">Select a property</option>
                                {properties.filter(property => property.vacant).map(property => (
                                    <option value={property.id} key={property.id}>
                                        {property.streetAddress}
                                    </option>
                                ))}
                            </select>

                        {/* <select id="type"
                            required
                            value={
                                tenant.propertyId
                            }
                            onChange={
                                event => selectProperty(event)
                        }>
                            <option value="0">Select a property</option>
                            {
                            properties.map(property => {
                                return <option value={property.id} key={
                                    property.id
                                }>
                                    {
                                    property.streetAddress
                                }</option>
                        })
                        } </select>   */}
                        </div>
                </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input id="title" type="text" className="form-control"
                    value={
                        tenant.phone
                    }
                    onChange={
                        (event) => {
                            const copy = {
                                ...tenant
                            }
                            copy.phone = event.target.value
                            updateTenant(copy)
                        }
                    }/>
            </div>
    </fieldset>

    <fieldset>
        <div className="form-group">
            <label htmlFor="employment">Employment</label>
            <input id="title" type="text" className="form-control"
                value={
                    tenant.employment
                }
                onChange={
                    (event) => {
                        const copy = {
                            ...tenant
                        }
                        copy.employment = event.target.value
                        updateTenant(copy)
                    }
                }/>
        </div>
</fieldset>

<fieldset>
    <div className="form-group">
        <label htmlFor="emergency-name">Emergency Contact Name</label>
        <input id="title" type="text" className="form-control"
            value={
                tenant.emergencyContactName
            }
            onChange={
                (event) => {
                    const copy = {
                        ...tenant
                    }
                    copy.emergencyContactName = event.target.value
                    updateTenant(copy)
                }
            }/>
    </div></fieldset><fieldset>
<div className="form-group">
    <label htmlFor="emergency-phone">Emergency Contact Phone</label>
    <input id="title" type="text" className="form-control"
        value={
            tenant.emergencyContactPhone
        }
        onChange={
            (event) => {
                const copy = {
                    ...tenant
                }
                copy.emergencyContactPhone = event.target.value
                updateTenant(copy)
            }
        }/>
</div></fieldset><button className="btn btn-primary"
    onClick={
        (clickEvent) => handleSaveButtonClick(clickEvent)
}>Submit Tenant</button></form></div></>
    )
}
