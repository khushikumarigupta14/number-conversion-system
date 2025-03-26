import React, { useState, useCallback } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";

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

  const baseValidation = {
    binary: /^[01]+$/,
    octal: /^[0-7]+$/,
    decimal: /^[0-9]+$/,
    hexadecimal: /^[0-9A-Fa-f]+$/,
  };

  const examples = {
    binary: "Example: 1010 (Binary for 10)",
    octal: "Example: 12 (Octal for 10)",
    decimal: "Example: 10 (Standard decimal format)",
    hexadecimal: "Example: A (Hexadecimal for 10)",
  };

  const validateInput = (value, base) => {
    if (!value.trim()) {
      throw new Error("⚠️ Please enter a number.");
    }

    if (!baseValidation[base].test(value)) {
      throw new Error(`❌ Invalid input for ${base}. ${examples[base]}`);
    }
  };

  const convertNumber = useCallback(() => {
    setError("");
    setResult("");

    try {
      validateInput(inputValue, fromBase);

      let decimalValue = parseInt(inputValue, bases[fromBase]);
      let convertedValue = decimalValue.toString(bases[toBase]).toUpperCase();

      setResult(convertedValue);
    } catch (error) {
      setError(error.message);
    }
  }, [inputValue, fromBase, toBase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4 sm:p-6">
      <div className="bg-gray-100 shadow-xl rounded-2xl p-6 sm:p-8 max-w-lg w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          🔢 Number System Converter
        </h1>

        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 border-none rounded-lg text-lg bg-gray-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter a number..."
          aria-label="Enter number"
        />

        {/* Base Selection */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-5 space-y-3 sm:space-y-0 sm:space-x-4">
          <select
            value={fromBase}
            onChange={(e) => setFromBase(e.target.value)}
            className="p-3 bg-gray-100 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
            aria-label="Select source base"
          >
            {Object.keys(bases).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>

          <ArrowRight size={28} className="text-gray-600 mx-2" />

          <select
            value={toBase}
            onChange={(e) => setToBase(e.target.value)}
            className="p-3 bg-gray-100 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
            aria-label="Select target base"
          >
            {Object.keys(bases).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={convertNumber}
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Convert
          </button>

          <button
            onClick={() => {
              setInputValue("");
              setResult("");
              setError("");
            }}
            className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-300 flex items-center justify-center"
          >
            <RefreshCw size={22} className="mr-2" />
            Reset
          </button>
        </div>

        {/* Result & Error Message */}
        {error && (
          <p className="mt-4 text-red-600 text-center font-semibold bg-red-100 p-2 rounded-lg shadow-md">
            {error}
          </p>
        )}

        {result && (
          <p className="mt-4 text-lg text-center font-semibold text-green-600 bg-green-100 p-3 rounded-lg shadow-md">
            ✅ Converted Value: {result}
          </p>
        )}
      </div>
    </div>
  );
};

export default Converter;
