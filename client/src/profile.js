import BioEditor from "./bio_editor.js";

export default function Profile(props) {
    console.log("props in profile: ", props);
    return (
        <div className="profileContainer">
            <h4>
                Hi {props.first} {props.last}
            </h4>
            {/* <img src={props.profilePicUrl} alt={"{props.first}"} /> */}
            <BioEditor />
        </div>
    );
}
