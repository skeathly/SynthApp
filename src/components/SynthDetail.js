import React, { useState, useEffect } from 'react';
import Prismic from 'prismic-javascript';
import { IoIosArrowBack } from 'react-icons/io';
import { useHistory, useParams } from "react-router-dom";
import { Card, Container, Button, Row, Col } from 'react-bootstrap';
import SynthSpecificationBlockLong from './SynthSpecificationBlockLong';


const SynthDetail = (props) => {
    let { slug } = useParams();
    const history = useHistory();
    const [synth, setSynth] = useState(null);
    const apiEndpoint = 'https://synth.prismic.io/api/v2';
    const client = Prismic.client(apiEndpoint);

    useEffect(() => {
        client.query(
            [
                Prismic.Predicates.at('document.type', 'synth'),
                Prismic.Predicates.at('my.synth.uid', slug)
            ],
        ).then(response => {
            setSynth(response.results[0].data);
        })
    }, []);

    const handleReturnClick = () => {
        history.goBack();
    }

    return (
        <>
            <Container className="mt-2">
                <Row>
                    <Col>
                        <Button variant="secondary"
                            className="mb-3 mt-2"
                            size="sm"
                            onClick={handleReturnClick}>
                            <IoIosArrowBack /> Back
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card style={{ marginBottom: '20px' }}>
                            <Card.Body style={{ textAlign: 'center' }}>
                                {
                                    synth && <>
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <Card.Title>{synth.manufacturer} {synth.name}</Card.Title>
                                                <img src={synth.image.url} alt={synth.image.alt} className="img-fluid" />
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <SynthSpecificationBlockLong synth={synth} />
                                            </Col>
                                        </Row>
                                    </>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SynthDetail;