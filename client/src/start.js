import ReactDOM from "react-dom";
import HelloWorld from "./helloWorld.js";
import Welcome from "./welcome.js";
import Logo from "./logo.js";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <Logo />;
}

ReactDOM.render(<Welcome />, document.querySelector("main"));
