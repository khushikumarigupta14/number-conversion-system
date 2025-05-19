import React, { useState, useCallback } from "react";
import { ArrowRight, RefreshCw, Plus, Minus, X, Divide } from "lucide-react";

const Converter = () => {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [operation, setOperation] = useState("none");
  const [fromBase, setFromBase] = useState("decimal");
  const [toBase, setToBase] = useState("binary");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("converter");

  const bases = {
    decimal: { name: "Decimal", radix: 10 },
    binary: { name: "Binary", radix: 2 },
    octal: { name: "Octal", radix: 8 },
    hexadecimal: { name: "Hexadecimal", radix: 16 },
  };

  const baseValidation = {
    binary: /^[01]+(\.[01]+)?$/,
    octal: /^[0-7]+(\.[0-7]+)?$/,
    decimal: /^[0-9]+(\.[0-9]+)?$/,
    hexadecimal: /^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/,
  };

  const examples = {
    binary: "Example: 1010.101 (Binary for 10.625)",
    octal: "Example: 12.4 (Octal for 10.5)",
    decimal: "Example: 10.5 (Standard decimal format)",
    hexadecimal: "Example: A.8 (Hexadecimal for 10.5)",
  };

  const validateInput = (value, baseType) => {
    if (!value.trim()) {
      throw new Error("⚠️ Please enter a number.");
    }

    if (!baseValidation[baseType].test(value)) {
      throw new Error(
        `❌ Invalid input for ${bases[baseType].name}. ${examples[baseType]}`
      );
    }
  };

  const parseNumber = (value, fromBase) => {
    if (fromBase === "decimal") {
      return parseFloat(value);
    }

    // Split into integer and fractional parts
    const parts = value.split(".");
    let integerPart = parts[0] || "0";
    let fractionalPart = parts[1] || "0";

    // Convert integer part
    const integerValue = parseInt(integerPart, bases[fromBase].radix);

    // Convert fractional part
    let fractionalValue = 0;
    for (let i = 0; i < fractionalPart.length; i++) {
      const digit = parseInt(fractionalPart[i], bases[fromBase].radix);
      fractionalValue += digit / Math.pow(bases[fromBase].radix, i + 1);
    }

    return integerValue + fractionalValue;
  };

  const convertToBase = (decimalValue, toBase) => {
    if (toBase === "decimal") {
      return decimalValue.toString();
    }

    const radix = bases[toBase].radix;

    // Handle integer part
    let integerPart = Math.floor(Math.abs(decimalValue));
    let integerResult = integerPart.toString(radix).toUpperCase();

    // Handle fractional part
    let fractionalPart = Math.abs(decimalValue) - integerPart;
    let fractionalResult = "";
    const precision = 10; // Maximum digits after decimal point

    for (let i = 0; i < precision && fractionalPart > 0; i++) {
      fractionalPart *= radix;
      const digit = Math.floor(fractionalPart);
      fractionalResult += digit.toString(radix).toUpperCase();
      fractionalPart -= digit;
    }

    // Handle negative numbers
    const sign = decimalValue < 0 ? "-" : "";

    return fractionalResult
      ? `${sign}${integerResult}.${fractionalResult}`
      : `${sign}${integerResult}`;
  };

  const performConversion = useCallback(() => {
    setError("");
    setResult("");

    try {
      validateInput(inputValue1, fromBase);
      const decimalValue = parseNumber(inputValue1, fromBase);
      const convertedValue = convertToBase(decimalValue, toBase);
      setResult(convertedValue);
    } catch (error) {
      setError(error.message);
    }
  }, [inputValue1, fromBase, toBase]);

  const performCalculation = useCallback(() => {
    setError("");
    setResult("");

    try {
      if (operation === "none") {
        throw new Error("Please select an operation");
      }

      validateInput(inputValue1, fromBase);
      validateInput(inputValue2, fromBase);

      const num1 = parseNumber(inputValue1, fromBase);
      const num2 = parseNumber(inputValue2, fromBase);

      let calculatedValue;
      switch (operation) {
        case "add":
          calculatedValue = num1 + num2;
          break;
        case "subtract":
          calculatedValue = num1 - num2;
          break;
        case "multiply":
          calculatedValue = num1 * num2;
          break;
        case "divide":
          if (num2 === 0) throw new Error("Division by zero is not allowed");
          calculatedValue = num1 / num2;
          break;
        default:
          throw new Error("Invalid operation");
      }

      const resultInBase = convertToBase(calculatedValue, fromBase);
      setResult(resultInBase);
    } catch (error) {
      setError(error.message);
    }
  }, [inputValue1, inputValue2, operation, fromBase]);

  const resetCalculator = () => {
    setInputValue1("");
    setInputValue2("");
    setOperation("none");
    setResult("");
    setError("");
  };

  const OperationButton = ({ op, icon: Icon }) => (
    <button
      onClick={() => setOperation(op)}
      className={`p-2 rounded-lg flex items-center justify-center ${
        operation === op
          ? "bg-blue-500 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
      aria-label={op}
    >
      <Icon size={20} />
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 max-w-lg w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          🔢 Number System Calculator & Converter
        </h1>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("converter")}
            className={`py-2 px-4 font-medium ${
              activeTab === "converter"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Converter
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`py-2 px-4 font-medium ${
              activeTab === "calculator"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Calculator
          </button>
        </div>

        {activeTab === "converter" ? (
          <>
            {/* Converter UI */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From:
              </label>
              <select
                value={fromBase}
                onChange={(e) => setFromBase(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                aria-label="Select source number base"
              >
                {Object.keys(bases).map((key) => (
                  <option key={key} value={key}>
                    {bases[key].name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">{examples[fromBase]}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To:
              </label>
              <select
                value={toBase}
                onChange={(e) => setToBase(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                aria-label="Select target number base"
              >
                {Object.keys(bases).map((key) => (
                  <option key={key} value={key}>
                    {bases[key].name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Number ({bases[fromBase].name}):
              </label>
              <input
                type="text"
                value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder={`Enter ${bases[fromBase].name} number...`}
                aria-label="Enter number"
              />
            </div>
          </>
        ) : (
          <>
            {/* Calculator UI */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number System:
              </label>
              <select
                value={fromBase}
                onChange={(e) => setFromBase(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                aria-label="Select number base"
              >
                {Object.keys(bases).map((key) => (
                  <option key={key} value={key}>
                    {bases[key].name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">{examples[fromBase]}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Number:
              </label>
              <input
                type="text"
                value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder={`Enter ${bases[fromBase].name} number...`}
                aria-label="Enter first number"
              />
            </div>

            <div className="flex justify-center space-x-2 my-4">
              <OperationButton op="add" icon={Plus} />
              <OperationButton op="subtract" icon={Minus} />
              <OperationButton op="multiply" icon={X} />
              <OperationButton op="divide" icon={Divide} />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second Number:
              </label>
              <input
                type="text"
                value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder={`Enter ${bases[fromBase].name} number...`}
                aria-label="Enter second number"
              />
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={
              activeTab === "converter" ? performConversion : performCalculation
            }
            className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {activeTab === "converter" ? "Convert" : "Calculate"}
          </button>

          <button
            onClick={resetCalculator}
            className="w-full sm:w-auto px-6 py-3 bg-gray-400 text-white text-lg font-medium rounded-lg hover:bg-gray-500 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <RefreshCw size={20} className="mr-2" />
            Reset
          </button>
        </div>

        {/* Result & Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">Result:</p>
            <p className="text-2xl font-bold text-green-600 break-all">
              {result}
            </p>
            {activeTab === "converter" && (
              <p className="mt-2 text-sm text-gray-500">
                {bases[fromBase].name} to {bases[toBase].name} conversion
              </p>
            )}
            {activeTab === "calculator" && (
              <p className="mt-2 text-sm text-gray-500">
                {operation === "add" &&
                  `${inputValue1} + ${inputValue2} = ${result}`}
                {operation === "subtract" &&
                  `${inputValue1} - ${inputValue2} = ${result}`}
                {operation === "multiply" &&
                  `${inputValue1} × ${inputValue2} = ${result}`}
                {operation === "divide" &&
                  `${inputValue1} ÷ ${inputValue2} = ${result}`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Converter;
