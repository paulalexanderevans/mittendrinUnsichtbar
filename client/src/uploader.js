import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
        this.submit = this.submit.bind(this);
    }

    submit() {
        const fd = new FormData();
        // ***append
        //axios request

        this.props.updateProfilePic(profilePicUrl);
    }
    render() {
        return (
            <div className={"Uploader"}>
                {/* <input ***change handler*** type="file" /> */}
            </div>
        );
    }
}
