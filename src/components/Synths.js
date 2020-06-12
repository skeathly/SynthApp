import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Card, Container, Button, Row, Col, Pagination } from 'react-bootstrap';
import useLocalstorage from "@rooks/use-localstorage";
import { IoIosArrowForward } from 'react-icons/io';
import SynthSpecficationBlock from './SynthSpecificationBlock';

const Synths = () => {
    const [masterRef, setMasterRef] = useLocalstorage("masterRef", null);
    let params = useParams();
    const history = useHistory();
    const [data, setData] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const baseRef = 'https://synth.prismic.io/api/v2/documents/search?ref=';
    const synthRef = encodeURI('[[at(document.type, "synth")]]');
    const searchOrder = encodeURI('[my.synth.manufacturer]');
    const pageSize = 6;
    const completeUrl = `${baseRef}${masterRef}&q=${synthRef}&orderings=${searchOrder}&pageSize=${pageSize}&page=${params.page}#format=json`;

    const handleCurrentPageUpdate = (event) => {
        let page = event.target.getAttribute('data-page-index');
        history.push({
            pathname: `/synths/${page}`
        });
    }

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === +params.page} onClick={(event) => handleCurrentPageUpdate(event)} data-page-index={number}>
                {number}
            </Pagination.Item>,
        );
    }

    useEffect(() => {
        if (masterRef === null) {
            fetch("https://synth.prismic.io/api")
                .then((res) => res.json())
                .then(res => setMasterRef(res.refs[0].ref))
                .catch((error) => console.log(error));
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            getSynthData();
        }, 50)
    }, [masterRef]);

    useEffect(() => {
        setTimeout(() => {
            getSynthData();
        }, 50)
    }, [params]);

    const getSynthData = () => {
        if (masterRef !== null) {
            fetch(completeUrl)
                .then((res) => res.json())
                .then(res => { setData(res.results); setTotalPages(res.total_pages) })
                .catch((error) => console.log(error));
        }
    }

    const handleDetailClick = (slugs, id) => {
        const slug = slugs[0];
        history.push({
            pathname: `/synth/${slug}`
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
                <Row>
                    <Col>
                        <Pagination size="sm">{items}</Pagination>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Synths;