

api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


let 

https: $.ajax({
    method: "get",
    url: "https://spicedify.herokuapp.com/spotify?scroll=infinite",
    data: {
        query: userInput,
        type: artistOrAlbum,
    },
    success: function (response) {
        console.log("response ", response);
    },
});
