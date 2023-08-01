import { Col, Container, Row } from "react-bootstrap"
import { Label } from "reactstrap"



export const MaintenanceHistory = ({ note }) => {

    return(<>
    <Container>
        <Row>
            <Col> 
                <Label>Date Completed</Label>
                <div>{note.dateCompleted}</div>
            </Col>
            <Col>
                <Label>Description</Label>
                <div>{note.description}</div>
            </Col>
            <Col>
                <Label>UserProfileId</Label>
                <div>{note.userProfileId}</div>
            </Col>
            <Col>
                <Label>Date requested</Label>
                <div>{note.dateRequested}</div>
            </Col>
            <br></br>
        </Row>
    </Container>
    </>)
}