import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Manufacturers = () => {
    const baseRef = 'https://synth.prismic.io/api/v2/documents/search?ref=';
    const [manufacturer, setManufacturer] = useState(null);
    const [masterRef, setMasterRef] = useState(null);

    useEffect(() => {
        fetch("https://synth.prismic.io/api")
            .then((res) => res.json())
            .then(res => setMasterRef(res.refs[0].ref))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        setTimeout(() => {
            getManufacturers();
        }, 100)
    }, [masterRef]);

    const getManufacturers = () => {
        if (masterRef) {
            fetch(`${baseRef}${masterRef}&q=%5B%5Bat(document.type%2C+"manufacturer")%5D%5D&orderings=%5Bmy.manufacturer.name%5D#format=json`)
                .then((res) => res.json())
                .then(res => setManufacturer(res.results))
        }
    }

    return (
        <>
            <Container className="mt-2">
                <Row>
                    <Col>
                        <h2>Manufacturers</h2>
                        <ul className="list-unstyled">
                            {
                                manufacturer && manufacturer.map((item, i) => {
                                    const { name, website } = item.data;
                                    return (
                                        <li key={i}>
                                            <a href={website.url} target="_blank" rel="noopener noreferrer">{name}</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Manufacturers;