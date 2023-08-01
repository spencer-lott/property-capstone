


export const MaintenanceHistory = ({ note }) => {

    return(<>
    <div>Date completed: {note.dateCompleted}</div>
    <div>Description: {note.description}</div>
    <div>User profile ID: {note.userProfileId}</div>
    <div>Date requested: {note.dateRequested}</div>
    <br></br>
    </>)
}