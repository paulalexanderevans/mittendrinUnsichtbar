import { BrowserRouter, Route } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import React from "react";
const reproPhotos = [
    "/repro/1.jpg",
    "/repro/2.jpg",
    "/repro/3.jpg",
    "/repro/4.jpg",
    "/repro/5.jpg",
    "/repro/6.jpg",
    "/repro/7.jpg",
    "/repro/8.jpg",
    "/repro/9.jpg",
    "/repro/10.jpg",
    "/repro/11.jpg",
    "/repro/12.jpg",
];

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
        };
    }

    async componentDidMount() {}

    //right-left gallery nav

    rightHoverEnter(e) {
        console.log("mouse hovering over right");
        e.target.style.cursor = 'url("/right.png") 50 50, auto';
    }

    leftHoverEnter(e) {
        console.log("mouse hovering over left");
        e.target.style.cursor = 'url("/left.png") 50 50, auto';
    }

    clickLeft() {
        if (this.state.counter > 0) {
            this.state.counter--;
        } else {
            this.state.counter = reproPhotos.length - 1;
        }
        var bookGalleryImage = document.querySelector(".bookGalleryImage");
        bookGalleryImage.src = reproPhotos[this.state.counter];
    }

    clickRight() {
        if (this.state.counter === reproPhotos.length - 1) {
            this.state.counter = 0;
        } else {
            this.state.counter++;
        }
        var bookGalleryImage = document.querySelector(".bookGalleryImage");
        bookGalleryImage.src = reproPhotos[this.state.counter];
    }

    render() {
        return (
            <div className="book">
                <div className="bookGallery">
                    <img
                        src="/repro/1.jpg"
                        alt="Book photo 1"
                        className="bookGalleryImage"
                    />
                </div>
                <div className="bookNav">
                    <div
                        className="left"
                        onClick={() => this.clickLeft()}
                        onMouseEnter={(e) => this.leftHoverEnter(e)}
                    ></div>
                    <div
                        className="right"
                        onClick={() => this.clickRight()}
                        onMouseEnter={(e) => this.rightHoverEnter(e)}
                    ></div>
                </div>
                {/* <img
                    src="/right.png"
                    alt="right arrow"
                    className="arrowRight"
                />
                <img src="/left.png" alt="left arrow" className="arrowLeft" /> */}
            </div>
        );
    }
}
