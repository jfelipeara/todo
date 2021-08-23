import React, { useState, useEffect } from "react";
import { store } from "react-notifications-component";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
const TodoList = (props) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const markAsCompleted = (data) => {
            setTodos((prevState) =>
                prevState.map((item) => {
                    if (item.id === data.todo_id) {
                        item.isComplete = true;
                    }

                    return item;
                })
            );

            store.addNotification({
                title: data.title,
                message: data.text,
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
            });
        };
        axios.get("/api/todos").then(({ data }) => {
            setTodos(data.data);
        });
        Echo.private(`App.Models.User.${props.channelId}`)
            .listen(".TodoCreated", (e) => {
                setTodos((prevState) => [...prevState, e.model]);
            })
            .notification((notification) => {
                markAsCompleted(notification);
            });
    }, []);

    function addTodo(todoItem) {
        event.preventDefault();
        axios.post("/api/todos", todoItem).then(() => {});
    }

    function removeTodo(todoId) {
        setTodos((prevState) =>
            [...prevState].filter((todo) => todo.id != todoId)
        );
    }

    function editTodo({ id, title, text, date, time }) {
        setTodos((prevState) =>
            prevState.map((todo) => {
                if (todo.id == id) {
                    todo.title = title;
                    todo.text = text;
                    todo.date = date;
                    todo.time = time;
                }

                return todo;
            })
        );
    }

    return (
        <div className="flex flex-col">
            <TodoForm addTodo={addTodo} />
            <ul className="divide-y divide-light-blue-400">
                {todos.map((item, index) => {
                    return (
                        <Todo
                            key={index}
                            todo={item}
                            removeTodo={removeTodo}
                            editTodo={editTodo}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default TodoList;
