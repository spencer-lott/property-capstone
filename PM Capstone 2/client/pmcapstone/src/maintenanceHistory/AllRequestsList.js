import { useEffect, useState } from "react"
import { getAllMaintenanceHistory, getAllMaintenanceHistoryWithProperty } from "../APIManagers/MaintenanceHistoryManager"
import { Request } from "./Request"
import { Button, Col, Container, Row, Table } from "reactstrap";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const AllRequestsList = () => {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        getAllMaintenanceHistoryWithProperty().then(allRequests => setRequests(allRequests))
    },[])


    return (
        <><Container style={{backgroundColor:"#f2f3f4"}}>
        <h1>All Requests</h1>
            <Col>
                <Table>
                    <thead>
                        <tr>
            
                            <th>Status</th>
                            <th>Date</th>
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