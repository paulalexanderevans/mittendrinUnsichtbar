export function reducer(state = {}, action) {
    console.log("state in reducer: ", state);

    if (action.type === "UPDATE_STATE_SOMEHOW") {
        //update the state object
    }
    return state;
}
