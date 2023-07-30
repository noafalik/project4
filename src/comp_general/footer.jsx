import React from 'react';
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <Row className="d-flex justify-content-between text-center">
                    <Col className='Noa'>
                    <br/>
                        <h3>Noa Falik</h3>
                        <div className="d-flex justify-content-center align-items-center ">
                            <a className='m-2' href="https://www.linkedin.com/in/noa-falik-607389266/" target="_blank" style={{ fontSize:'1.5rem'}}>
                                <BsLinkedin />
                            </a>
                            <a className='m-2' href="https://github.com/noafalik" target="_blank" style={{ fontSize:'1.5rem'}}>
                                <BsGithub />
                            </a>
                        </div>
                    </Col>

                    <Col className="footer__addr ">
                        <h1 className="footer__logo">ReloMatch</h1>
                        <address className='d-flex justify-content-center align-items-center'>
                            <a className="footer__btn" href="mailto:reloMatch@gmail.com">Email Us</a>
                        </address>
                    </Col>

                    <Col className='Dora'>
                    <br/>
                        <h3>Dora Yaroshenko</h3>
                        <div className="d-flex justify-content-center align-items-center">
                            <a className='m-2' href="https://www.linkedin.com/in/dora-yaroshenko-27544226a/" target="_blank" style={{ fontSize:'1.5rem'}}>
                                <BsLinkedin />
                            </a>
                            <a className='m-2' href="https://github.com/DoraYaroshenko" target="_blank" style={{ fontSize:'1.5rem'}}>
                                <BsGithub />
                            </a>
                        </div>
                    </Col>
                </Row>

                <div class="legal d-flex justify-content-center align-items-center">
                    <p>&copy; 2023 ReloMatch - Noa Falik & Dora Yaroshenko. All rights reserved.</p>
                </div>

            </footer>
        </>
    )
}

export default Footer