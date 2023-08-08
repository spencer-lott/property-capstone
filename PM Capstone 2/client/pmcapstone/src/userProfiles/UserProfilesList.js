import { useEffect, useState } from "react"
import {  getAllUserProfiles } from "../APIManagers/UserProfileManager"
import { Button, Col, Container, Row, Table } from "reactstrap";
import { UserProfile } from "./UserProfile";
import { useNavigate } from "react-router-dom";

export const UserProfilesList = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    const getUsers = () => {
        getAllUserProfiles().then(allUsers => setUsers(allUsers))
    }
    
    // console.log(users)
    useEffect(() => {
        getUsers()
    }, [])

    const createEmployee = () => {
        navigate("/users/add-employee")
    }

    const createTenant = () => {
        navigate("/users/add-tenant")
    }

    const create = () => {
        navigate("/users/add")
    }


    return (<>
        <Container fluid className="users-list">
            <Row>
                <Col>
                {/* <Button onClick={createEmployee}>New Employee</Button>
                <Button onClick={createTenant}>New Tenant</Button> */}
                <Button onClick={create}>New User</Button>

                </Col>
                <Col>
                    {/* search input */}
                </Col>
            </Row>
            <Row>
                <Col>
                <Table>
                <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                </tr>
                </thead>
                {users.map((user) => {
                return  <UserProfile key={user.id} user={user} setUsers={setUsers}/>
              })}

                </Table>
                </Col>
            </Row>
        </Container>
    </>
    );


}