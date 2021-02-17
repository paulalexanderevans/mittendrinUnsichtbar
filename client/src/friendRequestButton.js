import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import Welcome from "./welcome.js";
import App from "./app.js";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function FriendRequestButton(props) {
    const [buttonText, setButtonText] = useState("");
    const [inputVal, setInputVal] = useState();
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [reset, setReset] = useState();
    useEffect(() => {
        console.log("this.props in friendRequestButton: ", props);
        axios
            .get(`/relationship/${props.id}`)
            .then((response) => {
                // console.log("response in friendRequestButton: ", response);
                if (response.data.length === 0) {
                    console.log("no relationship");
                    setButtonText("Make friend request");
                } else {
                    console.log("response is an array");
                    console.log("response in findPeople: ", response.data);
                    setResultList(response.data);
                    setError(false);
                }
            })

            .catch((err) => {
                console.log("error in axios get(/loggedInUser): ", err);
            });
    }, [reset]);

    const handleClick = (e) => {
        e.preventDefault();
        console.log("someone clicked on the friend request button");
        console.log("buttonText: ", buttonText);
        const data = { buttonText: buttonText, recipientid: props.id };
        axios
            .post("/friendRequest", data)
            .then((res) => {
                console.log("response from server: ", res.data);
                // console.log("this.state 1: ", this.state);
                // this.setState(res.data, () => {
                //     console.log("this.state after setState: ", this.state);
                //     if (this.state.error) {
                //         console.log("this.state.error = true");
                //     } else if (this.state.success) {
                //         location.replace("/app");
                //     }
                // });
            })
            .catch((err) => {
                console.log("error in login axios.post request: ", err);
            });
    };

    const handleChange = (e) => {
        setInputVal(e.target.value);
        console.log("inputVal: ", inputVal);
        setReset();
    };

    return (
        <div>
            {error && <h4 className="error">{errorMessage}</h4>}
            <>
                <button
                    className="friendRequestButton"
                    onClick={(e) => handleClick(e)}
                >
                    {buttonText}
                </button>
            </>
        </div>
    );
}
