import { useEffect, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { getAllProperties } from "../APIManagers/PropertiesManager";
import { Property } from "./Property";

export const PropertyList = () => {
    const navigate = useNavigate()
    const [properties, setProperties] = useState([]);

    const getProperties = () => {
        getAllProperties().then(allProperties => setProperties(allProperties));
    }

    useEffect(() => {
        getProperties();
    },[])

    const create = () => {
        navigate("/properties/add")
    }

    return (<>
        <Container fluid className="properties-list">
            <Row>
                <Col>
                <Button onClick={create}>Create New</Button>
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
                    <th>Street Address</th>
                    <th>City/State</th>
                    <th>Type</th>
                    <th>Size Description</th>
                    <th>Monthly Rent</th>
                    <th>Vacant</th>
                </tr>
                </thead>
                {properties.map((property) => {
                return  <Property key={property.id} property={property} />
              })}

                </Table>
                </Col>
            </Row>
        </Container>
    </>
    );
}