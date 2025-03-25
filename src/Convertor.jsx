import React, { useState, useCallback, useEffect } from "react";

const Converter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState("decimal");
  const [toBase, setToBase] = useState("binary");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  return <div>Number System Converter</div>;
};

export default Converter;
