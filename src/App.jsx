import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  const [length,setLength] = useState(8);
  const [copy,setCopy] = useState(false);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [char,setChar] = useState(false);
  const [password,setPassword] = useState("");

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(numberAllowed) str+= '0123456789';
    if(char) str+= '~`!@#$%^&*_+{]}]'
    for (let i = 1; i < length; i++) {
      let chars = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(chars);
    }
    setPassword(pass);
  },[length,numberAllowed,char,setPassword])

  const copyPassToClibboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
    setCopy(prev =>!prev)

  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,char,passwordGenerator])

  useEffect(()=>{
    setCopy(false)
  },[password])

  return (
    <>
    <div className=' grid place-content-center w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-40 text-orange-500 bg-gray-700'>
    <h1 className='text-center text-xl font-mono text-white my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text" 
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      ref={passwordRef}
      readOnly
      />
      <button 
      onClick={copyPassToClibboard} 
      className='bg-orange-600 outline-none text-white px-3 py-0.5 shrink-0 peer-hover hover:bg-orange-500'
      >
      {
        (copy)?'copied':'copy'
      }
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={6} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}} className='cursor-pointer' />
        <label>Length: {length} </label>
      </div>
      <div className='flex item-center gap-x-1'>
        <input 
        type="checkbox" 
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={()=>{
          setNumberAllowed(prev => !prev)
        }}
        />
        <label>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox" 
        defaultChecked={char}
        id='charInput'
        onChange={()=>{
          setChar(prev => !prev)
        }}
        />
        <label>Characters</label>
      </div>
      </div>
    </div>
     </>
  )
}

export default App
