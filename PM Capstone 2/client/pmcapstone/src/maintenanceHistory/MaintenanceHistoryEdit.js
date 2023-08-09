import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {editMaintenanceHistory, getMaintenanceHistoryById} from "../APIManagers/MaintenanceHistoryManager"
import {getPropertyById} from "../APIManagers/PropertiesManager"

export const MaintenanceHistoryEdit = () => {
    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)
    const navigate = useNavigate()
    const {noteId, mhpropertyId} = useParams()
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
        return editMaintenanceHistory(noteToSentToAPI).then(navigate(`/properties/${mhpropertyId}`))
    }

    return (
        <>
            <div>
                <h1>Edit or complete request</h1>
                <form className="note-form">
                    <h2 className="note-form">New note</h2>

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

                { <fieldset>
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
                </fieldset>}

                <button className="btn btn-primary"
                    onClick={
                        (clickEvent) => handleSaveButtonClick(clickEvent)
                }>
                    Submit note</button>
            </form>
        </div>


    </>
    )


}
