import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { Alert } from "react-bootstrap";
import { Tenant } from "./Tenant";
import { getAllUserProfilesWithProperty, searchUserProfiles } from "../APIManagers/UserProfileManager";

export const TenantsList = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [filteredTenants, setFilteredTenants] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [hideTenants, setHideTenants] = useState(false)
    const [showAlert, setShowAlert] = useState(false)  

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

    useEffect(() => {
        const tenants = users.filter(user => user.isAdmin === false && user.isEmployee === false)
            setFilteredTenants(tenants)
    }, [users])

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
        <Container fluid className="tenants-list" style={{backgroundColor:"#f2f3f4"}}>
            <Row>
                <Col>
                <div>
                <form className="tenant-search-form">
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
                {searchResults.length > 0 && (
                    <div>
                        <div><Link onClick={handleCancelSearch}>Quit Search</Link></div>
                        <h3>Search Results:</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
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
                )}
            </Row>
        </Container>
    </>
    );
}