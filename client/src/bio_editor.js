import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
        };
    }

    toggleBioEditor(e) {
        e.preventDefault();
        console.log("someone clicked toggleBioEditor");
        this.setState({ editMode: true });
        // if (this.state.uploaderVisible) {
        //     this.setState({ uploaderVisible: false });
        // } else {
        //     this.setState({ uploaderVisible: true });
        // }
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

    saveBio(e) {
        e.preventDefault();
        console.log("someone clicked saveBio");
        this.setState({
            editMode: false,
            displayMessage: "Updating Bio...",
            message: true,
        });
        console.log("this.state.bioText: ", this.state.bioText);
        axios
            .post("/bio", this.state)
            .then((response) => {
                console.log("response in bio_editor.js: ", response.data.bio);
                this.setState({
                    displayMessage: "Bio updated",
                });
                this.setState({ message: true, error: true });
                console.log("this.props in bio_editor.js: ", this.props);
                this.props.setBio(response.data.bio);
            })
            .catch((err) => {
                console.log("error in axios post bio_editor.js: ", err);
                this.setState({
                    message: false,
                    success: false,
                    error: true,
                    errorMessage: "Error updating Bio, please try again",
                });
            });
    }

    render() {
        console.log("this.props in bio_editor: ", this.props);
        console.log("this.state: ", this.state);
        if (this.state.editMode) {
            return (
                <div className="bio">
                    <div className="editMode">
                        <h4 className="error">Edit Bio</h4>
                        <textarea
                            name="bioText"
                            onChange={(e) => this.handleChange(e)}
                            defaultValue={this.props.bio}
                        ></textarea>
                        <br />
                        <button onClick={(e) => this.saveBio(e)}>
                            Save Bio
                        </button>
                    </div>
                </div>
            );
        }

        if (!this.props.bio) {
            return (
                <div className="bio">
                    <div>
                        <h4 className="error">Bio</h4>
                        {this.state.message && (
                            <h4 className="error">
                                {this.state.displayMessage}
                            </h4>
                        )}
                        <p>{this.props.bio}</p>
                        <button onClick={(e) => this.toggleBioEditor(e)}>
                            Add Bio
                        </button>
                    </div>
                </div>
            );
        }

        if (this.props.bio) {
            return (
                <div className="bio">
                    <div>
                        <h4>Bio</h4>
                        {this.state.message && (
                            <h4 className="error">
                                {this.state.displayMessage}
                            </h4>
                        )}
                        <p>{this.props.bio}</p>
                        <button onClick={(e) => this.toggleBioEditor(e)}>
                            Edit Bio
                        </button>
                    </div>
                </div>
            );
        }
    }
}
