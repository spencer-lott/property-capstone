import { useEffect, useState } from "react"
import { getAllUserProfiles } from "../Managers/UserProfileManager"
import { Button, Col, Container, Row, Table } from "reactstrap";
import { UserProfile } from "./UserProfile";

export const UserProfilesList = () => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        getAllUserProfiles().then(allUsers => setUsers(allUsers))
    }
    
    console.log(users)
    useEffect(() => {
        getUsers()
    }, [])

    // const create = () => {
    //     navigate("/properties/add")
    // }


    return (<>
        <Container fluid className="users-list">
            <Row>
                <Col>
                {/* <Button onClick={create}>Create New</Button> */}
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
                    <th>Email</th>
                    <th>User Type</th>
                </tr>
                </thead>
                {users.map((user) => {
                return  <UserProfile key={user.id} user={user} />
              })}

                </Table>
                </Col>
            </Row>
        </Container>
    </>
    );


}