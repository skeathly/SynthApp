import React, { useState, useEffect } from 'react';
import Prismic from 'prismic-javascript';
import { Container, Row, Col } from 'react-bootstrap';

const Manufacturers = () => {
    const [manufacturer, setManufacturer] = useState(null);
    const apiEndpoint = 'https://synth.prismic.io/api/v2'
    const client = Prismic.client(apiEndpoint)

    useEffect(() => {
        client.query(
            [Prismic.Predicates.at('document.type', 'manufacturer')],
            { orderings: '[my.manufacturer.name]' }
        ).then(response => {
            setManufacturer(response.results);
        })
    }, []);

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