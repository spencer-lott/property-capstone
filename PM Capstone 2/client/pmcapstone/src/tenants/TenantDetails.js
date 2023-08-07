// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
// import { getTenantById } from "../APIManagers/TenantManager";


// export const TenantDetails = () => {
//     const [tenant, setTenant] = useState();
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [showAlert, setShowAlert] = useState(false)

//     useEffect(() => {
//         getTenantById(id).then(setTenant)
//     },[])

//     let formatPhoneNumber = (str) => {
//         //Filter only numbers from the input
//         let cleaned = ('' + str).replace(/\D/g, '');
        
//         //Check if the input is of correct length
//         let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      
//         if (match) {
//           return '(' + match[1] + ') ' + match[2] + '-' + match[3]
//         };
      
//         return null
//       };
    
//     return (
//         <>
//         <Container>
//         <Row>
//             <Col>
//                 <div>Name: {tenant?.userProfile?.firstName} {tenant?.userProfile?.lastName}</div>
//                 <div>Phone: {formatPhoneNumber(tenant?.phone)}</div>
//                 <div>Email: {tenant?.userProfile?.email}</div>
//                 <div>Street Address: {tenant?.property?.streetAddress}</div>
//                 <div>Rent: ${tenant?.property?.rent}/Mo</div>
//                 <div>Employment: {tenant?.employment}</div>
//                 <div>Emergency Contact: {tenant?.emergencyContactName} {formatPhoneNumber(tenant?.emergencyContactPhone)}</div>

//                 {/* <Button onClick={() => navigate(`/properties/edit/${tenant.id}`)}>Edit</Button> */}
//                 <Button variant="danger" type="delete"onClick={() => {setShowAlert(true)}}> 
//                 Delete
//                 </Button>
//                 {/* {showAlert && deletePostAlert()} */}
//             </Col>
//             <Col>
//             <h3>General Notes</h3>
//             {tenant?.generalNotes}
//             </Col>
//         </Row>
//         </Container>
//         </>
//     )
// }