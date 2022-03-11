import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import ReactDOM from "react-dom";

const FormContext = React.createContext({});

function PrimaryButton({children}) {
    return (
        <button type="submit">{children}</button>
    )
}

function FormField({name, children}) {
    const data = useContext(FormContext)
    const handleChange = useCallback(function(e) {
        data.change(e.target.name, e.target.value)
    }, [data.change])
    
    return (
        <div>
            <label htmlFor={name}>{children} : </label>
            <input type="text" name={name} id={name} 
                value={data[name] || ''} onChange={handleChange} />
        </div>
    )
}

function FormWithContext({defaultValue, onSubmit, children}) {
    const [data, setData] = useState(defaultValue)
    const change = useCallback(function (name, value) {
        setData(d => ({...d, [name]: value}))
    })
    const value = useMemo(function () {
        return {...data, change}
    }, [data, change])
    
    return (
        <FormContext.Provider value={value}>
            <form onSubmit={onSubmit}>
                {children}
            </form>
            {JSON.stringify(value)}
        </FormContext.Provider>
    )
}

function App() {

    const handleSubmit = useCallback((value) => {
        console.log(value);
    }, [])
    
    return (
        <FormWithContext
            defaultValue={{name: 'Doe', firstname: 'John'}} 
            onSubmit={handleSubmit}>
                <FormField name="firstname">Prénom</FormField>
                <FormField name="name">Nom</FormField>
                <PrimaryButton>Envoyer</PrimaryButton>
        </FormWithContext>
    )

}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);