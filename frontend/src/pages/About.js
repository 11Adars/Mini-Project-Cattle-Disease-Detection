import React from "react";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";

const About = () => {
    const backgroundStyle = {
        backgroundColor: "#b7d7e8",
        minHeight: "100vh", // Ensures the background covers the full viewport
        padding: "20px",
        filter: "brightness(85%)", // Slightly adjusts overall brightness
    };

    const carouselImageStyle = {
        filter: "brightness(90%) contrast(90%)", // Reduces brightness and contrast
        height: "400px", // Optional: Adjust height to maintain consistency
        objectFit: "cover", // Ensures images fit properly
    };

    return (
        <div style={backgroundStyle}>
            <Container className="mt-5">
                {/* Carousel Section */}
                <Row className="justify-content-center mb-5">
                    <Col md={8}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://thedailyguardian.com/wp-content/uploads/2023/05/COW-scaled.jpg"
                                    alt="First slide"
                                    style={carouselImageStyle}
                                />
                                <Carousel.Caption>
                                    <h3>Revolutionizing Cattle Health Monitoring</h3>
                                    <p>
                                        Our advanced AI-powered tools help you detect cattle diseases early, ensuring timely treatment and better health outcomes.
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://www.shutterstock.com/image-photo/concept-agriculture-cattle-livestock-farming-260nw-2404586707.jpg"
                                    alt="Second slide"
                                    style={carouselImageStyle}
                                />
                                <Carousel.Caption>
                                    <h3>Personalized Preventive Care</h3>
                                    <p>
                                        Access tailored solutions and remedies to keep your cattle healthy and thriving.
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://cdn.agriland.ie/uploads/2018/01/dairy-cows-silage-1280x720.jpg"
                                    alt="Third slide"
                                    style={carouselImageStyle}
                                />
                                <Carousel.Caption>
                                    <h3>Boosting Farm Efficiency</h3>
                                    <p>
                                        Empower your farming with healthier cattle and improved productivity using our innovative platform.
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>

                {/* About Section */}
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="text-center mb-4">
                                    About Cattle Health Portal
                                </Card.Title>
                                <Card.Text>
                                    The <strong>Cattle Health Portal</strong> is an innovative platform designed to help cattle farmers and dairy managers maintain the health of their cattle. Our system leverages advanced image processing and machine learning technologies to detect cattle diseases from images uploaded by users.
                                </Card.Text>
                                <Card.Text>
                                    By providing accurate predictions and preventive measures, this portal empowers farmers to:
                                </Card.Text>
                                <ul>
                                    <li>Identify diseases early to ensure timely treatment.</li>
                                    <li>Access disease-specific preventive measures and remedies.</li>
                                    <li>Improve cattle health and overall productivity.</li>
                                </ul>
                                <Card.Text>
                                    Whether you're managing a small farm or a large-scale dairy operation, the Cattle Health Portal is your trusted partner for ensuring the health and welfare of your livestock.
                                </Card.Text>
                                <Card.Text className="text-center mt-4">
                                    <strong>Together, let's create a healthier and more sustainable future for our cattle!</strong>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default About;
