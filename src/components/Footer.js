import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer role="contentinfo" className="footer" style={{ textAlign: 'center' }}>
            Synth Nation | Copyright © {currentYear}
        </footer>
    )
}

export default Footer;