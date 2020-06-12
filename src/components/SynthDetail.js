import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import {
    useHistory,
    useParams
} from "react-router-dom";
import { Card, Container, Button, Row, Col } from 'react-bootstrap';
import SynthSpecificationBlockLong from './SynthSpecificationBlockLong';

const SynthDetail = (props) => {
    const [masterRef, setMasterRef] = useState(null);
    let { slug } = useParams();
    const history = useHistory();
    const baseRef = 'https://synth.prismic.io/api/v2/documents/search?ref=';
    const [synth, setSynth] = useState(null);

    useEffect(() => {
        fetch("https://synth.prismic.io/api")
            .then((res) => res.json())
            .then(res => setMasterRef(res.refs[0].ref))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        setTimeout(() => {
            getSynthData();
        }, 100)
    }, [masterRef]);

    const getSynthData = () => {
        if (masterRef) {
            fetch(`${baseRef}${masterRef}&q=%5B%5Bat(my.synth.uid%2C+"${slug}")%5D%5D#format=json`)
                .then((res) => res.json())
                .then(res => setSynth(res.results[0].data))
        }
    }

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
                                            <Col>
                                                <Card.Title>{synth.manufacturer} {synth.name}</Card.Title>
                                                <img src={synth.image.url} alt={synth.image.alt} className="img-fluid" />
                                            </Col>
                                            <Col>
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