import "./Object.css";

function Object({ name, magnitude, isDangerous }) {
    return (
        <div className="object">
            <div>name: {name}</div>
            <div>magnitude: {magnitude} </div>
            <div>Dangerous: {isDangerous.toString()}</div>
        </div>
    );
}

export default Object;
