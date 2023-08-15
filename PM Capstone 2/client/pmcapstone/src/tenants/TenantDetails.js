import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getUserProfileByIdWithProperty } from "../APIManagers/UserProfileManager";
import "./Tenants.css"


export const TenantDetails = () => {
    const navigate = useNavigate()
    const [tenant, setTenant] = useState();
    const { id } = useParams();

    useEffect(() => {
        getUserProfileByIdWithProperty(id).then(setTenant)
    },[])

    let formatPhoneNumber = (str) => {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');
        
        //Check if the input is of correct length
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        };
      
        return null
      };
    
    return (
        <>
        <Container>
        <Button className="back-arrow" style={{backgroundColor: "transparent",
                    border: "none"}}onClick={() => navigate(`/properties`)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg>
            </Button>

        <h1 className="tenant-details-header">{tenant?.firstName} {tenant?.lastName}</h1>
        <Row>
            <Col>
            <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="black" className="bi bi-people-fill" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
            </svg>
            </Col>
            <Col>
                <h3 className="tenant-details">Tenant Details</h3>
                <div><b>Name:</b> {tenant?.firstName}, {tenant?.lastName}</div>
                <div><b>Phone:</b> {formatPhoneNumber(tenant?.phone)}</div>
                <div><b>Email:</b> {tenant?.email}</div>
                <div><b>Street Address:</b> {tenant?.property?.streetAddress}</div>
                <div><b>Rent:</b> ${tenant?.property?.rent}/Mo</div>
                <div><b>Employment:</b> {tenant?.employment}</div>
                <div><b>Emergency Contact:</b> {tenant?.emergencyContactName} {formatPhoneNumber(tenant?.emergencyContactPhone)}</div>

            </Col>
        </Row>
            <Col>
            <h3>General Notes</h3>
            {tenant?.generalNotes}
            </Col>
        </Container>
        </>
    )
}