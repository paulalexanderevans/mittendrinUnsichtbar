import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import Welcome from "./welcome.js";
import App from "./app.js";
import { Link } from "react-router-dom";
import axios from "./axios";
const owmKey = "741eefb942314b1fd9cdbf7f597481a8";

export default function FindPeople(props) {
    const [resultList, setResultList] = useState([]);
    const [inputVal, setInputVal] = useState();
    const [selectVal, setSelectVal] = useState();
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [reset, setReset] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [min, setMin] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [userInput, setUserInput] = useState({});
    const [timeArray, setTimeArray] = useState([]);
    const [today, setToday] = useState([]);

    useEffect(() => {
        let current = new Date();
        // console.log("current: ", current);
        // let dateTimeForm = current.toISOString();
        // console.log("dateTimeForm: ", dateTimeForm);
        let date = current.toISOString().slice(0, 10);
        setToday(date);
        let hours = current.getHours();
        setMin(hours + 1);
        buildTimeArray();
        setError(false);
        setUserInput({ day: "today", effort: "1", duration: "1", time: min });
    }, [reset]);
    useEffect(() => {
        axios
            .get(`/findCity/${inputVal}`)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    if (response.data.length === 0) {
                        console.log("no matches");
                        setError(true);
                        setErrorMessage("City not found");
                        setReset(1);
                    } else {
                        console.log("response in findCity: ", response.data);
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

    const handleChange1 = (e) => {
        setInputVal(e.target.value);
        setReset();
    };

    const handleChange2 = async (e) => {
        let currentUserInput = {};
        currentUserInput = Object.assign(currentUserInput, userInput);
        currentUserInput[e.target.name] = e.target.value;
        setUserInput(currentUserInput);
    };

    const handleClick = async (city) => {
        setResultList([]);
        await setSelectedCity(city);
        setSelectVal(`${city.name}, ${city.country}`);
        // use lon & lat values from selectedCity to set correct time zone for ui and unix conversion
    };

    const handleButtonClick = async (e) => {
        e.preventDefault();
        const timeframe = await buildStart();
        console.log("someone clicked Go!");
        // console.log("selectedCity: ", selectedCity);
        // console.log("userInput in button handler: ", userInput);
        let data = { ...selectedCity, ...userInput };
        console.log("data: ", data);
        axios.post("/search", data);
        // .then((res) => {
        //     console.log("response from server: ", res.data);
        //     console.log("this.state 1: ", this.state);
        //     this.setState(res.data, () => {
        //         console.log("this.state after setState: ", this.state);
        //         if (this.state.error) {
        //             console.log("this.state.error = true");
        //         } else if (this.state.success) {
        //             location.replace("/app");
        //         }
        //     });
        // })
        // .catch((err) => {
        //     console.log("error in login axios.post request: ", err);
        // });
    };

    const buildTimeArray = async () => {
        var arr = [];
        for (var i = min; i <= 23; i++) {
            arr.push({ val: i, time: i + ":00" });
        }
        setTimeArray(arr);
    };

    const buildStart = async () => {
        if (userInput.day === "today") {
            console.log("today");
            let startDateTimeForm = `${today}T${userInput.time}:00:00`;
            let start = Date.parse(startDateTimeForm) / 1000;
            userInput["start"] = start;
            const end = await buildEnd(start);
        }
        if (userInput.day !== "today") {
            let d = new Date(today);
            d.setDate(d.getDate() + 1);
            let tomorrow = d.toISOString().slice(0, 10);
            let startDateTimeForm = `${tomorrow}T${userInput.time}:00:00`;
            let start = Date.parse(startDateTimeForm) / 1000;
            userInput["start"] = start;
            const end = await buildEnd(start);
        }
        return "timeframeset";
    };

    const buildEnd = async (start) => {
        let end = start + userInput.duration * 3600;
        userInput["end"] = end;
        return end;
    };

    return (
        <div className="chatPage">
            <h1>citySearch</h1>
            <h3>Where are you riding?</h3>
            <input
                name="first"
                type="text"
                className="inputField"
                placeholder="enter city name"
                autoComplete="off"
                value={selectVal}
                onChange={handleChange1}
            />
            {error && <h4 className="error">{errorMessage}</h4>}
            <div className="citiesContainer">
                {resultList.map((city) => (
                    <div
                        className="cities"
                        onClick={() => handleClick(city)}
                        key={city.id}
                    >
                        {city.state && (
                            <h4>
                                {city.name}, {city.state}, {city.country}
                            </h4>
                        )}

                        {!city.state && (
                            <h4>
                                {city.name}, {city.country}
                            </h4>
                        )}
                    </div>
                ))}
            </div>
            <h3>When are you riding?</h3>
            {/* <input
                id="start"
                type="datetime-local"
                name="start"
                min={min}
                max={max}
                data-date-format="YYYY-MM-DD HH:mm"
                value={min}
                placeholder={min}
                onChange={handleChange2}
            /> */}
            <select
                onChange={handleChange2}
                name="day"
                placeholder="today"
                className="time"
            >
                <option value="today">today</option>
                <option value="tomorrow">tomorrow</option>
            </select>
            {userInput.day === "today" && (
                <select
                    onChange={handleChange2}
                    name="time"
                    placeholder="now"
                    className="time"
                >
                    {timeArray.map((hour) => (
                        <option key={hour.val} value={hour.val}>
                            {hour.time}
                        </option>
                    ))}
                </select>
            )}
            {userInput.day !== "today" && (
                <select
                    onChange={handleChange2}
                    name="time"
                    placeholder="now"
                    className="time"
                >
                    <option value="00">00:00</option>
                    <option value="01">01:00</option>
                    <option value="02">02:00 </option>
                    <option value="03">03:00</option>
                    <option value="04">04:00</option>
                    <option value="05">05:00</option>
                    <option value="06">06:00</option>
                    <option value="07">07:00</option>
                    <option value="08">08:00</option>
                    <option value="09">09:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                    <option value="20">20:00</option>
                    <option value="21">21:00</option>
                    <option value="22">22:00</option>
                    <option value="23">23:00</option>
                </select>
            )}
            <h3>Duration</h3>
            <select
                onChange={handleChange2}
                name="duration"
                placeholder="duration"
                className="time"
            >
                <option value="1">01:00</option>
                <option value="2">02:00</option>
                <option value="3">03:00</option>
                <option value="4">04:00</option>
                <option value="5">05:00</option>
                <option value="6">06:00</option>
                <option value="7">07:00</option>
                <option value="8">08:00</option>
                <option value="9">09:00</option>
                <option value="10">10:00</option>
                <option value="11">11:00</option>
                <option value="12">12:00</option>
                <option value="13">13:00</option>
                <option value="14">14:00</option>
                <option value="15">15:00</option>
                <option value="16">16:00</option>
                <option value="17">17:00</option>
                <option value="18">18:00</option>
                <option value="19">19:00</option>
                <option value="20">20:00</option>
                <option value="21">21:00</option>
                <option value="22">22:00</option>
                <option value="23">23:00</option>
                <option value="24">24:00</option>
            </select>
            <h3>Effort level</h3>
            <select
                onChange={handleChange2}
                name="effort"
                placeholder="Full-gas"
                className="effort"
            >
                <option value="1">Endurance</option>
                <option value="2">Tempo</option>
                <option value="3">Full-gas</option>
            </select>
            <button
                className="friendRequestButton"
                onClick={(e) => handleButtonClick(e)}
            >
                Go!
            </button>
        </div>
    );
}
