export default function ProfilePic({
    image,
    first,
    last,
    clickhandler,
    size = "",
}) {
    return (
        <div>
            <img
                className={`${size} profilePic`}
                src={image}
                alt={"{props.first}"}
            />
        </div>
    );
}
