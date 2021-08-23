import axios from "axios";
import React, { useState } from "react";
import InputToggle from "./InputToggle";

const Todo = ({ todo, removeTodo, editTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [text, setText] = useState(todo.text);
    const [date, setDate] = useState(todo.date);
    const [time, setTime] = useState(todo.time);

    function updateTodo() {
        axios
            .put(`api/todos/${todo.id}`, {
                id: todo.id,
                title,
                time,
                text,
                date,
            })
            .then(({ data }) => {
                setTitle(data.title);
                setText(data.text);
                setDate(data.date);
                setTime(data.time);
                editTodo(todo);
                setIsEditing(false);
            });
    }

    function deleteTodo() {
        removeTodo(todo.id);
        axios.delete(`api/todos/${todo.id}`).then(() => removeTodo(todo.id));
    }

    return (
        <li onDoubleClick={() => setIsEditing(true)} className="p-4">
            <InputToggle
                isEditing={isEditing}
                setData={setTitle}
                data={title}
                type="text"
            />
            <InputToggle
                isEditing={isEditing}
                setData={setText}
                data={text}
                type="text"
            />
            <InputToggle
                isEditing={isEditing}
                setData={setDate}
                data={date}
                type="date"
            />
            <InputToggle
                isEditing={isEditing}
                setData={setTime}
                data={time}
                type="time"
            />
            <div
                className={`flex mt-2 ${
                    isEditing ? "justify-between" : "justify-end"
                }`}
            >
                {isEditing ? (
                    <>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-blue-600 hover:bg-blue-700 focus:outline-none px-2 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={updateTodo}
                            className="bg-purple-600 hover:bg-purple-700 focus:outline-none px-2 text-white rounded-md"
                        >
                            Update
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={deleteTodo}
                        className="bg-red-500 hover:bg-red-700 focus:outline-none px-2 text-white rounded-md"
                    >
                        Delete
                    </button>
                )}
            </div>
        </li>
    );
};

export default Todo;
