import { useEffect, useState } from "react"
import { getAllMaintenanceHistory } from "../APIManagers/MaintenanceHistoryManager"
import { getUserProfileByIdWithProperty } from "../APIManagers/UserProfileManager"
import { TenantsRequests } from "./TenantsRequests"
import { Col, Table } from "reactstrap"

export const MyRequests = () => {
    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)
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
            <h1>My Requests</h1>
            <h3>FOR EMERGENCIES PLEASE CALL (304) 989-3535</h3>
            <Col>
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
                    <TenantsRequests key={personalRequest.id} personalRequest={personalRequest} setAllHistory={setAllHistory}/>
                    ))

                }

                </Table>
            </Col>

        </>
    )
}