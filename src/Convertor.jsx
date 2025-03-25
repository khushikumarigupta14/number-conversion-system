import React, { useState } from "react";

const Converter = () => {
  const [inputValue, setInputValue] = useState("");
    const [fromBase, setFromBase] = useState("decimal");
    const [toBase, setToBase] = useState("binary");
  //   const [result, setResult] = useState("");
  //   const [error, setError] = useState("");
const bases = {
  decimal: 10,
  binary: 2,
  octal: 8,
  hexadecimal: 16,
};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Number System Converter
        </h1>
        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 rounded-lg text-lg border border-gray-300 focus:ring-blue-400 focus:outline-none focus:ring-2"
          placeholder="Enter a number"
        />
      </div>
      <div className="flex items-center justify-center mt-4 space-x-3">
        <select
          value={fromBase}
          onChange={(e) => setFromBase(e.target.value)}
          className="p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          {Object.keys(bases).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
        <span>➡️</span> {/* Arrow indicating conversion */}
        <select
          value={toBase}
          onChange={(e) => setToBase(e.target.value)}
          className="p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          {Object.keys(bases).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>
      ;
    </div>
  );
};

export default Converter;
