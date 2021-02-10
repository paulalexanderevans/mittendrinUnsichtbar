//src/resetPassword.js
import React from "react";
import axios from "./axios";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderView: 1,
        };
    }

    handleChange(e) {
        console.log("handleChange is firing");
        console.log("handleChange e.target.value: ", e.target.value);
        console.log("handleChange e.target.name: ", e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => {
                console.log("this.state: ", this.state);
            }
        );
    }

    handleClickRV1(e) {
        e.preventDefault();
        console.log("handleClickRV1 fired");
        const ts = this.state;
        console.log("ts: ", ts);
        // fd.reset();
        axios
            .post("/resetpassword/start", ts)
            .then((res) => {
                console.log("response from server: ", res);
                if (this.error) {
                    //handle error - render error message for user
                    console.log("this.error = true");
                } else {
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log("error in registration axios.post request: ", err);
            });
    }

    determineWhichViewToRender() {
        console.log("renderView: ", this.state.renderView);
        if (this.state.renderView === 1) {
            return (
                <div>
                    <h3>
                        Enter your email address and press send to receive a
                        verication code and reset your password
                    </h3>
                    <input
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                        type="text"
                        placeholder="email"
                    ></input>
                    <br />
                    <button onClick={(e) => this.handleClickRV1(e)}>
                        Send
                    </button>
                </div>
            );
        } else if (this.state.renderView === 2) {
            return (
                <div>
                    <input
                        name="code"
                        onChange={(e) => this.handleChange(e)}
                        type="text"
                        placeholder="code"
                    ></input>
                    <input
                        name="password"
                        onChange={(e) => this.handleChange(e)}
                        type="text"
                        placeholder="New password"
                    ></input>
                    <button onClick={(e) => this.handleClick(e)}>
                        Set new password
                    </button>
                </div>
            );
        } else if (this.state.renderView === 3) {
            return (
                <div>
                    <h1>Great Success</h1>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Reset your Netzung password</h2>
                {this.state.error && <p>error</p>}
                {this.determineWhichViewToRender()}
            </div>
        );
    }
}
