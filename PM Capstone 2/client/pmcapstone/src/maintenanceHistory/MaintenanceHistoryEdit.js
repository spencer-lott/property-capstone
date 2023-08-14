import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {editMaintenanceHistory, getMaintenanceHistoryById} from "../APIManagers/MaintenanceHistoryManager"
import {getPropertyById} from "../APIManagers/PropertiesManager"
import { Container, Col, Button } from "react-bootstrap"
import "./Requests.css"

export const MaintenanceHistoryEdit = () => {
    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)
    const navigate = useNavigate()
    const {noteId, mhpropertyId} = useParams()
    const [hideDateCompleted, setHideDateCompleted] = useState(false)
    const [note, update] = useState({
        dateCompleted: '1999-09-09T13:40:50.994Z', 
        description: "", 
        userProfileId: PMUserObject.id, 
        propertyId: mhpropertyId
    })
    const [originalDateRequested, setOriginalDateRequested] = useState(""); // New state variable
    const [originalDateCompleted, setOriginalDateCompleted] = useState("");
    const [originalDescription, setOriginalDescription] = useState("");

    useEffect(() => {
        getMaintenanceHistoryById(noteId).then((noteArray) => {
            update(noteArray);
            setOriginalDateRequested(noteArray.dateRequested) // Store the original dateRequested
            setOriginalDateCompleted(noteArray.dateCompleted)
            setOriginalDescription(noteArray.description)
        });
    }, [noteId]);

    useEffect(() => {
        getPropertyById(mhpropertyId).then((propertyArray) => {
            update(propertyArray)
        })
    }, [mhpropertyId])

    useEffect(() => {
        PMUserObject.isEmployee === false ? setHideDateCompleted(true) : setHideDateCompleted(false)
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        let dateCompleted = note.dateCompleted

        // Check if dateCompleted is a string and then trim it
        if (typeof dateCompleted === "string") {
          dateCompleted = dateCompleted.trim();
        }
      
        // If dateCompleted is empty or undefined, set it to the default value I have decided for it
        if (!dateCompleted || dateCompleted === '1999-09-09T13:40:50.994Z') {
            // If the originalDateCompleted exists, use it as the dateCompleted value
            if (originalDateCompleted) {
            dateCompleted = originalDateCompleted;
            } else {
            dateCompleted = '1999-09-09T13:40:50.994Z';
            }
        } else {
            // If it's not empty, convert it to ISO string format
            dateCompleted = new Date(dateCompleted).toISOString();
        }

        let descriptionToSave = note.description
        if (!descriptionToSave) {
            descriptionToSave = originalDescription
        }

        const noteToSentToAPI = {
            Id: parseInt(noteId),
            DateCompleted: dateCompleted,
            Description: descriptionToSave,
            UserProfileId: PMUserObject.id,
            PropertyId: mhpropertyId,
            DateRequested: originalDateRequested
        }
        if(PMUserObject.isEmployee === false) {
            return editMaintenanceHistory(noteToSentToAPI).then(navigate(`/my-requests/${PMUserObject.id}`))
        } else{


        return editMaintenanceHistory(noteToSentToAPI).then(navigate(`/properties/${mhpropertyId}`))
        }
    }

    return (<>

    <Container>
        <Col className="form-col"></Col>
        <div className="xButton">
                <Button  
                    style={{backgroundColor: "transparent",
                    border: "none"}}
                    onClick={()=> navigate(`/properties/${mhpropertyId}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                    </svg>
                </Button>
            </div>
                <h1 className="form-header">Edit/Complete request</h1>
                <form className="note-form">
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input id="title" type="text" className="form-control"
                                value={
                                    note.description
                                }
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

                { 
                !hideDateCompleted ? (
                    <fieldset>
                            <div className="form-group">
                                <label htmlFor="date-completed">Completed on</label>
                                <input id="title" type="date" className="form-control"
                                    value={note.dateCompleted}
                                    onChange={
                                        (event) => {
                                            const copy = {
                                                ...note
                                            }
                                            copy.dateCompleted = event.target.value
                                            update(copy)
                                        }
                                    }/>
                            </div>
                    </fieldset>
                ) :
                
                <></>}

                <button className="btn btn-primary"
                    onClick={
                        (clickEvent) => handleSaveButtonClick(clickEvent)
                }>
                    Submit note</button>
            </form>
        </Container>
    </>
    )


}
