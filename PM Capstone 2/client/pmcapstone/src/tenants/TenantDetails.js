import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { getTenantById } from "../APIManagers/TenantManager";
import { getUserProfileByIdWithProperty } from "../APIManagers/UserProfileManager";


export const TenantDetails = () => {
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
        <Row>
            <Col>
                <div>Name: {tenant?.firstName} {tenant?.lastName}</div>
                <div>Phone: {formatPhoneNumber(tenant?.phone)}</div>
                <div>Email: {tenant?.email}</div>
                <div>Street Address: {tenant?.property?.streetAddress}</div>
                <div>Rent: ${tenant?.property?.rent}/Mo</div>
                <div>Employment: {tenant?.employment}</div>
                <div>Emergency Contact: {tenant?.emergencyContactName} {formatPhoneNumber(tenant?.emergencyContactPhone)}</div>

            </Col>
            <Col>
            <h3>General Notes</h3>
            {tenant?.generalNotes}
            </Col>
        </Row>
        </Container>
        </>
    )
}