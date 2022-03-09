import React, { useState } from 'react';
import ReactDOM from "react-dom";

function Compteur() {
    const [count, setCount] = useState(0)

    const handleClick = function (e) {
        e.preventDefault() 
        setCount(10)
    }
    
    return <button onClick={handleClick}>Nombre : {count}</button>
}

ReactDOM.render(
    <div>
        <Compteur/>
    </div>,
    document.getElementById("app")
)