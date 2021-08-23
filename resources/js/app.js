/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

import { data } from "autoprefixer";
import axios from "axios";
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("/api/user").then(({ data }) => {
                setUser(data);
            });
        }
    }, []);

    function login(user) {
        setUser(user);
    }

    return (
        <>
            <ReactNotification />
            <div className="flex bg-white w-1/3  border-solid  border-2 border-gray-200 rounded-md justify-content-center">
                {user ? (
                    <TodoList channelId={user.id} />
                ) : (
                    <Login login={login} />
                )}
            </div>
        </>
    );
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
