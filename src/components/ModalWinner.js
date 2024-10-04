import "./ModalWinner.css";
import ReactDOM from "react-dom";

function ModalWinner({title, children, shuffeldCards}){

        return ReactDOM.createPortal(
            <div className="modal-backdrop">
            <div className="modal" style={{ border: "4px solid #555", textAlign: "center" }}>
                <h1>{title}</h1>
                <p>You took {children} turns to win.</p>
                <button className="play-again" onClick={()=>{shuffeldCards()}}>Play Again</button>
            </div>
            </div>,
            document.body
        );
        }

export default ModalWinner;

