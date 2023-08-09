import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editProperty, getPropertyById } from "../APIManagers/PropertiesManager"
import { getAllUserProfilesWithProperty } from "../APIManagers/UserProfileManager"

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

    console.log(unassignedTenants)

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


    return(
    <>
    <div>
        <h1>Assign a tenant</h1>
            <form className="property-form">

        <fieldset>
        <div className="form-group">
            <label htmlFor="tenant-select">Select the new tenant for this property</label>
                <select id="type"
                    value={property.state}
                    onChange={
                        event => selectList(event)}>
                        <option value="0">Select</option>
                        {
                            unassignedTenants.map(tenant => {
                                return <option value={tenant.id} key={tenant.id}>
                                    {tenant.lastName}, {tenant.firstName} </option>
                            })
                        }
                    </select>  
                </div>
        </fieldset>

    <button className="btn btn-primary"
        onClick={
            (clickEvent) => handleSaveButtonClick(clickEvent)
    }>
        Submit Tenant</button>
</form>
</div>
      </>
    )
}