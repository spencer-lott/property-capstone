import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row, Table } from "reactstrap";
import { Alert, Button } from "react-bootstrap";
import { getAllProperties, searchProperties } from "../APIManagers/PropertiesManager";
import "./PropertiesList.css"

export const PropertyList = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [hideProperties, setHideProperties] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showVacant, setShowVacant] = useState(false)
  const [vacantProperties, setVacantProperties] = useState([])

  const getProperties = () => {
    getAllProperties().then((allProperties) => setProperties(allProperties))
  }

  useEffect(() => {
    getProperties()
  }, [])

  const create = () => {
    navigate("/properties/add");
  }

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value)
    setShowAlert(false)
  }

  const handleSearchButtonClick = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === ""){
        setShowAlert(true)
    } else {
        searchProperties(searchQuery).then((response) => {
            setSearchResults(response);
            setHideProperties(false);
        })
    }
  }

  const handleCancelSearch = () => {
        setSearchQuery("")
        setSearchResults([])
        setHideProperties(false)
  }

  const emptySearchAlert = () => {
    return (
        <Alert variant="danger" key={'danger'}>
            <div>You cannot leave the search input blank. <Link onClick={() => setShowAlert(false)}>clear</Link></div>
        </Alert>
    )
  }

  const switchView = () => {
    setShowVacant(!showVacant)
  }

  useEffect(() => {
    const vacancies = properties.filter(property => property.vacant === true)
    setVacantProperties(vacancies)
  }, [properties])

  return (
    <>
      <Container className="properties-list">
        <Row>
          <Col className="col1">
            <Button onClick={create}>Create New</Button>
            </Col>

              <Col className="col2">
              <div>
                <form className="property-search-form">
                  <input
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <Button onClick={handleSearchButtonClick} color="primary">
                    Search
                  </Button>
                  {showAlert && emptySearchAlert()}
                </form>
              </div>
              </Col>

            {searchResults.length > 0 && (
              <div>
                <div><Link onClick={handleCancelSearch}>Quit Search</Link></div>
                <h3>Search Results:</h3>
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
                  <tbody>
                    {searchResults.map((property) => (
                      <tr key={property.id}>
                        <td>
                          <Link to={`/properties/${property.id}`}>
                            {property.streetAddress}
                          </Link>
                        </td>
                        <td>
                          {property.city}, {property.state}
                        </td>
                        <td>{property.type}</td>
                        <td>{property.sizeDescription}</td>
                        <td>{property.rent}</td>
                        <td>{property.vacant === true ? "Y" : "N"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
        </Row>
          {!showVacant ?
        <Row>
          {!hideProperties && searchResults.length === 0 && (
            <>
            <Row>
              <div className="switch-view">
              <Button onClick={switchView}>Show Vacant Properties</Button>
              </div>
              </Row>
              <Col className="col3">
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
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id}>
                      <td>
                        <Link to={`/properties/${property.id}`}>
                          {property.streetAddress}
                        </Link>
                      </td>
                      <td>
                        {property.city}, {property.state}
                      </td>
                      <td>{property.type}</td>
                      <td>{property.sizeDescription}</td>
                      <td>${property.rent}</td>
                      <td>{property.vacant === true ? "Y" : "N"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            </>

          )}
        </Row>
      :<>
        <Col>
        <Button onClick={switchView}>Show All Properties</Button>
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
          <tbody>
            {vacantProperties.map((property) => (
              <tr key={property.id}>
                <td>
                  <Link to={`/properties/${property.id}`}>
                    {property.streetAddress}
                  </Link>
                </td>
                <td>
                  {property.city}, {property.state}
                </td>
                <td>{property.type}</td>
                <td>{property.sizeDescription}</td>
                <td>${property.rent}</td>
                <td>{property.vacant === true ? "Y" : "N"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Col>
        </>
        } 
      </Container>
    </>
  );
};
