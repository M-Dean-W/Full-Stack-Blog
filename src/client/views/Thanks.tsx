import React from "react";
import { Container, Card } from "react-bootstrap";



interface ThanksProps { }

const Thanks = (props: ThanksProps) => {
    return (
        <Container>
            <Card className=" bg-primary rounded-3 m-3" style={{ width: '25em' }}>
                <Card.Img variant="top" src="/images/Bones_curious.jpg" />
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