import React, { useState } from "react";

const TodoForm = (props) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [text, setText] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        props.addTodo({ title, text, date, time });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default TodoForm;
