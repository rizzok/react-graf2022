import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

function useIncrement(initial = 0, step = 1) {
    const [count, setCount] = useState(initial);
    const increment = () => {
        setCount(c => c + step)
    }
    return [count, increment]
}

function useAutoIncrement(initial = 0, step = 1) {
    const [count, increment] = useIncrement(initial, step)
    
    useEffect(() => {
        const timer = window.setInterval(() => {
            increment()
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    }, [])

    return count
}

function useToggle(visible = true) {
    const [isVisible, setIsVisible] = useState(visible)
    const setCompteurVisible = () => {
        setIsVisible(isVisible => !isVisible)
    }
    return [isVisible, setCompteurVisible]
}

function Compteur() {
    const count = useAutoIncrement(10);
    
    return (
        <button>Compteur {count}</button>
    );
}

function useFetch(url) {
    const [datas, setDatas] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(
                result => {
                    setIsLoaded(true)
                    setDatas(result)
                },
                error => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [])

    return [datas, isLoaded, error]
}

function TodoList() {
    const [todos, isLoaded, error] = useFetch('https://jsonplaceholder.typicode.com/todos?_limit=10')

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title}
                    </li>
                ))}
            </ul>
        );
    }
}

function PostTable() {
    const [posts, isLoaded, error] = useFetch('https://jsonplaceholder.typicode.com/comments?_limit=10')
    
    if (error) {
        return <p>Erreur : {error}</p>
    } else if (!isLoaded) {
        return <p>Chargement...</p>
    } else {
        return (
            <div>
                {posts.map(p => {
                    return (
                        <div key={p.id}>
                            <h3>{p.name}</h3>
                            <p>{p.email}</p>
                            <p>{p.body}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

function App() {
    const [compteurVisible, setCompteurVisible] = useToggle(true)

    return (
        <>
            <div>
                <input type="checkbox" id="togglecompteur" name='togglecompteur'
                    onChange={setCompteurVisible} checked={compteurVisible} />
                <label htmlFor="togglecompteur">Afficher le compteur</label>
            </div>
            {compteurVisible && <Compteur />}
            <TodoList/>
            <PostTable/>
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);