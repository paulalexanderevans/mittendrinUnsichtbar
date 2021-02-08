//src/registration.js
import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
            error: false,
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

    handleClick(e) {
        e.preventDefault();
        console.log("handleClick fired");
        // const fd = new FormData();
        // fd.append("first", this.state.first);
        // console.log("this.state.first: ", this.state.first);
        // fd.append("last", this.state.last);
        // fd.append("email", this.state.email);
        // fd.append("password", this.state.password);
        // console.log("fd: ", fd);
        const ts = this.state;
        console.log("ts: ", ts);
        // fd.reset();
        axios.post("/registration", ts);
        // .then((res) => {
        //     console.log("server response: ", res);

        //     if (error) {
        //         //handle error - render error message for user
        //     } else {
        //         location.replace("/");
        //     }
        // })
        // .catch((err) => {
        //     console.log("error in registration POST request: ", err);
        // });
    }

    render() {
        return (
            <div>
                {this.state.error && (
                    <p>You done broke it...please try again</p>
                )}
                <form>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="first"
                        type="text"
                        placeholder="Name"
                    />
                    <br />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="last"
                        type="text"
                        placeholder="Surname"
                    />
                    <br />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="text"
                        placeholder="eMail"
                    />
                    <br />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="text"
                        placeholder="Password"
                    />
                    <br />
                    <button onClick={(e) => this.handleClick(e)}>
                        Register
                    </button>
                </form>
                <br />
                <p>
                    Already a member? <a href="url">Log In</a>
                </p>
            </div>
        );
    }
}
