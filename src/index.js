import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Header from './Header';

function Footer() {
    return (
        <footer>
            <div>
                <h4>Footer category</h4>
                <ul>
                    <li>Footer link</li>
                    <li>Footer link</li>
                    <li>Footer link</li>
                    <li>Footer link</li>
                </ul>
            </div>
            <div>
                <h4>Footer category</h4>
                <ul>
                    <li>Footer link</li>
                    <li>Footer link</li>
                    <li>Footer link</li>
                    <li>Footer link</li>
                </ul>
            </div>
            <div>
                <h4>Footer category</h4>
                <ul>
                    <li>Footer link</li>
                    <li>Footer link</li>
                    <li>Footer link</li>
                    <li>Footer link</li>
                </ul>
            </div>
        </footer>
    )
}

function App() {
    return (
        <>
            <Header />
            <Footer />
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
)
