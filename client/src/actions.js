import axios from "./axios";

export async function myFirstActionCreator() {
    const { data } = await axios.get("/someroute");
    return { type: "UPDATE_STATE_SOMEHOW", data: 12 };
}
