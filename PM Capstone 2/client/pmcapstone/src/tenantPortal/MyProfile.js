import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { getUserProfileByIdWithProperty } from "../APIManagers/UserProfileManager";


export const MyProfile = () => {
    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)
    const navigate = useNavigate()
    const [tenant, setTenant] = useState();

    useEffect(() => {
        getUserProfileByIdWithProperty(PMUserObject.id).then(setTenant)
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
            <Button onClick={() => navigate(`/my-profile/edit/${PMUserObject.id}`)}>Edit My Information</Button>

            </Col>
        </Row>
        </Container>
        </>
    )

}