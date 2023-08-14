import { useEffect, useState } from "react"
import { getAllMaintenanceHistoryWithProperty } from "../APIManagers/MaintenanceHistoryManager"
import { Request } from "./Request"
import { Button, Col, Container, Row, Table } from "reactstrap";
import "./Requests.css"


export const AllRequestsList = () => {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        getAllMaintenanceHistoryWithProperty().then(allRequests => setRequests(allRequests))
    },[])

    return (
        <>
        <Container className="all-requests-list">
        <h1 className="requests-header">All Requests</h1>
            <Col>
                <Table>
                    <thead>
                        <tr>
            
                            <th>Status</th>
                            <th>Date Completed</th>
                            <th>Date Requested</th>
                            <th>Description</th>
                            <th>Tenant</th>
                            <th>Property Address</th>
                        </tr>
                    </thead>
                    {requests.map((request) => {
                    return  <Request key={request.id} request={request} />
                })} 
                </Table>
            </Col>
        </Container>
        </>
    )
}