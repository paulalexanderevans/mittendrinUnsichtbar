const db = require("./db");

var advice = [
    //-5 endurance
    {
        temp: -5,
        dry: true,
        effort: 1,
        data: {
            head: "Insulated windproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layers, softshell windproof winter jacket",
            bottom: "Insulated windproof tights",
            feet: "Thick winter socks, thick neoprene overshoes",
            hands: "Insulated windproof gloves with liner gloves",
        },
    },
    {
        temp: -5,
        dry: false,
        effort: 1,
        data: {
            head: "Insulated waterproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layers, hardshell waterproof winter jacket",
            bottom: "Insulated wind and waterproof tights",
            feet: "Thick wool winter socks, thick neoprene overshoes",
            hands: "Insulated waterproof gloves with liner gloves",
        },
    },
    //-5 tempo
    {
        temp: -5,
        dry: true,
        effort: 2,
        data: {
            head: "Insulated windproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layers, softshell windproof winter jacket",
            bottom: "Insulated windproof tights",
            feet: "Thick winter socks, thick neoprene overshoes",
            hands: "Insulated windproof gloves with liner gloves",
        },
    },
    {
        temp: -5,
        dry: false,
        effort: 2,
        data: {
            head: "Insulated waterproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layers, hardshell waterproof winter jacket",
            bottom: "Insulated wind and waterproof tights",
            feet: "Thick wool winter socks, thick neoprene overshoes",
            hands: "Insulated waterproof gloves with liner gloves",
        },
    },
    //-5 fullgas
    {
        temp: -5,
        dry: true,
        effort: 3,
        data: {
            head: "Insulated windproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layer, softshell windproof winter jacket",
            bottom: "Insulated windproof tights",
            feet: "Thick winter socks, thick neoprene overshoes",
            hands: "Insulated windproof gloves with liner gloves",
        },
    },
    {
        temp: -5,
        dry: false,
        effort: 3,
        data: {
            head: "Insulated waterproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layer, hardshell waterproof winter jacket",
            bottom: "Insulated wind and waterproof tights",
            feet: "Thick wool winter socks, thick neoprene overshoes",
            hands: "Insulated waterproof gloves with liner gloves",
        },
    },
    //0 endurance
    {
        temp: 0,
        dry: true,
        effort: 1,
        data: {
            head: "Insulated windproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layers, softshell windproof winter jacket",
            bottom: "Insulated windproof tights",
            feet: "Thick winter socks, thick neoprene overshoes",
            hands: "Insulated windproof gloves with liner gloves",
        },
    },
    {
        temp: 0,
        dry: false,
        effort: 1,
        data: {
            head: "Insulated waterproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layers, hardshell waterproof winter jacket",
            bottom: "Insulated wind and waterproof tights",
            feet: "Thick wool winter socks, thick neoprene overshoes",
            hands: "Insulated waterproof gloves with liner gloves",
        },
    },
    //0 tempo
    {
        temp: 0,
        dry: true,
        effort: 2,
        data: {
            head: "Insulated windproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layers, softshell windproof winter jacket",
            bottom: "Insulated windproof tights",
            feet: "Thick winter socks, thick neoprene overshoes",
            hands: "Insulated windproof gloves with liner gloves",
        },
    },
    {
        temp: 0,
        dry: false,
        effort: 2,
        data: {
            head: "Insulated waterproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layers, hardshell waterproof winter jacket",
            bottom: "Insulated wind and waterproof tights",
            feet: "Thick wool winter socks, thick neoprene overshoes",
            hands: "Insulated waterproof gloves with liner gloves",
        },
    },
    //0 fullgas
    {
        temp: 0,
        dry: true,
        effort: 3,
        data: {
            head: "Insulated windproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layer, softshell windproof winter jacket",
            bottom: "Insulated windproof tights",
            feet: "Thick winter socks, thick neoprene overshoes",
            hands: "Insulated windproof gloves",
        },
    },
    {
        temp: 0,
        dry: false,
        effort: 3,
        data: {
            head: "Insulated waterproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layer, hardshell waterproof winter jacket",
            bottom: "Insulated wind and waterproof tights",
            feet: "Thick wool winter socks, thick neoprene overshoes",
            hands: "Neoprene gloves",
        },
    },
    // 5 endurance
    {
        temp: 5,
        dry: true,
        effort: 1,
        data: {
            head: "Insulated windproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layers, softshell windproof winter jacket",
            bottom: "Insulated windproof tights",
            feet: "Thick winter socks, thick neoprene overshoes",
            hands: "Insulated windproof gloves",
        },
    },
    {
        temp: 5,
        dry: false,
        effort: 1,
        data: {
            head: "Insulated waterproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layers, hardshell waterproof winter jacket",
            bottom: "Insulated wind and waterproof tights",
            feet: "Thick wool winter socks, thick neoprene overshoes",
            hands: "Insulated waterproof gloves",
        },
    },
    //5 tempo
    {
        temp: 5,
        dry: true,
        effort: 2,
        data: {
            head: "Insulated windproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layer, softshell windproof winter jacket",
            bottom: "Insulated windproof tights",
            feet: "Thick winter socks, oversocks",
            hands: "Insulated windproof gloves",
        },
    },
    {
        temp: 5,
        dry: false,
        effort: 2,
        data: {
            head: "Insulated waterproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layer, hardshell waterproof winter jacket",
            bottom: "Insulated wind and waterproof tights",
            feet: "Thick wool winter socks, thick neoprene overshoes",
            hands: "Neoprene gloves",
        },
    },
    //5 fullgas
    {
        temp: 5,
        dry: true,
        effort: 3,
        data: {
            head: "Insulated hat, buff around neck",
            top: "Winter base layer, softshell windproof winter jacket",
            bottom: "Windproof tights",
            feet: "Thick winter socks, oversocks",
            hands: "Windproof gloves",
        },
    },
    {
        temp: 5,
        dry: false,
        effort: 3,
        data: {
            head: "Waterproof hat, buff around neck",
            top: "Winter base layer, hardshell waterproof winter jacket",
            bottom: "Insulated wind and waterproof tights",
            feet: "Thick wool winter socks, waterproof overshoes",
            hands: "Neoprene gloves",
        },
    },
    // 10 endurance
    {
        temp: 10,
        dry: true,
        effort: 1,
        data: {
            head: "Insulated windproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layer, softshell windproof winter jacket",
            bottom: "Insulated windproof tights",
            feet: "Thick winter socks, oversocks",
            hands: "Insulated windproof gloves",
        },
    },
    {
        temp: 10,
        dry: false,
        effort: 1,
        data: {
            head: "Insulated waterproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layer, hardshell waterproof jacket",
            bottom: "Insulated wind and waterproof tights",
            feet: "Thick wool winter socks, thick neoprene overshoes",
            hands: "Insulated waterproof gloves",
        },
    },
    //10 tempo
    {
        temp: 10,
        dry: true,
        effort: 2,
        data: {
            head: "Insulated hat, buff around neck",
            top: "Base layer, mid layer, softshell windproof jacket",
            bottom: "Tights",
            feet: "Thick winter socks, oversocks",
            hands: "Windproof gloves",
        },
    },
    {
        temp: 10,
        dry: false,
        effort: 2,
        data: {
            head: "Waterproof hat, buff around neck",
            top: "Base layer, mid layer, hardshell waterproof jacket",
            bottom: "Wind and waterproof tights",
            feet: "Thick wool winter socks, thick neoprene overshoes",
            hands: "Neoprene gloves",
        },
    },
    //10 fullgas
    {
        temp: 10,
        dry: true,
        effort: 3,
        data: {
            head: "Cap",
            top: "Base layer, softshell windproof jacket",
            bottom: "Shorts, leg warmers",
            feet: "Thick winter socks, oversocks",
            hands: "Long finger gloves",
        },
    },
    {
        temp: 10,
        dry: false,
        effort: 3,
        data: {
            head: "Cap",
            top: "Base layer, softshell windproof jacket",
            bottom: "Shorts, leg warmers",
            feet: "Thick wool winter socks, waterproof overshoes",
            hands: "Neoprene gloves",
        },
    },
    // 15 endurance
    {
        temp: 15,
        dry: true,
        effort: 1,
        data: {
            head: "Insulated hat, buff around neck",
            top:
                "Winter base layer, insulating mid layer, softshell windproof jacket",
            bottom: "Tights",
            feet: "Midweight socks, oversocks",
            hands: "Windproof gloves",
        },
    },
    {
        temp: 15,
        dry: false,
        effort: 1,
        data: {
            head: "Waterproof hat, buff around neck",
            top:
                "Winter base layer, insulating mid layer, hardshell waterproof jacket",
            bottom: "Wind and waterproof tights",
            feet: "Midweight socks, neoprene overshoes",
            hands: "Neoprene gloves",
        },
    },
    //15 tempo
    {
        temp: 15,
        dry: true,
        effort: 2,
        data: {
            head: "Cap",
            top: "Base layer, mid layer, softshell windproof jacket",
            bottom: "Shorts, knee warmers",
            feet: "Midweight socks",
            hands: "Long finger gloves",
        },
    },
    {
        temp: 15,
        dry: false,
        effort: 2,
        data: {
            head: "Cap, buff around neck",
            top: "Base layer, mid layer, hardshell waterproof jacket",
            bottom: "Shorts, leg warmers",
            feet: "Midweight socks, waterproof overshoes",
            hands: "Windproof gloves",
        },
    },
    //15 fullgas
    {
        temp: 15,
        dry: true,
        effort: 3,
        data: {
            head: "Bare",
            top: "Base layer, jersey",
            bottom: "Shorts",
            feet: "Midweight socks",
            hands: "Short finger gloves",
        },
    },
    {
        temp: 15,
        dry: false,
        effort: 3,
        data: {
            head: "Cap",
            top: "Base layer, jersey, gilet",
            bottom: "Shorts, knee warmers",
            feet: "Midweight socks, waterproof overshoes",
            hands: "Windproof gloves",
        },
    },
    // 20 endurance
    {
        temp: 20,
        dry: true,
        effort: 1,
        data: {
            head: "Cap",
            top: "Base layer, jersey, softshell windproof jacket",
            bottom: "Shorts, knee warmers",
            feet: "Midweight socks, oversocks",
            hands: "Short finger gloves",
        },
    },
    {
        temp: 20,
        dry: false,
        effort: 1,
        data: {
            head: "Cap",
            top: "Base layer, insulating mid layer, softshell windproof jacket",
            bottom: "Tights",
            feet: "Midweight socks, neoprene overshoes",
            hands: "Windproof gloves",
        },
    },
    //20 tempo
    {
        temp: 20,
        dry: true,
        effort: 2,
        data: {
            head: "Cap",
            top: "Base layer, jersey",
            bottom: "Shorts",
            feet: "Midweight socks",
            hands: "Short finger gloves",
        },
    },
    {
        temp: 20,
        dry: false,
        effort: 2,
        data: {
            head: "Cap",
            top: "Base layer, jersey, gilet",
            bottom: "Shorts, knee warmers",
            feet: "Midweight socks, waterproof overshoes",
            hands: "Windproof gloves",
        },
    },
    //20 fullgas
    {
        temp: 20,
        dry: true,
        effort: 3,
        data: {
            head: "Bare",
            top: "Jersey",
            bottom: "Shorts",
            feet: "Midweight socks",
            hands: "Short finger gloves",
        },
    },
    {
        temp: 20,
        dry: false,
        effort: 3,
        data: {
            head: "Cap",
            top: "Base layer, jersey",
            bottom: "Shorts",
            feet: "Midweight socks, waterproof overshoes",
            hands: "Short finger gloves",
        },
    },
    // 25 endurance
    {
        temp: 25,
        dry: true,
        effort: 1,
        data: {
            head: "Bare",
            top: "Base layer, jersey",
            bottom: "Shorts",
            feet: "Lightweight socks",
            hands: "Short finger gloves",
        },
    },
    {
        temp: 25,
        dry: false,
        effort: 1,
        data: {
            head: "Cap",
            top: "Base layer, jersey, softshell windproof jacket",
            bottom: "Shorts, knee warmers",
            feet: "Midweight socks",
            hands: "Short finger gloves",
        },
    },
    //25 tempo
    {
        temp: 25,
        dry: true,
        effort: 2,
        data: {
            head: "Bare",
            top: "Base layer, jersey",
            bottom: "Shorts",
            feet: "Lightweight socks",
            hands: "Short finger gloves",
        },
    },
    {
        temp: 25,
        dry: false,
        effort: 2,
        data: {
            head: "Cap",
            top: "Base layer, jersey, gilet",
            bottom: "Shorts",
            feet: "Midweight socks",
            hands: "Short finger gloves",
        },
    },
    //25 fullgas
    {
        temp: 25,
        dry: true,
        effort: 3,
        data: {
            head: "Bare",
            top: "Jersey",
            bottom: "Shorts",
            feet: "Lightweight socks",
            hands: "Short finger gloves",
        },
    },
    {
        temp: 25,
        dry: false,
        effort: 3,
        data: {
            head: "Cap",
            top: "Jersey",
            bottom: "Shorts",
            feet: "Lightweight socks",
            hands: "Short finger gloves",
        },
    },
    // 30 endurance
    {
        temp: 30,
        dry: true,
        effort: 1,
        data: {
            head: "Bare",
            top: "Base layer, jersey",
            bottom: "Shorts",
            feet: "Lightweight socks",
            hands: "Short finger gloves",
        },
    },
    {
        temp: 30,
        dry: false,
        effort: 1,
        data: {
            head: "Cap",
            top: "Base layer, jersey, gilet",
            bottom: "Shorts",
            feet: "Lightweight socks",
            hands: "Short finger gloves",
        },
    },
    //30 tempo
    {
        temp: 30,
        dry: true,
        effort: 2,
        data: {
            head: "Bare",
            top: "Jersey",
            bottom: "Shorts",
            feet: "Lightweight socks",
            hands: "Short finger gloves",
        },
    },
    {
        temp: 30,
        dry: false,
        effort: 2,
        data: {
            head: "Cap",
            top: "Base layer, jersey",
            bottom: "Shorts",
            feet: "Lightweight socks",
            hands: "Short finger gloves",
        },
    },
    //30 fullgas
    {
        temp: 30,
        dry: true,
        effort: 3,
        data: {
            head: "Bare",
            top: "Jersey",
            bottom: "Shorts",
            feet: "Lightweight socks",
            hands: "Short finger gloves",
        },
    },
    {
        temp: 30,
        dry: false,
        effort: 3,
        data: {
            head: "Bare",
            top: "Jersey",
            bottom: "Shorts",
            feet: "Lightweight socks",
            hands: "Short finger gloves",
        },
    },
];

const insert = async () => {
    for (var i = 0; i < advice.length; i++) {
        try {
            let result = await db.insert(
                advice[i].temp,
                advice[i].dry,
                advice[i].data,
                advice[i].effort
            );
            // console.log("advice[i]: ", i, advice[i]);
            // console.log("result.rows[i]: ", i, result.rows[i]);
        } catch (err) {
            console.log("error in db.insert: ", err);
        }
    }
};

const get = async () => {
    try {
        let result = await db.getData(20, false, 1);
        console.log("result.rows: ", result.rows);
    } catch (err) {
        console.log("error in db.getData: ", err);
    }
};

var minusFiveTrueOneJSON = JSON.stringify(advice);

// insert();
get();

// console.log(insert);

var andBack = JSON.parse(minusFiveTrueOneJSON);

// console.log("andBack: ", andBack);
