import React from 'react';
import LoadingSpin from "../assets/images/loading-spin.gif";

export default function Spinner() {
    return (
        <div className="text-center">
            <img className="text-center" src={LoadingSpin} alt="Loading..." />
        </div>
    );
}

