/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

import axios from "axios";
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
function App() {
    const [todos, setTodos] = useState([]);
    const [user, setuser] = useState(null);

    useEffect(() => {
        if (user) {
            axios.get("/api/todos").then(({ data }) => setTodos(data));
            Echo.private(`App.Models.User.${user.id}`).listen(
                ".TodoCreated",
                (e) => {
                    setTodos((prevState) => [...prevState, e.model]);
                }
            );
        }
    }, [user]);

    function login(user) {
        setuser(user);
    }

    function addTodo(todoItem) {
        event.preventDefault();
        axios.post("/api/todos", todoItem).then(() => {});
    }

    return (
        <div className="flex bg-white w-1/3  border-solid  border-2 border-gray-200 rounded-md">
            {user ? (
                <TodoList items={todos} addTodo={addTodo} />
            ) : (
                <Login login={login} />
            )}
        </div>
    );
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
