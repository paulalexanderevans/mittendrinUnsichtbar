export default function GreeTee(props) {
    console.log("props in GreeTee: ", props);
    return <span>{props.name || "Joe"}</span>;
}
