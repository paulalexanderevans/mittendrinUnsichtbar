export default function ProfiePic(props) {
    return (
        <div className="profilePic">
            <img src={props.profilePicUrl} alt={"{props.first}"} />
        </div>
    );
}
