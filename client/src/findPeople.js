import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import Welcome from "./welcome.js";
import App from "./app.js";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function FindPeople(props) {
    const [resultList, setResultList] = useState([]);
    const [inputVal, setInputVal] = useState();
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [reset, setReset] = useState();
    useEffect(() => {
        axios
            .get("/recentlyJoined")
            .then((response) => {
                setResultList(response.data);
            })
            .catch((err) => {
                console.log("error in axios get(/loggedInUser): ", err);
            });
    }, [reset]);
    useEffect(() => {
        console.log("inputVal inside useEffect2: ", inputVal);
        axios
            .get(`/findPeople/${inputVal}`)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    if (response.data.length === 0) {
                        console.log("no matches");
                        setError(true);
                        setErrorMessage("No matches");
                        setReset(1);
                    } else {
                        console.log("response is an array");
                        console.log("response in findPeople: ", response.data);
                        setResultList(response.data);
                        setError(false);
                    }
                }
                if (inputVal === "") {
                    setReset(1);
                }
            })

            .catch((err) => {
                console.log("error in axios get(/findPeople): ", err);
            });
    }, [inputVal]);

    const handleChange = (e) => {
        setInputVal(e.target.value);
        console.log("inputVal: ", inputVal);
        setReset();
    };

    return (
        <div>
            {/* <h2>Hi {props.first}</h2> */}
            <h3>Find People</h3>
            <input name="first" type="text" onChange={handleChange} />
            {error && <h4 className="error">{errorMessage}</h4>}
            {!inputVal && <h4>Check out who just joined</h4>}
            {resultList.map((user) => (
                <div className="findPeople" key={user.id}>
                    <Link to={`/user/${user.id}`} className="findPeopleLink">
                        <img
                            className={`smallprofilePic`}
                            src={user.profilepicurl || "default.jpg"}
                            alt={user.first}
                            onClick={(e) => props.toggleUploader(e)}
                        />
                    </Link>
                    <p>
                        <Link
                            to={`/user/${user.id}`}
                            className="findPeopleLink"
                        >
                            {user.first} {user.last}
                        </Link>
                    </p>
                </div>
            ))}
        </div>
    );
}
