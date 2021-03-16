import { Component } from "react";
import Logo from "./logo.js";
import ProfilePic from "./profile_pic.js";
import Uploader from "./uploader.js";
import Search from "./citySearch.js";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherProfile.js";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
        // this.toggleUploader = this.toggleUploader.bind(this);
        // this.setProfilePicUrl = this.setProfilePicUrl.bind(this);
        // this.setBio = this.setBio.bind(this);
        // Initialize App's state
        this.state = {};

        // TODO: Bind methods if needed
    }

    componentDidMount() {}

    render() {
        // if user is not logged in or database requests haven't been received
        // if (!this.state.id) {
        //     // return null;
        //     return (
        //         <div className="spinner_container">
        //             <img className="spinner" src="netzungSpinner.jpg"></img>
        //         </div>
        //     );
        // }
        return (
            <BrowserRouter>
                <div className={"app"}>
                    <div className="header">
                        <img
                            src="header.png"
                            alt="CyclingKit header"
                            className="headerImage"
                        />
                    </div>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Search
                                // Passing down props:
                                first={this.state.first}
                                last={this.state.last}
                                profilePicUrl={this.state.profilepicurl}
                                size="medium"
                                bio={this.state.bio}
                                // Passing down methods as standard functions (binding needed):
                                toggleUploader={this.toggleUploader}
                                setBio={this.setBio}
                            />
                        )}
                    />
                </div>
            </BrowserRouter>
        );
    }
}
