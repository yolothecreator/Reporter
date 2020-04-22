import React from "react";
import "../styles/errorMessage.css"

export const Message = (props) => {
    const {message, size, className} = props;
    return (
        <input className={className}
               type="text"
               value={message}
               size={size ? size : message.length}
               readOnly={true}
        />
    )
};
