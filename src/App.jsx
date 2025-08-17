import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length , setLength] = useState(8);
  const [number , setNumber] = useState(false);
  const [specialChar , setSpecialchar] = useState(false);
  const [password , setPassword] = useState("");

  // useRef
  const passRef = useRef(null); // the useRef is gewnrally use to Provide a reference to particular element


  // const passwordGenrator = useCallback(fn , dependencies) use callback is use to cache the function with the dependencies [meaning --> when UI or any other kind of block of code is dependent on the change of some variable is handle by the callback hook]


  const passwordGenrator = useCallback(function (e){
    let pass = ""; // the pass is use to create or store the random text(password) and the it update through a setPassword();
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz"; // it contains the whole alphabetic values
    
    if(number) str+="1234567890"; // if the number is checked
    if(specialChar) str+="~!@#$%^&*()_+{}?" // if the special character is checked

    for (let i = 0; i < length; i++) {
      console.log(length);
      
      let random = Math.floor(Math.random() * str.length + 1); // create a randomness
      pass += str.charAt(random) // append the string in the basis of the random number (note--> charAt is to take number in a index value which we provide)
      
    }

    setPassword(pass); // use to update the password
  }  , [length , number  , specialChar , setPassword]) // the dependencies of useCallback is use to commit a optimization on the dependencies present over a array whenever dependencies commit change

  const copyClipBoard = useCallback(() =>{
    passRef.current?.select() // select is use to select the textarea of a object under the refrence
    window.navigator.clipboard.writeText(password)
  } , [password])

  // Problem is we cant call the function inside this fucntion according to rule of JSX
  // so we use a hook of useEffect , useEffect is synchronize the depndency changes through A re renders
  // means the useEffect is responsible to re-render the page whenever the some kind of change occurs
  useEffect(function(){
    passwordGenrator()
  } , [number , length , specialChar , passwordGenrator]) // the dependencies of useeffect is use to commit a re-render whenever dependencies change

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          Password Generator
        </h1>

        {/* Input + Button */}
        <div className="flex gap-2 mb-6">
          <input
            value={password}
            readOnly
            type="text"
            ref={passRef}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
          onClick={copyClipBoard}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
            Copy
          </button>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          {/* Length Slider */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Length: <span className="font-bold">{length}</span>
            </label>
            <input
              min={6}
              max={32}
              value={length}
              type="range"
              className="w-full accent-indigo-600"
              onChange={(e)=> setLength(e.target.value)}
            />
          </div>

          {/* Options */}
          <div className="flex items-center gap-2">
            <input 
            id="numbers" 
            type="checkbox" 
            className="accent-indigo-600" 
            defaultChecked = {number}
            onChange={()=> setNumber((prev)=>!prev)}
            />
            <label htmlFor="numbers" className="text-gray-700">Include Numbers</label>
          </div>

          <div className="flex items-center gap-2">
            <input
             id="characters"
             type="checkbox"
             className="accent-indigo-600"
            onChange={()=> setSpecialchar((prev)=>!prev)}
             
             />
            <label htmlFor="characters" className="text-gray-700">Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
