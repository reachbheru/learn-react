import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length,setLength] = useState(8);
  const [numAllowed,setNumAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword]= useState();
  const passRef = useRef(null);

  const passGenerator = useCallback(()=>{
    let pass = "";
    let string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if(numAllowed) string += "0123456789";
    if(charAllowed) string += "!@#$%^&*(){}-";
    for(let i=1 ; i <= length; i++){
      const char = Math.floor(Math.random()*string.length);
      pass += string.charAt(char);
    }
    setPassword(pass);
  },[length,numAllowed,charAllowed,setPassword]);

  const copyClipboard = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passGenerator();
  },[length,numAllowed,charAllowed,passGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly 
        ref={passRef}
        />
        <button 
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copyClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numAllowed}
          id='numberInput'
          onChange={()=>{setNumAllowed((prev)=> !prev);}}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id='characterInput'
          onChange={()=>{setCharAllowed((prev)=> !prev);}} />
          <label htmlFor="characterInput">Character</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
