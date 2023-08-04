import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProperty, getPropertyById } from "../APIManagers/PropertiesManager";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { getMaintenanceHistoryByPropertyId } from "../APIManagers/MaintenanceHistoryManager";
import { MaintenanceHistory } from "../maintenanceHistory/MaintenanceHistory";
import { getAllUserProfiles } from "../APIManagers/UserProfileManager";

export const PropertyDetails = () => {
    const [property, setProperty] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false)
    const localPMUser = localStorage.getItem("userProfile");
    const PMUserObject = JSON.parse(localPMUser);
    const [notes, setNotes] = useState([])
    const [users, setUsers] = useState([])

    
    // const tenantOrNoTenant = () => {
    //     for (let i = 0; i < users.length; i++) {
    //         const user = users[i]
    //         // if (user?.tenant.propertyId === property.id){
    //             //     // console.log(users)
    //             //     return `${user.lastName} ${user.firstName}`
    //             // }
    //             if (user?.tenant.id === 2){
    //                 console.log(user.firstName)
    //             }
    //         }
            
    //     }
    //     tenantOrNoTenant()
    //     // console.log(users)

    useEffect(() => {
            getAllUserProfiles().then(allUserProfiles => setUsers(allUserProfiles))
    },[])
        
    useEffect(() => {
        getPropertyById(id).then(setProperty)
    },[])
    
    useEffect(() => {
        getMaintenanceHistoryByPropertyId(id).then(propertyNotes => setNotes(propertyNotes))
    }, [])
    // console.log(property?.tenant?.userProfile)

    if (!property) {
        return null;
    }

    const isVacant = () => {
        if (property.vacant === false){
            return "NO"
        }
        else return "YES"
    }

    // const tenantOrNoTenant = () => {
    //     if (property?.tenant.id === -1) {
    //         return "N/A"
    //     }
    //     else {
    //         return `${property?.tenant.lastName}, ${property?.tenant.firstName}`
    //     }
    
    // }


    const handleDelete = () => {
        deleteProperty(property.id).then(() => {
          setShowAlert(false)
          navigate(`/properties`)
        });
      };   
      
    const handleCancel = () => {
        setShowAlert(false) 
    }

    const deletePostAlert = () => {
        return (<>
        <Alert variant="danger" key={'danger'}>
          Are you sure you want to delete this property???
          <br></br><Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
        </Alert>
        </>)
      }

    return(
        <>
        <Container>
        <Row>
            <Col>
                <div>Street Address: {property.streetAddress} </div>
                <div>City: {property.city} </div>
                <div>State: {property.state} </div>
                <div>Type: {property.type} </div>
                <div>Size Description: {property.sizeDescription}</div>
                <div>Rent Amount: ${property.rent} </div>
                <div>Vacant: {isVacant()}</div>
                {/* <div>Tenant: {tenantOrNoTenant()}</div> */}
                <div style={{color: "orange"}}>TENANT NAME IS SUPPOSED TO GO RIGHT HERE!!!!! HEADS UP YOU MAY HAVE TO USE COALESCE IN THE BACKEND. GET TENANTS CRUDDING FIRST</div>
                <Button onClick={() => navigate(`/properties/edit/${property.id}`)}>Edit</Button>
                <Button variant="danger" type="delete"onClick={() => {setShowAlert(true)}}> 
                Delete
                </Button>
                {showAlert && deletePostAlert()}
            </Col>
            <Col>
            <h1>Maintenance History</h1>
            <Button onClick={() => navigate(`/maintenance-history/add/${property.id}`)}>Create Note</Button>
            <Table>
            <thead>
              <tr>
                <th>Completed Status</th>
                <th>Description</th>
                <th>Date Requested</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>

            {notes.map((note) => {
                return <MaintenanceHistory key={note.id} note={note} setNotes={setNotes} property={property} />
            })}
            </Table>
            </Col>
        </Row>
        </Container>
            
        </>
    )
}