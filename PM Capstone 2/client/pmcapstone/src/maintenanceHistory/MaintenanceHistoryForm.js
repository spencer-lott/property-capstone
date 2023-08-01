import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addMaintenanceHistory } from "../Managers/MaintenanceHistoryManager"




export const MaintenanceHistoryForm = () => {
    const navigate = useNavigate()
    const [note, update] = useState({

        //THESE SHOULD NOT BE EMPTY STRINGS FOR THE DATE?
        dateCompleted: "",
        description: "",
        userProfileId: "",
        dateRequested: Date.now()
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const noteToSentToAPI = {
            DateCompleted: note.dateCompleted,
            Description: note.description,
            UserProfileId: note.userProfileId,
            DateRequested: new Date().toISOString()
        }
//need to navigate to the correct one
        // return addMaintenanceHistory(noteToSentToAPI).then(navigate(`/properties`))
    }


    return <div>you made it to the create form</div>
}