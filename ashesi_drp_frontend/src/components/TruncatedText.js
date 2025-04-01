"use client";
import {useState} from "react";

export default function TruncatedText({ text, maxLength }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => setIsExpanded(!isExpanded);

    return (
        <p>
            {isExpanded ? text : text.slice(0, maxLength) + "... "}
            {text.length > maxLength && (
                <button onClick={toggleText} style={{ color: "#AA3C3F", border: "none", background: "none", cursor: "pointer" }}>
                    {isExpanded ? "See Less" : "See More"}
                </button>
            )}
        </p>
    );
}