import React from "react";

export default function FlashBar({ message }) {
    const [visible, setVisible] = React.useState(!!message);

    React.useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!message || !visible) return null;

    return (
        <div className="flash-bar">
            {message}
        </div>
    );
}