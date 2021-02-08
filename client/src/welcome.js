//src/welcome.js
import Registration from "./registration.js";

export default function Welcome() {
    return (
        <div className="container">
            <h2>Welcome to Netzung</h2>
            <img className="logoBig" src="netzungLogo.jpg"></img>
            <Registration />
        </div>
    );
}
