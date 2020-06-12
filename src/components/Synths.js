import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Container, Button, Row, Col, Pagination } from 'react-bootstrap';
import { IoIosArrowForward } from 'react-icons/io';
import SynthSpecficationBlock from './SynthSpecificationBlock'

const Synths = () => {
    const [masterRef, setMasterRef] = useState(null);
    const [data, setData] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const baseRef = 'https://synth.prismic.io/api/v2/documents/search?ref=';
    const synthRef = encodeURI('[[at(document.type, "synth")]]');
    const searchOrder = encodeURI('[my.synth.manufacturer]');
    const pageSize = 6;
    const completeUrl = `${baseRef}${masterRef}&q=${synthRef}&orderings=${searchOrder}&pageSize=${pageSize}&page=${currentPage}#format=json`;
    const history = useHistory();

    let items = [];

    useEffect(() => {
        fetch("https://synth.prismic.io/api")
            .then((res) => res.json())
            .then(res => setMasterRef(res.refs[0].ref))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        setTimeout(() => {
            getSynthData();
        }, 50)
    }, [masterRef]);

    useEffect(() => {
        setTimeout(() => {
            console.log(totalPages)
            // setPaginationDetail();
        }, 50)
    }, [totalPages]);

    const getSynthData = () => {
        if (masterRef) {
            fetch(completeUrl)
                .then((res) => res.json())
                .then(res => { setData(res.results); setTotalPages(res.total_pages) })
                .catch((error) => console.log(error));
        }
    }

    const handleDetailClick = (slugs, id) => {
        const slug = slugs[0];
        history.push({
            pathname: `/synths/${slug}`
        });
    }

    return (
        <>
            <Container className="mt-2">
                <h2>Synths</h2>
                <Row>
                    {
                        data && data.map((item) => {
                            const { id, slugs, data } = item;
                            return (
                                <Col key={id} lg={6}>
                                    <Card style={{ marginBottom: '20px' }}>
                                        <Card.Body>
                                            <Card.Title>{data.manufacturer} {data.name}</Card.Title>
                                            <Row>
                                                <Col>
                                                    <img src={data.image.url} className="img-fluid" alt="synth" />
                                                </Col>
                                                <Col>
                                                    <SynthSpecficationBlock synth={data} />
                                                    <hr />
                                                    <Button type="button"
                                                        variant="secondary"
                                                        size="sm"
                                                        className="float-right"
                                                        onClick={() => handleDetailClick(slugs, id)}
                                                        aria-label={`Find out more about the ${data.name}`}>More <IoIosArrowForward /></Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }

                </Row>
            </Container>
        </>
    )
}

export default Synths;