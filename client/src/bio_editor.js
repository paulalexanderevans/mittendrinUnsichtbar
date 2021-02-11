import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
        };
    }

    render() {
        console.log("this.props in bio_editor: ", this.props);
        if (this.state.editMode) {
            return (
                <div className="editMode">
                    <h1>EDIT MODE</h1>
                    <textarea defaultValue="this is the bio from this.props"></textarea>
                    <button>Save Bio</button>
                </div>
            );
        }
        return (
            <div className={"Uploader"}>
                <h1>BioEditor</h1>
                <p>This will be the users bio that we get from props</p>
                <button>Edit Bio</button>
            </div>
        );
    }
}
