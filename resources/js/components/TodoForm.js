import React, { useState } from "react";

const TodoForm = (props) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [text, setText] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        props
            .addTodo({ title, text, date, time })
            .then(() => {
                setTitle("");
                setText("");
                setDate("");
                setTime("");
            })
            .catch((error) => console.log(error));
    }

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="flex mb-2">
                <input
                    className="border border-gray-500 w-100 rounded-md"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
            </div>
            <div>
                <textarea
                    name="text"
                    className="border border-gray-500 w-100 rounded-md"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Text"
                />
            </div>
            <div>
                <label className="mr-2" htmlFor="date">
                    Date
                </label>
                <input
                    name="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label className="mr-2" htmlFor="time">
                    Time
                </label>

                <input
                    name="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-blue-600 hover:bg-blue-700 focus:outline-none px-2 text-white rounded-md"
                    type="submit"
                >
                    Add
                </button>
            </div>
        </form>
    );
};

export default TodoForm;
