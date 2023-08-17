import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row, Table } from "reactstrap";
import { Alert, Button } from "react-bootstrap";
import { getAllProperties, searchProperties } from "../APIManagers/PropertiesManager";
import "./Properties.css"

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

  //This is what is displaying all the properties on the page
  useEffect(() => {
    getProperties()
  }, [])

  const create = () => {
    navigate("/properties/add");
  }

  //This is what handles the search
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value)
    setShowAlert(false)
  }

  //I didn't want to be able to see the search results and the original table, so I used state to hide the original table then unhide it when the quit search button link was clicked
  const handleSearchButtonClick = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === ""){
        setShowAlert(true) //if empty search an alert is shown
    } else {
        searchProperties(searchQuery).then((response) => {
            setSearchResults(response);
            setHideProperties(false);
        })
    }
  }

  //Cancel search function when the "Quit search" link is clicked. Then shows all the properties instead of just the ones that meet the search criteria.
  const handleCancelSearch = () => {
        setSearchQuery("")
        setSearchResults([])
        setHideProperties(false)
  }

  //Prevents the user from submitting and empty search. This was necessary to prevent a bug
  const emptySearchAlert = () => {
    return (
        <Alert variant="danger" key={'danger'}>
            <div>You cannot leave the search input blank. <Link onClick={() => setShowAlert(false)}>clear</Link></div>
        </Alert>
    )
  }

  //This function and the useEffect below filter and use state to display properties that are vacant by the click of a button. When the button is clicked again, it shows all the properties again. I did something similar to this in my bird-capstone
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
        <h1 className="properties-list-header">All Properties</h1>
        <Row>
          <Col className="pcol1">
            <Button onClick={create}>Create New</Button>
            </Col>

              <Col className="pcol2">
              <div>
                <form className="property-search-form">
                  <input className="property-search"
                    placeholder="search"
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <Button onClick={handleSearchButtonClick} color="primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </Button>
                  {showAlert && emptySearchAlert()}
                </form>
              </div>
              </Col>

            {searchResults.length > 0 && (
              <div className="search-results">
                <Link className="cancel-search" onClick={handleCancelSearch}>Quit Search</Link>
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
              </div>
              </Row>
              <Col className="pcol3">
              <Button variant="warning" onClick={switchView}>Filter Vacancies</Button>

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
        <Col className="pcol4">
        <Button variant="warning" onClick={switchView}>Unfilter Vacancies</Button>
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
