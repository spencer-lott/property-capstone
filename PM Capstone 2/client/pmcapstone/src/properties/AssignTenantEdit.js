import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editProperty, getPropertyById } from "../APIManagers/PropertiesManager"
import { getAllUserProfilesWithProperty } from "../APIManagers/UserProfileManager"
import { Button, Col, Container, Form } from "react-bootstrap"
import "./Properties.css"

export const AssignTenantEdit = () => {
    const navigate = useNavigate()
    const { propertyId } = useParams()
    const [profiles, setProfiles] = useState([])
    const [unassignedTenants, setUnassignedTenants] = useState([])  
    const [originalStreetAddress, setOriginalStreetAddress] = useState("")
    const [originalCity, setOriginalCity] = useState("")
    const [originalState, setOriginalState] = useState("")
    const [originalType, setOriginalType] = useState("")
    const [originalSizeDescription, setOriginalSizeDescription] = useState("")
    const [originalRent, setOriginalRent] = useState(0)

    useEffect(() => {
        getAllUserProfilesWithProperty().then(allProfiles => setProfiles(allProfiles))
    }, [])

    useEffect(() => {
        const filtered = profiles.filter(profile => profile?.property === null && profile.isEmployee === false)
        setUnassignedTenants(filtered)
    }, [profiles])

    const [property, update] = useState({
        streetAddress: "",
        city: "",
        state: "",
        type: "",
        sizeDescription: "",
        rent: 0,
        vacant: false,
        userProfileId: -1
    })

    useEffect(() => {
        getPropertyById(propertyId)
        .then((propertyArray) => {
            update(propertyArray)
            setOriginalStreetAddress(propertyArray.streetAddress)
            setOriginalCity(propertyArray.city)
            setOriginalState(propertyArray.state)
            setOriginalType(propertyArray.type)
            setOriginalSizeDescription(propertyArray.sizeDescription)
            setOriginalRent(propertyArray.rent)

        })
    }, [propertyId])

    const handleSaveButtonClick = (event) => {

        event.preventDefault()
        const propertyToEdit = {
            Id: parseInt(propertyId),
            StreetAddress: originalStreetAddress,
            City: originalCity,
            State: originalState,
            Type: originalType,
            SizeDescription: originalSizeDescription,
            Rent: originalRent,
            Vacant: property.vacant,
            UserProfileId: property.userProfileId
        }
        return editProperty(propertyToEdit).then(navigate(`/properties/${propertyId}`))

    }

    const selectList = (event) => {
        const selectedTenantId = parseInt(event.target.value)

        if (selectedTenantId) {
            const copy = {
                ...property
            }
            copy.userProfileId = event.target.value
            copy.vacant = false
            update(copy)
        } 

    }

    return(<>
    <Container className="login-page">
        <Col className="form-col">
            <div className="xButton">
                <Button 
                    style={{backgroundColor: "transparent",
                    border: "none"}}
                    onClick={()=> navigate(`/properties/${propertyId}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                    </svg>
                </Button>
            </div>
        <h1>Select the new tenant for this property</h1>
            <form className="property-form">
                <fieldset>
                    <div className="form-group">
                    {/* <label htmlFor="tenant-select">Select the new tenant for this property</label> */}
                        <Form.Select id="type" className="form-control"
                            value={property.userProfileId}
                            onChange={
                                event => selectList(event)}>
                                <option value="0">Select</option>
                                {
                                    unassignedTenants.map(tenant => {
                                        return <option value={tenant.id} key={tenant.id}>
                                            {tenant.lastName}, {tenant.firstName} </option>
                                    })
                                }
                            </Form.Select>  
                        </div>
                </fieldset>
            <button className="btn btn-primary"
                onClick={
                    (clickEvent) => handleSaveButtonClick(clickEvent)
            }>
                Assign Tenant</button>
            </form>
        </Col>
    </Container>
      </>
    )
}