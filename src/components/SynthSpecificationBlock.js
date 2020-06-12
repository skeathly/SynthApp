import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SynthSpecificationBlock = (props) => {
    const { polyphony, oscpervoice, soundenginegroup } = props.synth;
    return (
        <>
            <h3 style={{ fontSize: '18px' }}>Specs</h3>
            <dl className="specs">
                <dt>Sound Engine:</dt>
                <dd>
                    {soundenginegroup.length > 0 && soundenginegroup[0].soundengine}
                </dd>
                <dt>Polyphony:</dt>
                <dd>{polyphony === 1 ? "Monophonic" : polyphony}</dd>

                <dt>Osc Per Voice</dt>
                <dd>{oscpervoice}</dd>
            </dl>
        </>
    )
}

export default SynthSpecificationBlock;