//src/welcome.js
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Book from "./book.js";
import About from "./about.js";
import Kontakt from "./kontakt.js";
const women = require("./women");

export default function Welcome() {
    useEffect(() => {
        console.log("women: ", women);
    }, []);

    const hoverEnter = async (id) => {
        console.log("mouse hovering over id: ", id);
        // var sitat = document.getElementById(id);
        var letter = document.querySelector(`.l${id}`);
        var sitat = document.querySelector(`.s${id}`);

        letter.style.color = "white";
        sitat.style.color = "white";
        letter.style.opacity = "100%";
        sitat.style.opacity = "100%";

        console.log("letter enter: ", letter);
        console.log("sitat enter: ", sitat);
        var teaser = document.querySelector(".teaser");
        teaser.src = women[id - 1].photos[0].url;
        var randomX = `${Math.floor(Math.random() * (65 + 1))}%`;
        var randomY = `${Math.floor(Math.random() * (35 + 1))}%`;
        console.log("x, y: ", randomX, randomY);
        teaser.style.opacity = "40%";
        teaser.style.top = randomY;
        teaser.style.left = randomX;
    };

    const hoverLeave = async (id) => {
        console.log("mouse leaving id: ", id);
        var letter = document.querySelector(`.l${id}`);
        var sitat = document.querySelector(`.s${id}`);
        letter.style.color = "#370058";
        sitat.style.color = "#370058";
        console.log("letter leave: ", letter);
        console.log("sitat leave: ", sitat);
        sitat.style.opacity = "0%";
    };

    //menu
    let menuOpen = false;

    const menuClick = async () => {
        console.log("someone clicked on the hamburger");
        const menuButton = document.querySelector(".menuButtonWelcome");
        const menu = document.querySelector(".menuWelcome");
        console.log("menu: ", menu);
        if (!menuOpen) {
            console.log("menu is closed");
            menuButton.classList.add("open");
            menuOpen = true;
            menu.style.right = "0px";
        } else {
            console.log("menu is open");
            menuButton.classList.remove("open");
            menuOpen = false;
            menu.style.right = "-50%";
        }
        const about = document.querySelector(".about");
        about.style.right = "-100%";
        const kontakt = document.querySelector(".kontakt");
        kontakt.style.right = "-100%";
        const book = document.querySelector(".book");
        book.style.right = "-100%";
        const bookGallery = document.querySelector(".bookGallery");
        bookGallery.style.right = "-100%";
    };

    const showAbout = () => {
        console.log("someone clicked on About");
        const about = document.querySelector(".about");
        about.style.right = "0px";
    };

    const showKontakt = () => {
        console.log("someone clicked on Kontakt");
        const kontakt = document.querySelector(".kontakt");
        kontakt.style.right = "0px";
    };

    const showBook = () => {
        console.log("someone clicked on Book");
        const book = document.querySelector(".book");
        book.style.right = "0px";
        const bookGallery = document.querySelector(".bookGallery");
        bookGallery.style.right = "0px";
    };

    const menuHover = (e) => {
        console.log("e.target: ", e.target);
        e.target.style.color = "white";
    };

    const menuLeave = (e) => {
        console.log("e.target: ", e.target);
        e.target.style.color = "#DBD9E0";
    };

    return (
        <div className="welcome">
            <div className="headerWelcome">
                <Link to="/">
                    <img
                        src="/logoWeiß.png"
                        alt="Mittendrin Unsichtbar Logo white"
                        className="fixedLogo"
                    />
                </Link>

                <div className="menuButtonWelcome" onClick={() => menuClick()}>
                    <div className="menuBurgerWelcome1"></div>
                    <div className="menuBurgerWelcome2"></div>
                </div>
                <div className="headerLetters">
                    {women.map((letter) => (
                        <Link
                            onMouseEnter={() => hoverEnter(letter.id)}
                            onMouseLeave={() => hoverLeave(letter.id)}
                            key={`l${letter.id}`}
                            id={letter.id}
                            className={`letter l${letter.id}`}
                            to={`/${letter.id}`}
                        >
                            <h5>{letter.letter}</h5>
                        </Link>
                    ))}
                </div>
            </div>

            <Book></Book>
            <About></About>
            <Kontakt></Kontakt>
            <div className="menuWelcome">
                <h1
                    onMouseEnter={(e) => menuHover(e)}
                    onMouseLeave={(e) => menuLeave(e)}
                    className="menu"
                    onClick={() => showAbout()}
                >
                    About
                </h1>
                <br></br>
                <br></br>
                <a href="https://www.instagram.com/mittendrin_unsichtbar/">
                    <h1
                        onMouseEnter={(e) => menuHover(e)}
                        onMouseLeave={(e) => menuLeave(e)}
                        className="menu"
                    >
                        Instagram
                    </h1>
                </a>
                <br></br>
                <br></br>
                <h1
                    onMouseEnter={(e) => menuHover(e)}
                    onMouseLeave={(e) => menuLeave(e)}
                    className="menu"
                    onClick={() => showBook()}
                >
                    Buch
                </h1>
                <br></br>
                <br></br>
                <h1
                    onMouseEnter={(e) => menuHover(e)}
                    onMouseLeave={(e) => menuLeave(e)}
                    className="menu"
                    onClick={() => showKontakt()}
                >
                    Kontakt
                </h1>
            </div>
            <div className="mainWelcome shadow">
                <img src="" alt="Teaser Image" className="teaser" />
                {women.map((letter) => (
                    <div
                        className={`sitaten d${letter.id}`}
                        onMouseEnter={() => hoverEnter(letter.id)}
                        onMouseLeave={() => hoverLeave(letter.id)}
                        key={letter.id}
                        id={letter.id}
                    >
                        <Link to={`/${letter.id}`}>
                            <h3>{letter.bold}&nbsp;</h3>
                            <h4> {letter.italic}&nbsp;</h4>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mainWelcome light">
                {women.map((letter) => (
                    <div
                        className={`sitaten s${letter.id}`}
                        onMouseEnter={() => hoverEnter(letter.id)}
                        onMouseLeave={() => hoverLeave(letter.id)}
                        key={letter.id}
                        id={letter.id}
                    >
                        <Link to={`/${letter.id}`}>
                            <h3>{letter.bold}&nbsp;</h3>
                            <h4> {letter.italic}&nbsp;</h4>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
