import ReactDOM from "react-dom";
import Component from "react";
import Logo from "./logo.js";
import ProfilePic from "./profile_pic.js";
import Uploader from "./Uploader.js";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //when component mounts fetch current users data from database
        //once the data is back, set it to the state
        this.setState({
            first: "",
            last: "",
            profilePicUrl: "",
        });
    }

    toggleUploader() {
        this.setState({
            uploaderVisible: !this.state.uploaderVisible,
        });
    }

    updateProfilePic(profilePicUrl) {
        this.setState({ profilePicUrl });
    }

    render() {
        return (
            <div className="app">
                <button onClick={() => this.toggleUploader()}></button>
                <Logo />
                <ProfilePic profilePicUrl={this.state.profilePicUrl} />
                {this.state.uploaderVisible && <Uploader updateProfilePic />}
            </div>
        );
    }
}
