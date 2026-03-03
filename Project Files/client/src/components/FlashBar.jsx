import React from 'react';

/**
 * A simple full-width notification bar that appears at the top of the
 * viewport. The parent is responsible for passing a message and clearing it
 * when appropriate.
 */
export default function FlashBar({ message }) {
    if (!message) return null;

    return (
        <div className="flash-bar">
            {message}
        </div>
    );
}
