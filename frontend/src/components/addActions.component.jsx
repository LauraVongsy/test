import Button from "./button.component";
import "../style/button.style.css";

const AddActionsToQueue = () => {
    return (
        <div className="button-container">
            <Button type={"A"} />
            <Button type={"B"} />
            <Button type={"C"} />
        </div>
    );
};

export default AddActionsToQueue;
