import { useEffect, useState } from "react"
import { getAllMaintenanceHistory } from "../APIManagers/MaintenanceHistoryManager"
import { getUserProfileByIdWithProperty } from "../APIManagers/UserProfileManager"
import { TenantsRequests } from "./TenantsRequests"
import { Col, Container, Table } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import "./TenantPortal.css"

export const MyRequests = () => {
    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [allHistory, setAllHistory] = useState([])
    const [filteredRequests, setFilteredRequests] = useState([])

    useEffect(() => {
        getUserProfileByIdWithProperty(PMUserObject.id).then(singleUser => setUser(singleUser))
    },[])

    useEffect(() => {
        getAllMaintenanceHistory().then(history => setAllHistory(history))
    },[])

    useEffect(() => {
        const personalRequests = allHistory.filter(request => request.propertyId === user?.property?.id)
        setFilteredRequests(personalRequests)
    },[allHistory])

    return (
        <>
        <Container>
        <Button className="back-arrow" style={{backgroundColor: "transparent",
                    border: "none"}}onClick={() => navigate(`/`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
            </Button>
            <h1 id="L" className="requests-header">My Requests</h1>
            <h3 className="emergency-phone-header">FOR EMERGENCIES PLEASE CALL (304) 989-3535</h3>
            <Col>
            <Button onClick={() => navigate(`/maintenance-history/add/${user?.property?.id}`)}>Add Request</Button>
                <Table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Date requested</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                        {
                            filteredRequests.map((personalRequest) => (
                            <TenantsRequests key={personalRequest.id} personalRequest={personalRequest} setAllHistory={setAllHistory} user={user}/>
                            ))
                        }
                </Table>
            </Col>
            </Container>

        </>
    )
}