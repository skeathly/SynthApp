import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const SynthSpecificationBlockLong = (props) => {
    const { manufacturer, polyphony, oscpervoice, keyboard, arpeggiator, sequencer, soundenginegroup, waveformgroup, filtersgroup, effectsgroup } = props.synth;
    return (
        <>
            <h3 style={{ fontSize: '18px' }}>Specs</h3>
            <dl className="specs">
                <dt>Manufacturer:</dt>
                <dd>{manufacturer}</dd>

                <dt>Sound Engine:</dt>
                <dd>
                    {
                        soundenginegroup.map((engine, i) => {
                            return (
                                <span key={i}>{(i ? ', ' : '') + engine.soundengine}</span>
                            )
                        })
                    }
                </dd>

                <dt>Polyphony:</dt>
                <dd>{polyphony === 1 ? <span>Monophonic</span> : polyphony}</dd>

                <dt>Keyboard:</dt>
                <dd>{keyboard < 1 ? <span>None</span> : <span>{keyboard} keys</span>}</dd>

                <dt>Arpeggiator:</dt>
                <dd>{arpeggiator ? <span style={{ color: 'green' }}><IoIosCheckmarkCircle size={18} /></span> : <span>None</span>}</dd>

                <dt>Sequencer:</dt>
                <dd>{sequencer ? <span style={{ color: 'green' }}><IoIosCheckmarkCircle size={18} /></span> : <span>None</span>}</dd>

                <dt>Waveforms:</dt>
                <dd>
                    {
                        waveformgroup.map((wave, i) => {
                            return (
                                <span key={i}>{(i ? ', ' : '') + wave.waveform}</span>
                            )
                        })
                    }
                </dd>

                <dt>Filters</dt>
                <dd>
                    {filtersgroup[0].filter === null && <span>None</span>}
                    {
                        filtersgroup[0].filter !== null && filtersgroup.map((filter, i) => {
                            return (
                                <span key={i}>{(i ? ', ' : '') + filter.filter}</span>
                            )
                        })
                    }
                </dd>

                <dt>Effects:</dt>
                <dd>
                    {effectsgroup[0].effect === null && <span>None</span>}
                    {
                        effectsgroup[0].effect !== null && effectsgroup.map((effect, i) => {
                            return (
                                <span key={i}>{(i ? ', ' : '') + effect.effect}</span>
                            )
                        })
                    }
                </dd>
            </dl>
        </>
    )
}

export default SynthSpecificationBlockLong;