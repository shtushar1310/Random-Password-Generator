import React, { useEffect, useState } from "react";
import { useCallback } from "react";

const App = () => {
   const [Length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const PasswordGenerator= useCallback(
     () => {
      let base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

     //add more character sets based on user choices
    const numbers = "1234567890";
    const symbols = "@#$%^&*()/!*+>?:;";

    if (number) base += numbers;
    if (character) base += symbols;

    let genPass ="";

    for (let i = 0; i < Length; i++) {
      // pick a random index
      const randomIndex = Math.floor(Math.random() * base.length);
      // get the character at that position
      genPass += base[randomIndex];
    }

   setPassword(genPass); // ✅ update React state properly
    console.log("Generated Password:", genPass);
    },
    [Length,character,number],
   )

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

 
  
useEffect(() => {
  PasswordGenerator()

  
}, [Length,character,number])



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <h1 className="text-4xl font-bold text-white text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
            Password Generator
          </h1>
          
          <div className="mb-8 flex gap-3">
            <input
              type="text"
              readOnly
              value={password}
              className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-5 py-4 text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder:text-white/50"
            />
            <button 
              onClick={copyToClipboard}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-4 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <label className="flex items-center justify-between mb-4">
                <span className="text-white text-lg font-semibold flex items-center gap-3">
                  <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Length
                </span>
                <span className="text-2xl font-bold text-purple-300 bg-purple-900/50 px-4 py-2 rounded-lg">
                  {Length}
                </span>
              </label>
              <input
                type="range"
                min={8}
                max={100}
                value={Length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full h-3 bg-purple-900/50 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:bg-white/20 hover:border-purple-400 group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="checkbox"
                      onClick={() => setNumber((num) => !num)}
                      className="w-6 h-6 rounded border-2 border-purple-300 accent-purple-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors">
                      Include Numbers
                    </div>
                    <div className="text-white/60 text-sm">0-9</div>
                  </div>
                </div>
              </label>

              <label className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:bg-white/20 hover:border-purple-400 group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="checkbox"
                      onClick={() => setCharacter((prev) => !prev)}
                      className="w-6 h-6 rounded border-2 border-purple-300 accent-purple-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors">
                      Include Symbols
                    </div>
                    <div className="text-white/60 text-sm">@#$%^&*</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
