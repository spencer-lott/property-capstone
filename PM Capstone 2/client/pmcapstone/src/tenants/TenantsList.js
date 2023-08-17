import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { Alert } from "react-bootstrap";
import { Tenant } from "./Tenant";
import { getAllUserProfilesWithProperty, searchUserProfiles } from "../APIManagers/UserProfileManager";
import "./Tenants.css"

//This function is responsible for showing all the tenants that exist.
export const TenantsList = () => {
    const [users, setUsers] = useState([]);
    const [filteredTenants, setFilteredTenants] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [hideTenants, setHideTenants] = useState(false)
    const [showAlert, setShowAlert] = useState(false)  

    //function I found on stack overflow to format the phone number nicely for the UI
    let formatPhoneNumber = (str) => {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '')
        
        //Check if the input is of correct length
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
      
        return null
      }

    const getUsers = () => {
        getAllUserProfilesWithProperty().then(allUsers => setUsers(allUsers));
    }

    useEffect(() => {
        getUsers();
    },[])

    //Filtering the employees and admins out of the list so that we only see tenant UserProfiles
    useEffect(() => {
        const tenants = users.filter(user => user.isAdmin === false && user.isEmployee === false)
            setFilteredTenants(tenants)
    }, [users])

    //See PropertiesList.js for a similar search 
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value)
        setShowAlert(false)
      }
    
      const handleSearchButtonClick = (event) => {
        event.preventDefault();
    
        if (searchQuery.trim() === ""){
            setShowAlert(true)
        } else {
            searchUserProfiles(searchQuery).then((response) => {
                setSearchResults(response);
                setHideTenants(false);
            })
        }
      }
    
      const handleCancelSearch = () => {
            setSearchQuery("")
            setSearchResults([])
            setHideTenants(false)
      }
    
      const emptySearchAlert = () => {
        return (
            <Alert variant="danger" key={'danger'}>
                <div>You cannot leave the search input blank. <Link onClick={() => setShowAlert(false)}>clear</Link></div>
            </Alert>
        )
    }

    return (<>
        <Container className="tenants-list">
            <h1 className="tenants-list-header">All Tenants</h1>
            <Row>
                <Col className="col1">
                <div>
                <form className="tenant-search-form">
                    <input
                    className="tenant-search"
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
                </Row>

                <Row>
                <Col>
                {searchResults.length > 0 && (
                    <div>
                        <Link className="tenant-cancel-search" onClick={handleCancelSearch}>Quit Search</Link>
                        <h3>Search Results:</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email Address</th>
                                    <th>Street Address</th>
                                </tr>
                            </thead>
                        <tbody>
                            {searchResults.map((tenant) => (
                            <tr key={tenant.id}>
                                <td>
                                <Link to={`/users/tenants/${tenant.id}`}>
                                    {tenant.lastName}, {tenant.firstName}
                                </Link>
                                </td>
                                <td>{formatPhoneNumber(tenant.phone)}</td>
                                <td>{tenant.email}</td>
                                <td>{tenant?.property?.streetAddress}</td>
                            </tr>
                            ))}
                        </tbody>
                        </Table>
                    </div>
                )}
                
          </Col>
          
            </Row>
            <Row>
                {!hideTenants && searchResults.length === 0 && (
                    <>
                <Col className="col2">
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email Address</th>
                                <th>Street Address</th>
                            </tr>
                        </thead>
                    {filteredTenants.map((tenant) => {
                    return  <Tenant key={tenant.id} tenant={tenant} />
                })} 
                    </Table>
                </Col>
                </>
                )}
            </Row>
        </Container>
    </>
    );
}