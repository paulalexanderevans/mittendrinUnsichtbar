import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getLoggedInUser,
    getFriends,
    acceptFriendRequest,
    endFriendship,
} from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const users = useSelector(
        (state) => state.users && state.users.filter((user) => user.hot == null)
    );

    const requests = useSelector(
        (state) =>
            state.contacts &&
            state.contacts.filter((user) => user.accepted == false)
    );
    console.log("requests: ", requests);
    const friends = useSelector(
        (state) =>
            state.contacts && state.contacts.filter((user) => user.accepted)
    );
    console.log("friends: ", friends);

    const contacts = useSelector((state) => state.contacts);
    console.log("contacts: ", contacts);

    useEffect(() => {
        dispatch(getLoggedInUser());
        dispatch(getFriends());
    }, []);

    const handleClick1 = (senderid) => {
        console.log("e: ", senderid);
        console.log("someone clicked accept friend request");
        const data = {
            recipientid: senderid,
            buttonText: "Accept friend request",
        };
        console.log("data: ", data);
        dispatch(acceptFriendRequest(data));
        // const data = { buttonText: buttonText, recipientid: props.id };
    };

    const handleClick2 = (senderid) => {
        console.log("e: ", senderid);
        console.log("someone clicked End friendship");
        const data = {
            recipientid: senderid,
            buttonText: "End friendship",
        };
        console.log("data: ", data);
        dispatch(endFriendship(data));
    };

    return (
        <div className="friendsPage">
            {requests && (
                <div className="requestsContainer">
                    <h4 className="error">Requests ({requests.length})</h4>
                    {requests.map((user) => (
                        <div className="requests" key={user.id}>
                            <Link
                                to={`/user/${user.id}`}
                                className="findPeopleLink"
                            >
                                {user.first} {user.last}
                            </Link>
                            <br />
                            <Link
                                to={`/user/${user.id}`}
                                className="findPeopleLink"
                            >
                                <img
                                    className={`smallprofilePic`}
                                    src={user.profilepicurl || "default.jpg"}
                                    alt={user.first}
                                />
                            </Link>
                            <br />
                            <button
                                className="friendRequestButton"
                                onClick={() => handleClick1(user.id)}
                            >
                                Accept friend request
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {friends && (
                <div className="friendsContainer">
                    <h4 className="error">Friends ({friends.length})</h4>
                    {friends.map((user) => (
                        <div className="friends" key={user.id}>
                            <Link
                                to={`/user/${user.id}`}
                                className="findPeopleLink"
                            >
                                {user.first} {user.last}
                            </Link>
                            <br />
                            <Link
                                to={`/user/${user.id}`}
                                className="findPeopleLink"
                            >
                                <img
                                    className={`smallprofilePic`}
                                    src={user.profilepicurl || "default.jpg"}
                                    alt={user.first}
                                    // onClick={(e) => props.toggleUploader(e)}
                                />
                            </Link>
                            <br />
                            <button
                                className="friendRequestButton"
                                onClick={() => handleClick2(user.id)}
                            >
                                End friendship
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
