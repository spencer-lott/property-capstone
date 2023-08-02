import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editMaintenanceHistory, getMaintenanceHistoryById } from "../Managers/MaintenanceHistoryManager"
import { getPropertyById } from "../Managers/PropertiesManager"

export const MaintenanceHistoryEdit = () => {

    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)
    const navigate = useNavigate()
    const { noteId, mhpropertyId } = useParams()
    const [note, update] = useState({ 
        dateCompleted: '1999-09-09T13:40:50.994Z',
        description: "",
        userProfileId: PMUserObject.id,
        propertyId: mhpropertyId,
        dateRequested: Date.now()
    })

    useEffect(() => {
        getMaintenanceHistoryById(noteId)
        .then((noteArray) => {
            update(noteArray)
        })
    }, [noteId])

    useEffect(() => {
        getPropertyById(mhpropertyId)
        .then((propertyArray) => {
            update(propertyArray)
        })
    }, [mhpropertyId])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const noteToSentToAPI = {
            Id: parseInt(noteId),
            DateCompleted: '1999-09-09T13:40:50.994Z',
            Description: note.description,
            UserProfileId: PMUserObject.id,
            PropertyId: mhpropertyId,
            DateRequested: note.dateRequested
        }
        // need to navigate to the correct one
        return editMaintenanceHistory(noteToSentToAPI)
        // .then(() => getMaintenanceHistoryById(mhpropertyId))
        .then(navigate(`/properties/${mhpropertyId}`))
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

                {/* <fieldset>
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
 */}


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