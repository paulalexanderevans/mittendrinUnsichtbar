import ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import Welcome from "./welcome.js";
import App from "./app.js";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import Reducer from "./reducers";
import { Provider } from "react-redux";
// import { io } from "socket -io";

const store = createStore(
    Reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
