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
        axios.delete(`api/todos/${todo.id}`).then(() => removeTodo(todo.id));
    }

    function getButtons() {
        if (todo.isComplete) {
            return;
        } else {
            if (isEditing) {
                return (
                    <>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-red-600 hover:bg-red-700 focus:outline-none px-2 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={updateTodo}
                            className="bg-blue-600 hover:bg-blue-700 focus:outline-none px-2 text-white rounded-md"
                        >
                            Update
                        </button>
                    </>
                );
            } else {
                return (
                    <button
                        type="button"
                        onClick={deleteTodo}
                        className="bg-red-500 hover:bg-red-700 focus:outline-none px-2 text-white rounded-md"
                    >
                        Delete
                    </button>
                );
            }
        }
    }

    return (
        <li
            onDoubleClick={() => !todo.isComplete && setIsEditing(true)}
            className={`p-4 ${todo.isComplete ? "bg-green-100" : ""}`}
        >
            <InputToggle
                isEditing={isEditing}
                setData={setTitle}
                data={title}
                type="text"
                classes="font-bold"
            />
            <InputToggle
                isEditing={isEditing}
                setData={setText}
                data={text}
                type="text"
                classes="font-semibold"
            />
            {isEditing && (
                <>
                    <InputToggle
                        isEditing
                        setData={setDate}
                        data={date}
                        type="date"
                    />
                    <InputToggle
                        isEditing
                        setData={setTime}
                        data={time}
                        type="time"
                    />
                </>
            )}
            <div className="font-medium">{todo.user.name}</div>
            <div
                className={`flex mt-2 ${
                    isEditing ? "justify-between" : "justify-end"
                }`}
            >
                {getButtons()}
            </div>
        </li>
    );
};

export default Todo;
