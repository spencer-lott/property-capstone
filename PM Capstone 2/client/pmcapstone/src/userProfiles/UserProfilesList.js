import { useEffect, useState } from "react"
import { getAllUserProfilesWithProperty } from "../APIManagers/UserProfileManager"
import { Col, Container, Row, Table } from "reactstrap";
import { Button } from "react-bootstrap"
import { UserProfile } from "./UserProfile";
import { useNavigate } from "react-router-dom";
import "./UserProfiles.css"

//This function displays the table of all the UserProfiles
export const UserProfilesList = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    const getUsers = () => {
        getAllUserProfilesWithProperty().then(allUsers => setUsers(allUsers))
    }
    
    useEffect(() => {
        getUsers()
    }, [])

    const create = () => {
        navigate("/users/add")
    }

    return (<>
        <Container className="users-list"> 
            <h1 className="users-list-header">All User Profiles</h1>
            <Row>
                <Col>
                    <Button onClick={create}>Add New User</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                <Table>
                <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>User Type</th>
                    <th></th>
                    <th></th>
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