import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addProperty } from "../APIManagers/PropertiesManager"
import { Container, Col, Form, Button } from "react-bootstrap"

//This is the create form for making a new property
export const PropertiesForm = () => {
    const navigate = useNavigate()
    const [property, update] = useState({
        streetAddress: "",
        city: "",
        state: "",
        type: "",
        sizeDescription: "",
        rent: 0,
        vacant: true
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const propertyToSendToAPI = {
            StreetAddress: property.streetAddress,
            City: property.city,
            State: property.state,
            Type: property.type,
            SizeDescription: property.sizeDescription,
            Rent: property.rent,
            Vacant: true
        }

        return addProperty(propertyToSendToAPI).then(navigate(`/properties`))
    }

    return(<>
    <Container className="login-page">
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
        <h1 className="form-header">New Property</h1>
            <form className="property-form">
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
                <Form.Select id="type" className="form-control"
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
                    </Form.Select>  
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
</Col>

</Container>

      </>
    )

}