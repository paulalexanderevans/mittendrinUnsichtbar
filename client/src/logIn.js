//src/registration.js
import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class LogIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: false,
        };
    }

    handleChange(e) {
        console.log("logIn handleChange is firing");
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => {
                console.log("this.state: ", this.state);
            }
        );
    }

    handleClick(e) {
        e.preventDefault();
        console.log("handleClick fired");
        const ts = this.state;
        console.log("ts: ", ts);
        // fd.reset();
        axios
            .post("/login", ts)
            .then((res) => {
                console.log("response from server: ", res);
                if (this.error) {
                    //handle error - render error message for user
                    console.log("this.error = true");
                } else {
                    console.log("successful log in");
                    location.replace("/logo");
                }
            })
            .catch((err) => {
                console.log("error in login axios.post request: ", err);
            });
    }

    render() {
        return (
            <div>
                {this.state.error && (
                    <p>You done broke it...please try again</p>
                )}
                <h2>Log in to Netzung</h2>
                <form>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="text"
                        placeholder="Email"
                    />
                    <br />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="text"
                        placeholder="Password"
                    />
                    <br />
                    <button onClick={(e) => this.handleClick(e)}>Log In</button>
                </form>
                <br />
                <Link to="/resetPassword">Forgotten your password? Reset</Link>
            </div>
        );
    }
}
