import { useState } from "react";


export default function Player({ initialName, symbol }) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName)

    function handleEditClick() {
        setIsEditing((isEditing) => !isEditing);
    }

  
    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />
    }


    function handleChange(event) {
        // event.preventDefault();

        setPlayerName(event.target.value)
    }
    return (

        <li>

            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick} > {isEditing ? "save" : "edit"}</button>
        </li>

    )
}