import { useEffect, useState } from "react"
import { Alert} from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { editProperty, getPropertyById } from "../APIManagers/PropertiesManager"

export const PropertyEdit = () => {
    const navigate = useNavigate()
    const { propertyId} = useParams()  
    const [showTenant, setShowTenant] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const [property, update] = useState({
        streetAddress: "",
        city: "",
        state: "",
        type: "",
        sizeDescription: "",
        rent: 0,
        vacant: true,
    })

    useEffect(() => {
        getPropertyById(propertyId)
        .then((propertyArray) => {
            update(propertyArray)
        })
    }, [propertyId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        let propertyToEdit = {
            Id: parseInt(propertyId),
            StreetAddress: property.streetAddress,
            City: property.city,
            State: property.state,
            Type: property.type,
            SizeDescription: property.sizeDescription,
            Rent: property.rent,
            Vacant: true
        }
        
        if (property.userProfileId !== -1){
            propertyToEdit = {
                Id: parseInt(propertyId),
                StreetAddress: property.streetAddress,
                City: property.city,
                State: property.state,
                Type: property.type,
                SizeDescription: property.sizeDescription,
                Rent: property.rent,
                Vacant: false,
                UserProfileId: property.userProfileId
            }
        }

        return editProperty(propertyToEdit).then(navigate(`/properties/${propertyId}`))
    }

    const unassign = (event) => {
        event.preventDefault()
        let propertyToEdit = {
            Id: parseInt(propertyId),
            StreetAddress: property.streetAddress,
            City: property.city,
            State: property.state,
            Type: property.type,
            SizeDescription: property.sizeDescription,
            Rent: property.rent,
            Vacant: true
        }
        return editProperty(propertyToEdit).then(navigate(`/properties/${propertyId}`))

    }

    useEffect(() => {
        if (property.userProfileId !== null || property.userProfileId !== -1)
        {
            setShowTenant(true)
        }
    }, [property.userProfileId])

    const handleCancel = () => {
        setShowAlert(false);
    };


    const unassignTenantAlert = () => {
        return (
            <Alert variant="danger" key={'danger'}>
                Are you sure you want to unassign <b>{property?.userProfile?.lastName}, {property?.userProfile?.firstName}</b> from <b>{property.streetAddress}?</b>
                <br></br>
                <Link onClick={unassign}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
            </Alert>
        );
    };

    
    return(
    <>
    <div>
        <h1>Edit property</h1>
        <br></br>
            <form className="property-form">
                {showTenant && (<>
                    <h3>
                        Tenant: {property?.userProfile?.lastName}, {property?.userProfile?.firstName}
                        
                    </h3>
                    <div><Link onClick={() => setShowAlert(true)}>Unassign this tenant?</Link></div>
                    {showAlert && unassignTenantAlert()}
                    <br></br>
                </>
                )}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="street-address">Street Address</label>
                        <input id="title" type="text" className="form-control"
                            value={
                                property.streetAddress
                            }
                            onChange={
                                (event) => {
                                    const copy = {
                                        ...property
                                    }
                                    copy.streetAddress = event.target.value
                                    update(copy)
                                }
                            }/>
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input id="city" type="text" className="form-control"
                        value={
                            property.city
                        }
                        onChange={
                            (event) => {
                                const copy = {
                                    ...property
                                }
                                copy.city = event.target.value
                                update(copy)
                            }
                        }/>
                </div>
        </fieldset>

        <fieldset>
        <div className="form-group">
            <label htmlFor="state-select">State</label>
                <select id="type"
                    value={property.state}
                    onChange={
                        (event) => {
                        const copy = {
                            ...property
                        }
                        copy.state = event.target.value
                        update(copy)
                    }}>
                        <option value="0">Select a state</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>   
                    </select>  
                </div>
        </fieldset>

        <fieldset>
            <div className="form-group">
                <label htmlFor="type">Type</label>
                <input id="type" type="text" className="form-control"
                    value={
                        property.type
                    }
                    onChange={
                        (event) => {
                            const copy = {
                                ...property
                            }
                            copy.type = event.target.value
                            update(copy)
                        }
                    }/>
            </div>
    </fieldset>

    <fieldset>
            <div className="form-group">
                <label htmlFor="size-description">Size Description</label>
                <input id="size-description" type="text" className="form-control"
                    value={
                        property.sizeDescription
                    }
                    onChange={
                        (event) => {
                            const copy = {
                                ...property
                            }
                            copy.sizeDescription = event.target.value
                            update(copy)
                        }
                    }/>
            </div>
    </fieldset>

    <fieldset>
            <div className="form-group">
                <label htmlFor="rent">Rent</label>
                <input id="rent" type="number" className="form-control"
                    value={
                        property.rent
                    }
                    onChange={
                        (event) => {
                            const copy = {
                                ...property
                            }
                            copy.rent = event.target.value
                            update(copy)
                        }
                    }/>
            </div>
    </fieldset>
    <button className="btn btn-primary"
        onClick={
            (clickEvent) => handleSaveButtonClick(clickEvent)
    }>
        Submit Property</button>
</form>
</div>
      </>
    )

}