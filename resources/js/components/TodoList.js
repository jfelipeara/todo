import React from "react";
const TodoList = (props) => {
    return (
        <>
            <form action="" onSubmit={props.addTodo}></form>
            <ul>
                {props.items.map((item, index) => {
                    return <li key={index}>{item.text}</li>;
                })}
            </ul>
        </>
    );
};

export default TodoList;
