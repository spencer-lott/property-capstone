import {Col, Container, Row} from "reactstrap"
import "./TenantPortal.css"

//Landing page for the tenant portal. They are shown this welcome message as well as a photo
export const MyHome = () => {

    return (
        <>
            <Container className="tenant-portal">
                <h1 className="tenant-portal-header">Welcome to your Property Manager Tenant Portal!</h1>
                <Row>
                    <Col className="tenant-message">

                            <p id="C">We're thrilled to have you as part of our community and to introduce you to your new digital home. Our Tenant Portal is designed with you in mind, offering a seamless and convenient way to manage aspects of your residency.</p>

                            <h5 id="L">Here's what you can look forward to:</h5>
                            <p id="C"><b id="L">Easy Access:</b> Access your account anytime, anywhere. Whether you're at home or on the go, our Tenant Portal is accessible on your desktop, tablet, or smartphone.</p>

                            <p id="C"><b id="L">Request Maintenance:</b> Report maintenance issues with just a few clicks. Our dedicated team is here to ensure your living experience is comfortable and hassle-free.</p>

                            <p id="C"><b id="L">Account Overview:</b> Keep track of your payment history, request statuses, and more in a user-friendly dashboard.</p>

                            <p id="C">Your comfort and satisfaction are our top priorities. We're committed to providing you with exceptional service and a seamless online experience. Should you have any questions or need assistance, our support team is just a click away.</p>
                            
                            <p id="C">Best Regards,
                            The Management Team</p>
                    </Col>
                    <Col>
                        <img className="tenant-img" src="./NiceHouse.jpg"/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
