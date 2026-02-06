import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  //ref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*(){}[]=+-_~`";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, character, number, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [number, character, passwordGenerator]);

  return (
    <>
      <div className="w-full h-200 pt-8" style={{ backgroundColor: "black" }}>
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 ] bg-gray-800 text-orange-500">
          <h1 className="text-white text-center my-3">Password generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 text-gray-600"
              placeholder="password"
              readOnly
              ref={passwordRef}
            ></input>
            <button
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
              onClick={copyPasswordToClipboard}
            >
              copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                className="cursor-pointer"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <label htmlFor="">Number</label>
              <input
                type="checkbox"
                value={number}
                onClick={(e) => setNumber((prev) => !prev)}
              />
            </div>
            <div className="flex items-center gap-x-1">
              <label htmlFor="">Character</label>
              <input
                type="checkbox"
                value={character}
                onClick={(e) => setCharacter((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
