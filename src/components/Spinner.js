import React from 'react';
import LoadingSpin from "./LoadingSpin.gif";

export default function Spinner() {
  return (
    <div className="text-center">
      <img className="text-center" src={LoadingSpin} alt="Loading..." />
    </div>
  );
}

