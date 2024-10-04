import "./Card.css";
function Card({card, handleChoice, flipped, disabled}){

    function handleClicked(){
        if(!disabled){
            handleChoice(card);
        }
    }

    return(
    <div className='card'>
        {/* this is how we give a clas based on a condition in react */}
        <div className={flipped ? "flipped" : ""}>
            <img src={card.src} className='front' />
            <img className="back" onClick={handleClicked} src='/img/cover.png' />
        </div>
    </div>
    );
}

export default Card;