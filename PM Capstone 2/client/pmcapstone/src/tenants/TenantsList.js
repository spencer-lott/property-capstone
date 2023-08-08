import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { Tenant } from "./Tenant";
import { getAllUserProfiles, getAllUserProfilesWithProperty } from "../APIManagers/UserProfileManager";

export const TenantsList = () => {
const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [filteredTenants, setFilteredTenants] = useState([])

    const getUsers = () => {
        getAllUserProfilesWithProperty().then(allUsers => setUsers(allUsers));
    }

    useEffect(() => {
        getUsers();
    },[])

    useEffect(() => {
        const tenants = users.filter(user => user.isAdmin === false && user.isEmployee === false)
            setFilteredTenants(tenants)
    }, [users])

    return (<>
        <Container fluid className="tenants-list">
            <Row>
                <Col>
                    {/* search input */}
                </Col>
            </Row>
            <Row>
                <Col>
                <Table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Street Address</th>
                </tr>
                </thead>
                {filteredTenants.map((tenant) => {
                return  <Tenant key={tenant.id} tenant={tenant} />
              })} 

                </Table>
                </Col>
            </Row>
        </Container>
    </>
    );
}