import React from "react";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";

const PreventiveMeasure = () => {

    const backgroundStyle = {
        backgroundColor: "#b7d7e8",
        minHeight: "100vh", // Ensures the background covers the full viewport
        padding: "20px",
        filter: "brightness(85%)", // Slightly adjusts overall brightness
    };

    // Example data for carousel news (can be dynamically fetched from an API)
    const news = [
        {
            title: "Skin disease",
            description: "Whats the reason.",
            img: "https://i.ytimg.com/vi/vlCzEUm4ZUA/maxresdefault.jpg"
        },
        {
            title: "Global Rise in Swine Flu Cases",
            description: "Protect yourself and livestock with timely vaccinations.",
            img: "https://www.mdpi.com/viruses/viruses-14-02717/article_deploy/html/images/viruses-14-02717-g001.png"
        },
        {
            title: "Foot-and-Mouth Disease Alert",
            description: "Ensure livestock hygiene to avoid infections.",
            img: "https://images.ctfassets.net/h6memckbrqf0/6aCh9YPaGRSAtymvaHOF8p/eb50e81c409173019e6560a6890fabf3/Traveller-Alert-Foot-and-Mouth-Disease-in-Bali.jpg?fit=fill&w=1200&q=60"
        }
    ];

    // Common diseases and preventive measures
    const diseases = [
        {
            name: "Mastitis",
            prevention: "Ensure clean and dry housing conditions, and practice proper milking techniques."
        },
        {
            name: "Foot Rot",
            prevention: "Maintain clean pastures and regularly inspect cattle hooves."
        },
        {
            name: "Bovine Respiratory Disease (BRD)",
            prevention: "Vaccinate and ensure proper ventilation in cattle housing."
        },
        {
            name: "Parasites",
            prevention: "Implement deworming programs and rotate grazing pastures."
        },
    ];

    return (
        <div style={backgroundStyle}>
        <Container className="mt-5">
            {/* Carousel Section */}
            <Row className="justify-content-center mb-5">
                <Col md={8}>
                    <Carousel>
                        {news.map((item, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={item.img}
                                    alt={item.title}
                                />
                                <Carousel.Caption>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>

            {/* Common Diseases and Prevention */}
            <Row>
                <Col>
                    <h2 className="text-center mb-4">Common Diseases and Their Prevention</h2>
                    {diseases.map((disease, index) => (
                        <Card className="mb-3" key={index}>
                            <Card.Body>
                                <Card.Title>{disease.name}</Card.Title>
                                <Card.Text>
                                    <strong>Prevention:</strong> {disease.prevention}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default PreventiveMeasure;
