/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React, { useState } from "react";
import ReactDOM from "react-dom";
import TodoList from "./components/TodoList";
function App() {
    const [todos, setTodos] = useState([
        {
            title: "title one",
            date: "12/21/1994",
            time: "18:00",
            text: "lorem ipsum",
        },
        {
            title: "title two",
            date: "12/21/1994",
            time: "1:00",
            text: "lorem ipsum testa",
        },
    ]);

    addTodo = (event) => {
        event.preventDefault();
        setTodos((prevState) => [...todos, {}]);
    };

    return (
        <div className="flex bg-white w-1/3  border-solid  border-2 border-gray-200 rounded-md">
            <TodoList items={todos} />
        </div>
    );
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
