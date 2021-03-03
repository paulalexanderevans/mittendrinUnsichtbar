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
                    {/* <div className="header">
                        <Logo />
                        <Link to="/users" className="findPeopleLink">
                            Find People
                        </Link>
                        <Link to="/chat" className="findPeopleLink">
                            Chat
                        </Link>
                        <Link to="/friends" className="findPeopleLink">
                            Friends
                        </Link>
                        <Link to="/" className="findPeopleLink">
                            Profile
                        </Link>
                        <a href="/logOut" className="findPeopleLink">
                            Log-out
                        </a>
                        <ProfilePic
                            // Passing down props:
                            first={this.state.first}
                            last={this.state.last}
                            profilePicUrl={this.state.profilepicurl}
                            // Passing down methods as standard functions (binding needed):
                            toggleUploader={this.toggleUploader}
                            size="small"
                        />
                    </div>

                    {this.state.uploaderVisible && (
                        <Uploader
                            userId={this.state.id}
                            setProfilePicUrl={this.setProfilePicUrl}
                        />
                    )}

                    <div className="title">{this.state.title}</div>

            

                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />

                    <Route path="/friends" render={() => <Friends />} />

                    <Route
                        path="/chat"
                        render={() => <Chat userId={this.state.id} />}
                    />

                    <Route
                        exact
                        path="/users"
                        render={() => (
                            <FindPeople
                                // Passing down props:
                                first={this.state.first}
                                last={this.state.last}
                                id={this.state.id}
                                // Passing down methods as standard functions (binding needed):
                            />
                        )}
                    /> */}
                </div>
            </BrowserRouter>
        );
    }
}
