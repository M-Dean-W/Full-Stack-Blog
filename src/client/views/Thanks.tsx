import React from "react";
import { Container, Card } from "react-bootstrap";

interface ThanksProps { }

const Thanks = (props: ThanksProps) => {
    return (
        <Container>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Thank you for saving Bones</Card.Title>
                    <Card.Text>
                        With your generous donation Bones can eat all the good treatos he wants!
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Thanks