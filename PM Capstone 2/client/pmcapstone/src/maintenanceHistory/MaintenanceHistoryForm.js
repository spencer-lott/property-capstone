import {useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {addMaintenanceHistory} from "../APIManagers/MaintenanceHistoryManager"
import { Container, Col, Button } from "react-bootstrap"

export const MaintenanceHistoryForm = () => {
    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)
    const navigate = useNavigate()
    const { propertyId } = useParams()
    const [note, update] = useState({ 
        dateCompleted: '1999-09-09T13:40:50.994Z',
        description: "",
        userProfileId: PMUserObject.id,
        propertyId: propertyId,
        dateRequested: Date.now()
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const noteToSentToAPI = {
            DateCompleted: '1999-09-09T13:40:50.994Z',
            Description: note.description,
            UserProfileId: PMUserObject.id,
            PropertyId: propertyId,
            DateRequested: new Date().toISOString()
        }

        if(PMUserObject.isEmployee === false) {
            return addMaintenanceHistory(noteToSentToAPI).then(navigate(`/my-requests/${PMUserObject.id}`))
        } else{

            return addMaintenanceHistory(noteToSentToAPI).then(navigate(`/properties/${propertyId}`))
        }
    }

    return (<>
    <Container>
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

            <div>
                <h1 className="form-header">New Request</h1>
                <form className="note-form">
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input id="title" type="text" className="form-control"
                                value={note.description}
                                onChange={
                                    (event) => {
                                        const copy = {
                                            ...note
                                        }
                                        copy.description = event.target.value
                                        update(copy)
                                    }
                                }/>
                        </div>
                </fieldset>

                <button className="btn btn-primary"
                    onClick={
                        (clickEvent) => handleSaveButtonClick(clickEvent)
                }>
                    Submit note</button>
            </form>
        </div>
        </Col>

        </Container>

    </>
    )
}
