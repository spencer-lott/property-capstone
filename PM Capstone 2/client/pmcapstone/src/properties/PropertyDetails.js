import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProperty, getPropertyById } from "../APIManagers/PropertiesManager";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { getMaintenanceHistoryByPropertyId } from "../APIManagers/MaintenanceHistoryManager";
import { MaintenanceHistory } from "../maintenanceHistory/MaintenanceHistory";
import "./Properties.css"

//This function displays the details for a specific property
export const PropertyDetails = () => {
    const [property, setProperty] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [notes, setNotes] = useState([]);

    //function to navigate the user to the assign tenant form if the link is clicked to assign. Or displays the name of the tenant if one is already assigned
    const tenantOrNoTenant = () => {
        if (property.userProfile.id === -1) {
            return <>NO TENANT <Link to={`/properties/assign-tenant/${property.id}`}>assign one?</Link></>
        } else {
            return `${property.userProfile.lastName}, ${property.userProfile.firstName}`;
        }
    };

    useEffect(() => {
        getPropertyById(id).then(setProperty);
    }, []);

    useEffect(() => {
        getMaintenanceHistoryByPropertyId(id).then(propertyNotes => setNotes(propertyNotes));
    }, []);

    if (!property) {
        return null;
    }

    const isVacant = () => {
        if (property.vacant === false) {
            return "NO";
        } else {
            return "YES";
        }
    };

    const handleDelete = () => {
        if (property?.userProfile?.id === -1) {

            deleteProperty(property.id)
            .then(propertyObject => setProperty(propertyObject))
            .then(() => {
                setShowAlert(false);
                navigate(`/properties`);
            });
        } else {
            //Preventative measure to make sure to the user profile is unassigned first before deleting a property
            window.alert(`${property?.userProfile?.firstName} ${property?.userProfile?.lastName} is still assigned to this property. Make sure they are moved out and unassigned before deleting this property.`);
            setShowAlert(false);
        }
    };

    const handleCancel = () => {
        setShowAlert(false);
    };

    const deletePropertyAlert = () => {
        return (
            <Alert variant="danger" key={'danger'}>
                Are you sure you want to delete this property?
                <br></br>
                <Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
            </Alert>
        );
    };

    return (
        <Container className="property-details">
            <Button className="back-arrow" style={{backgroundColor: "transparent",
                    border: "none"}}onClick={() => navigate(`/properties`)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg>
            </Button>
            <h1 className="property-details-header">{property.streetAddress}, {property.city}, {property.state} </h1>
            <Row>
                <Col>
                    <h3 className="h3-property-details">Property Details
                    <Button className="edit-button" style={{backgroundColor: "transparent",
                    border: "none"}} onClick={() => navigate(`/properties/edit/${property.id}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </Button>
                    <Button variant="danger" type="delete" style={{backgroundColor: "transparent",
                    border: "none"}}onClick={() => setShowAlert(true)}>                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>
                    </Button>
                    </h3>
                    <div><b>Street Address:</b> {property.streetAddress}</div>
                    <div><b>City:</b> {property.city}</div>
                    <div><b>State:</b> {property.state}</div>
                    <div><b>Type:</b> {property.type}</div>
                    <div><b>Size Description:</b> {property.sizeDescription}</div>
                    <div><b>Rent Amount:</b> ${property.rent}</div>
                    <div><b>Vacant:</b> {isVacant()}</div>
                    <div><b>Tenant:</b> {tenantOrNoTenant()}</div>
                    {showAlert && deletePropertyAlert()}
                </Col>
                <Col>
                <img className="red-house" src="https://media.istockphoto.com/id/155666671/tr/vekt%C3%B6r/vector-illustration-of-red-house-icon.jpg?s=612x612&w=0&k=20&c=WmDf-qFxoR1LZrP5JbHhxW_OUHlWqgtPg4qyRzn9Mko=" alt="" />
                </Col>
                </Row>

                <Col>
                    <h1>Request History</h1>
                    <Button onClick={() => navigate(`/maintenance-history/add/${property.id}`)}>Add Request</Button>
                    <Table>
                        <thead>
                            <tr>
                                <th>Completed Status</th>
                                <th>Description</th>
                                <th>Date Requested</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        {notes.map((note) => (
                            <MaintenanceHistory key={note.id} note={note} setNotes={setNotes} property={property} />
                        ))}
                    </Table>
                </Col>
        </Container>
    );
};
