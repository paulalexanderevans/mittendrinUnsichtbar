import GreeTee from "./GreeTee.js";
import Counter from "./counter.js";

export default function HelloWorld() {
    const name = "Paul GreeTee";
    return (
        <div>
            <div className="hello">
                Hello <GreeTee name={name} />
            </div>
            <div className="hello">
                Hello <GreeTee name="Adobo" />
            </div>
            <div className="hello">
                Hello <GreeTee />
            </div>

            <Counter />
        </div>
    );
}
