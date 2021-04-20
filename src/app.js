import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./main.js";
import React from "react";
import Welcome from "./welcome.js";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <BrowserRouter>
                <Route
                    exact
                    path="/:id"
                    render={(props) => (
                        <Main
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />
                <Route exact path="/" render={() => <Welcome />} />
            </BrowserRouter>
        );
    }
}
