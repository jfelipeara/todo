import React from "react";

const InputToggle = (props) => {
    function updateData(value) {
        if (value.trim().length != 0) {
            props.setData(value);
        }
    }
    return (
        <div>
            {!props.isEditing ? (
                <span className={props.classes}>{props.data}</span>
            ) : (
                <input
                    type={props.type}
                    defaultValue={props.data}
                    onBlur={(event) => updateData(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key == "Enter") {
                            updateData(event.target.value);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default InputToggle;
