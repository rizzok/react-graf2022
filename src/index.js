import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from "react-dom";

function PrimaryButton({children}) {
    return (
        <button type="submit">{children}</button>
    )
}

function FormField(props) {
    return (
        <div>
            <label htmlFor={props.name}>{props.children} : </label>
            <input type="text" name={props.name} id={props.name} />
        </div>
    )
}

function FormContext({children}) {
    return (
        <form>
            {children}
        </form>
    )
}

function App() {

    const handleSubmit = useCallback((value) => {
        console.log(value);
    }, [])
    
    return (
        <FormContext 
            defaultValue={{name: 'Doe', firstname: 'John'}} 
            onSubmit={handleSubmit}>
                <FormField name="name">Nom</FormField>
                <FormField name="firstname">Prénom</FormField>
                <PrimaryButton>Envoyer</PrimaryButton>
        </FormContext>
    )

}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);