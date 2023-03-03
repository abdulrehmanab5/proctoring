import React from "react";
import Carousel from 'react-bootstrap/Carousel';

function Carousels() {
    return (
        <Carousel>
            <Carousel.Item interval={1000} >
                <img
                    className="d-block w-100"
                    src="images/bg1.png"
                    alt="First slide"
                    height={550}
                />
             
            </Carousel.Item>

            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src="images/bg1.png"
                    alt="Second slide"
                    height={550}
                />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src="images/bg1.png"
                    alt="Third slide"
                    height={550}
                />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src="images/bg1.png"
                    alt="Third slide"
                    height={550}
                />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src="images/bg1.png"
                    alt="Third slide"
                    height={550}
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Carousels;