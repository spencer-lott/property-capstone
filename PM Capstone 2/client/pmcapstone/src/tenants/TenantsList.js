// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Col, Container, Row, Table } from "reactstrap";
// import { getAllTenants, getAllTenantsWithPropertyAndUserProfile } from "../APIManagers/TenantManager";
// import { Tenant } from "./Tenant";

// export const TenantsList = () => {
// const navigate = useNavigate()
//     const [tenants, setTenants] = useState([]);

//     const getTenants = () => {
//         getAllTenantsWithPropertyAndUserProfile().then(allTenants => setTenants(allTenants));
//     }

//     useEffect(() => {
//         getTenants();
//     },[])

//     const create = () => {
//         navigate("/tenants/add")
//     }

//     return (<>
//         <Container fluid className="tenants-list">
//             <Row>
//                 <Col>
//                 <Button onClick={create}>Create New</Button>
//                 </Col>
//                 <Col>
//                     {/* search input */}
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                 <Table>
//                 <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Phone</th>
//                     <th>Email</th>
//                     <th>Street Address</th>
//                 </tr>
//                 </thead>
//                 {tenants.map((tenant) => {
//                 return  <Tenant key={tenant.id} tenant={tenant} />
//               })} 

//                 </Table>
//                 </Col>
//             </Row>
//         </Container>
//     </>
//     );
// }