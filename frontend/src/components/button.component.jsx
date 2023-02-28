import "../style/button.style.css";

const Button = ({ type }) => {
    const addAction = () => {
        console.log(process.env.REACT_APP_URL);
        fetch(`${process.env.REACT_APP_URL}/api`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                actionType: type,
            }),
        });
    };

    return (
        <button className="btn" onClick={addAction}>
            Ajouter une action {type}
        </button>
    );
};

export default Button;
