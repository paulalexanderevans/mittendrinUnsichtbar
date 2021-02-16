//src/welcome.js
import { Link } from "react-router-dom";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    return (
        <div className="container">
            <img className="logoBig" src="netzungDataLogo2.jpg"></img>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/ResetPassword" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
