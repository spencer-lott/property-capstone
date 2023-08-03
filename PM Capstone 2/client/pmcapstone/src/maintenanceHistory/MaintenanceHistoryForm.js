import {useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {addMaintenanceHistory} from "../Managers/MaintenanceHistoryManager"

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
        return addMaintenanceHistory(noteToSentToAPI).then(navigate(`/properties/${propertyId}`))
    }

    return (
        <>
            <div>
                <h1>Create a new note</h1>
                <form className="note-form">
                    <h2 className="note-form">New note</h2>

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


    </>
    )
}
