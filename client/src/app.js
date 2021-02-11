import { Component } from "react";
import Logo from "./logo.js";
import ProfilePic from "./profile_pic.js";
import Uploader from "./Uploader.js";
import Profile from "./profile.js";

export default class App extends Component {
    constructor(props) {
        super(props);

        // Initialize App's state
        this.state = { uploaderVisible: false };

        // TODO: Bind methods if needed
    }

    componentDidMount() {
        // Special React Lifecycle Method
        // TODO: Make an axios request to fetch the user's data when the component mounts
        // TODO: update the state when the data is retrieved
    }

    toggleUploader() {
        // TODO: Toggles the "uploaderVisible" state
    }
    setProfilePicUrl(profilePicUrl) {
        // TODO: Updates the "profilePicUrl" in the state
        // TODO: Hides the uploader
    }

    render() {
        console.log("this.state in app.js: ", this.state);
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
            <div className={"app"}>
                <Logo />
                <ProfilePic
                    // Passing down props:
                    firstName={this.state.first}
                    lastName={this.state.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                    // Passing down methods as standard functions (binding needed):
                    toggleUploader={this.toggleUploader}
                    size="small"
                />
                <Profile
                    // Passing down props:
                    firstName={this.state.first}
                    lastName={this.state.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                    // Passing down methods as standard functions (binding needed):
                    toggleUploader={this.toggleUploader}
                />
                {/*Conditionally render the Uploader: */}
                {this.state.uploaderVisible && (
                    <Uploader
                        // Passing down methods with arrow function (no binding needed):
                        setProfilePicUrl={() => this.setProfilePicUrl()}
                    />
                )}
            </div>
        );
    }
}
