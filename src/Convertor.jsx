import React, { useState, useEffect, useCallback } from "react";

const Converter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState("decimal");
  const [toBase, setToBase] = useState("binary");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const bases = {
    decimal: 10,
    binary: 2,
    octal: 8,
    hexadecimal: 16,
  };
  useEffect(() => {
    setError("");
    if (!inputValue.trim()) return;

    const regexPatterns = {
      decimal: /^[0-9]*$/,
      binary: /^[01]*$/,
      octal: /^[0-7]*$/,
      hexadecimal: /^[0-9a-fA-F]*$/,
    };

    if (!regexPatterns[fromBase].test(inputValue)) {
      setError("Invalid number for the selected base.");
    }
  }, [inputValue, fromBase]);
  const convertNumber = useCallback(() => {
    setError("");
    setResult("");

    if (!inputValue.trim()) {
      setError("Please enter a number.");
      return;
    }

    try {
      let decimalValue = parseInt(inputValue, bases[fromBase]);
      if (isNaN(decimalValue)) throw new Error("Invalid number format.");

      let convertedValue = decimalValue.toString(bases[toBase]).toUpperCase();
      setResult(convertedValue);
    } catch (error) {
      setError("Invalid input for the selected base.");
    }
  }, [inputValue, fromBase, toBase]);

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
          {/* Buttons */}
          <div className="flex flex-col items-center mt-6 space-y-3">
            <button
              onClick={convertNumber}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg"
            >
              Convert
            </button>

            <button
              onClick={() => {
                setInputValue("");
                setResult("");
                setError("");
              }}
              className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition text-lg"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
