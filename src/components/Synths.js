import React, { useState, useEffect } from 'react';
import Prismic from 'prismic-javascript';
import { useHistory, useParams } from "react-router-dom";
import { Card, Container, Button, Row, Col, Pagination } from 'react-bootstrap';
import { IoIosArrowForward } from 'react-icons/io';
import SynthSpecficationBlock from './SynthSpecificationBlock';

const Synths = () => {
    let params = useParams();
    const history = useHistory();
    const [totalPages, setTotalPages] = useState(null);
    const pageSize = 6;
    const [synths, setSynths] = useState(null);
    const apiEndpoint = 'https://synth.prismic.io/api/v2';
    const client = Prismic.client(apiEndpoint);

    useEffect(() => {
        const fetchData = async () => {
            const response = await client.query(
                [Prismic.Predicates.at('document.type', 'synth')],
                { pageSize: pageSize, page: params.page, orderings: '[my.synth.manufacturer, my.synth.name]' }
            )
            if (response) {
                if (params.page > response.total_pages) {
                    history.push({
                        pathname: '/synths/1'
                    });
                } else if (params.page <= response.total_pages) {
                    setTotalPages(response.total_pages);
                    setSynths(response.results);
                }
            }
        }
        fetchData()
    }, [params]);


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
                        synths && synths.map((item) => {
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