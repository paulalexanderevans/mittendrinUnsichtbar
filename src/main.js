import { BrowserRouter, Route } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import React from "react";
import Book from "./book.js";
import About from "./about.js";
import Kontakt from "./kontakt.js";
const women = require("./women");

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        // this.toggleUploader = this.toggleUploader.bind(this);
        // this.setProfilePicUrl = this.setProfilePicUrl.bind(this);
        // this.setBio = this.setBio.bind(this);
        // Initialize App's state
        this.state = {
            counter: 0,
            menuOpen: false,
        };
    }

    async componentDidMount() {
        try {
            let id = this.props.match.params.id;
            console.log("id: ", id);
            this.hoverEnter(id);
            let thisWoman = women[id - 1];
            console.log("thisWoman: ", thisWoman);
            const setWoman = await this.setState(thisWoman);
            this.isFirstPhotoPortrait();
            this.showPurple();
        } catch (error) {
            console.log("error in componentDidMount: ", error);
        }
    }

    isFirstPhotoPortrait() {
        if (this.state.photos) {
            if (this.state.photos[this.state.counter].format === "p") {
                console.log("next photo is portrait");
                var galleryP = document.querySelector(".galleryP");
                galleryP.style.display = "flex";
                var galleryL = document.querySelector(".galleryL");
                galleryL.style.display = "none";
                var galleryImageP = document.querySelector(".galleryImageP");
                galleryImageP.src = this.state.photos[this.state.counter].url;
                this.setCaptions();
            }
        }
    }

    hoverEnter(id) {
        console.log("mouse hovering over id: ", id);
        // var sitat = document.getElementById(id);
        var letter = document.querySelector(`.l${id}`);
        letter.style.opacity = "100%";
        console.log("letter enter: ", letter);
    }

    hoverLeave(id) {
        if (id != this.props.match.params.id) {
            var letter = document.querySelector(`.l${id}`);
            letter.style.opacity = "20%";
        }
    }

    //right-left gallery nav

    rightHoverEnter(e) {
        console.log("mouse hovering over right");
        e.target.style.cursor = 'url("/right.png") 15 11, auto';
    }

    leftHoverEnter(e) {
        console.log("mouse hovering over left");
        e.target.style.cursor = 'url("/left.png") 50 50, auto';
    }

    clickLeft() {
        console.log("someone clicked left");
        if (this.state.counter > 0) {
            this.state.counter--;
        } else {
            this.state.counter = this.state.photos.length - 1;
        }
        if (this.state.photos[this.state.counter].format === "l") {
            //check if next photo is landscape or portrait
            console.log("next photo is landscape");
            var galleryP = document.querySelector(".galleryP");
            galleryP.style.display = "none";
            var galleryL = document.querySelector(".galleryL");
            galleryL.style.display = "initial";
            var galleryImageL = document.querySelector(".galleryImageL");
            galleryImageL.src = this.state.photos[this.state.counter].url;
            //set caption
            this.setCaptions();
        }
        if (this.state.photos[this.state.counter].format === "p") {
            console.log("next photo is portrait");
            var galleryP = document.querySelector(".galleryP");
            galleryP.style.display = "flex";
            var galleryL = document.querySelector(".galleryL");
            galleryL.style.display = "none";
            var galleryImageP = document.querySelector(".galleryImageP");
            galleryImageP.src = this.state.photos[this.state.counter].url;
            this.setCaptions();
        }
    }

    clickRight() {
        console.log("someone clicked right");
        if (this.state.counter === this.state.photos.length - 1) {
            this.state.counter = 0;
        } else {
            this.state.counter++;
        }

        //check if next photo is landscape or portrait
        if (this.state.photos[this.state.counter].format === "l") {
            console.log("next photo is landscape");
            var galleryP = document.querySelector(".galleryP");
            galleryP.style.display = "none";
            var galleryL = document.querySelector(".galleryL");
            galleryL.style.display = "initial";
            var galleryImageL = document.querySelector(".galleryImageL");
            galleryImageL.src = this.state.photos[this.state.counter].url;
            //set caption
            this.setCaptions();
        }
        if (this.state.photos[this.state.counter].format === "p") {
            console.log("next photo is portrait");
            var galleryP = document.querySelector(".galleryP");
            galleryP.style.display = "flex";
            var galleryL = document.querySelector(".galleryL");
            galleryL.style.display = "none";
            var galleryImageP = document.querySelector(".galleryImageP");
            galleryImageP.src = this.state.photos[this.state.counter].url;
            this.setCaptions();
        }
    }

    hideInfo() {
        console.log("hide info");
        document.querySelector(".infoOverlay").style.display = "initial";
    }

    showInfo() {
        console.log("show info");
        console.log("this.state: ", this.state);
        document.querySelector(".infoOverlay").style.display = "none";
    }

    hideGallery() {
        console.log("hide gallery");
        const mediaQuery = window.matchMedia("(max-width: 812px)");
        if (!mediaQuery.matches) {
            document.querySelector(".galleryNav").style.opacity = "95%";
        }
    }

    showGallery() {
        console.log("show gallery");

        document.querySelector(".galleryNav").style.opacity = "0";
    }

    setCaptions() {
        console.log(
            "this.state.photos[this.state.counter].captionBold: ",
            this.state.photos[this.state.counter].captionBold
        );
        var captionBold = {
            captionBold: this.state.photos[this.state.counter].captionBold,
        };
        this.setState(captionBold);
        var captionItalic = {
            captionItalic: this.state.photos[this.state.counter].captionItalic,
        };
        this.setState(captionItalic);
    }

    menuClick() {
        console.log("someone clicked on the hamburger");
        const menuButton = document.querySelector(".menuButtonWelcome");
        const menu = document.querySelector(".menuWelcome");
        console.log("menu: ", menu);
        if (!this.state.menuOpen) {
            console.log("menu is closed");
            menuButton.classList.add("open");
            this.state.menuOpen = true;
            menu.style.right = "0px";
        } else {
            console.log("menu is open");
            menuButton.classList.remove("open");
            this.state.menuOpen = false;
            menu.style.right = "-50%";
            this.showPurple();
        }
        // this.hideLogo();
        const about = document.querySelector(".about");
        about.style.right = "-100%";
        const kontakt = document.querySelector(".kontakt");
        kontakt.style.right = "-100%";
        const book = document.querySelector(".book");
        book.style.right = "-100%";
        const bookGallery = (document.querySelector(
            ".bookGallery"
        ).style.right = "-100%");
        const interview = document.querySelector(".interview");
        interview.style.right = "-100%";
        const highlightedLetter = document.getElementById(`${this.state.id}`);
        console.log("highlightedLetter: ", highlightedLetter);
        highlightedLetter.style.color = "#410078";
        const info = document.querySelector(".info");
        info.style.zIndex = "5";
        const stats = document.querySelector(".stats");
        stats.style.color = "#36005f";
    }

    showAbout() {
        console.log("someone clicked on About");
        const about = document.querySelector(".about");
        about.style.right = "0px";
        this.showWhite();
    }

    showKontakt() {
        console.log("someone clicked on Kontakt");
        const kontakt = document.querySelector(".kontakt");
        kontakt.style.right = "0px";
        this.showWhite();
    }

    showBook() {
        console.log("someone clicked on Book");
        const book = document.querySelector(".book");
        book.style.right = "0px";
        const bookGallery = document.querySelector(".bookGallery");
        bookGallery.style.right = "0px";

        this.showWhite();
    }

    showInterview() {
        console.log("someone clicked on Interview");
        const menuButton = document.querySelector(".menuButtonWelcome");
        const menu = document.querySelector(".menuWelcome");
        console.log("menu: ", menu);
        console.log("menuButton: ", menuButton);
        if (!this.state.menuOpen) {
            console.log("menu is closed");
            menuButton.classList.add("open");
            this.state.menuOpen = true;
            menu.style.right = "0px";
        }
        const interview = document.querySelector(".interview");
        interview.style.right = "0px";
        const highlightedLetter = document.getElementById(`${this.state.id}`);
        highlightedLetter.style.color = "white";
        const info = document.querySelector(".info");
        const mediaQuery = window.matchMedia("(max-width: 812px)");
        if (!mediaQuery.matches) {
            info.style.zIndex = "50";
        }

        const stats = document.querySelector(".stats");
        stats.style.color = "white";
        this.showWhite();
    }

    showWhite() {
        const purple = document.querySelector(".purple");
        purple.style.opacity = "0%";
        const white = document.querySelector(".white");
        white.style.opacity = "100%";
    }

    showPurple() {
        const purple = document.querySelector(".purple");
        purple.style.opacity = "100%";
        const white = document.querySelector(".white");
        white.style.opacity = "0%";
    }

    menuHover(e) {
        console.log("e.target: ", e.target);
        e.target.style.color = "white";
    }

    menuLeave(e) {
        console.log("e.target: ", e.target);
        e.target.style.color = "#DBD9E0";
    }

    render() {
        return (
            <div className="app">
                <div className="menuWelcome">
                    <h1
                        className="menu"
                        onMouseEnter={(e) => this.menuHover(e)}
                        onMouseLeave={(e) => this.menuLeave(e)}
                        onClick={() => this.showAbout()}
                    >
                        About
                    </h1>
                    <br></br>
                    <br></br>
                    <a href="https://www.instagram.com/mittendrin_unsichtbar/">
                        <h1
                            onMouseEnter={(e) => this.menuHover(e)}
                            onMouseLeave={(e) => this.menuLeave(e)}
                            className="menu"
                        >
                            Instagram
                        </h1>
                    </a>
                    <br></br>
                    <br></br>
                    <h1
                        onMouseEnter={(e) => this.menuHover(e)}
                        onMouseLeave={(e) => this.menuLeave(e)}
                        className="menu"
                        onClick={() => this.showBook()}
                    >
                        Buch
                    </h1>
                    <br></br>
                    <br></br>
                    <h1
                        onMouseEnter={(e) => this.menuHover(e)}
                        onMouseLeave={(e) => this.menuLeave(e)}
                        className="menu"
                        onClick={() => this.showKontakt()}
                    >
                        Kontakt
                    </h1>
                </div>
                {this.state.photos && (
                    <div className="mainContainer">
                        <Book></Book>
                        <About></About>
                        <Kontakt></Kontakt>

                        <div className="interview">
                            {this.state.interview && (
                                <div className="interviewTxt">
                                    {this.state.interviewTxt.map((letter) => (
                                        <div>
                                            <h1>{letter.question}</h1>
                                            <br />
                                            <div className="answer">
                                                <h2>{letter.answer}</h2>
                                                <br></br>
                                                <br></br>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="gallery">
                            <div
                                className="galleryNav"
                                onMouseEnter={() => this.showGallery()}
                                onMouseLeave={() => this.hideGallery()}
                            >
                                <div
                                    className="left"
                                    onClick={() => this.clickLeft()}
                                    onMouseEnter={(e) => this.leftHoverEnter(e)}
                                    // onMouseLeave={(e) => this.leftHoverLeave(e)}
                                ></div>
                                <div
                                    className="right"
                                    onClick={() => this.clickRight()}
                                    onMouseEnter={(e) =>
                                        this.rightHoverEnter(e)
                                    }
                                    // onMouseLeave={(e) => this.rightHoverLeave(e)}
                                ></div>
                            </div>

                            <div className="galleryL">
                                {this.state.photos && (
                                    <div className="galleryLMob">
                                        <img
                                            src={
                                                this.state.photos[
                                                    this.state.counter
                                                ].url
                                            }
                                            alt="purple box"
                                            className="galleryImageL"
                                        />
                                        <img
                                            src="/right.png"
                                            alt="right arrow"
                                            className="arrowRight"
                                        />
                                        <img
                                            src="/left.png"
                                            alt="left arrow"
                                            className="arrowLeft"
                                        />
                                    </div>
                                )}
                                {this.state.photos && (
                                    <div className="captionLContainer">
                                        <div className="captionLText">
                                            {this.state.photos[
                                                this.state.counter
                                            ].captionItalic && (
                                                <h6>
                                                    {
                                                        this.state.photos[
                                                            this.state.counter
                                                        ].captionItalic
                                                    }
                                                    &nbsp;
                                                </h6>
                                            )}
                                            {this.state.photos[
                                                this.state.counter
                                            ].captionBold && (
                                                <p>
                                                    {
                                                        this.state.photos[
                                                            this.state.counter
                                                        ].captionBold
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="galleryP">
                                {this.state.photos && (
                                    <div className="galleryPMob">
                                        <img
                                            src="./default"
                                            alt="purple box"
                                            className="galleryImageP"
                                        />
                                        <img
                                            src="/right.png"
                                            alt="right arrow"
                                            className="arrowRight"
                                        />
                                        <img
                                            src="/left.png"
                                            alt="left arrow"
                                            className="arrowLeft"
                                        />
                                    </div>
                                )}
                                {this.state.photos && (
                                    <div className="captionP">
                                        {this.state.photos[this.state.counter]
                                            .captionItalic && (
                                            <h6>
                                                {
                                                    this.state.photos[
                                                        this.state.counter
                                                    ].captionItalic
                                                }
                                                &nbsp;
                                            </h6>
                                        )}
                                        {this.state.photos[this.state.counter]
                                            .captionBold && (
                                            <p>{this.state.captionBold}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div
                                className="infoOverlay"
                                onMouseEnter={() => this.showInfo()}
                            ></div>
                            <div
                                id="info"
                                className="info"
                                onMouseLeave={() => this.hideInfo()}
                            >
                                {" "}
                                <div className="infoTxt">
                                    <div className="stats">
                                        {this.state.age && (
                                            <h5>{this.state.age} |&nbsp;</h5>
                                        )}
                                        <h5>{this.state.wohnungslos}</h5>
                                    </div>
                                    {this.state.kurzbio && (
                                        <p>
                                            <br></br>
                                            {this.state.kurzbio}
                                        </p>
                                    )}

                                    {this.state.interview && (
                                        <h5
                                            onClick={() => this.showInterview()}
                                        >
                                            <br></br>
                                            <br></br>INTERVIEW →
                                        </h5>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="counter">
                            <h5>
                                {this.state.counter + 1}&nbsp;|&nbsp;
                                {this.state.photos.length}
                            </h5>
                        </div>
                    </div>
                )}

                <div className="headerMain">
                    <Link to="/">
                        <img
                            src="/logoLila.png"
                            alt="Mittendrin Unsichtbar Logo purple"
                            className="fixedLogo purple"
                        />
                    </Link>
                    <Link to="/">
                        <img
                            src="/logoWeiß.png"
                            alt="Mittendrin Unsichtbar Logo white"
                            className="fixedLogo white"
                        />
                    </Link>
                    <div className="headerLetters">
                        {women.map((letter) => (
                            <Link
                                onMouseEnter={() => this.hoverEnter(letter.id)}
                                onMouseLeave={() => this.hoverLeave(letter.id)}
                                key={`l${letter.id}`}
                                id={letter.id}
                                className={`mainLetter l${letter.id}`}
                                to={`/${letter.id}`}
                            >
                                <h5>{letter.letter}</h5>
                            </Link>
                        ))}
                    </div>
                    <div
                        className="menuButtonWelcome"
                        onClick={() => this.menuClick()}
                    >
                        <div className="menuBurgerMain1"></div>
                        <div className="menuBurgerMain2"></div>
                    </div>
                </div>
                <div className="headerMainBackground"></div>
            </div>
        );
    }
}
