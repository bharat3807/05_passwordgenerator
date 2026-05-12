import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'



function App(){
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password,setPassword] = useState("")
// ref hook
const passwordRef = useRef(null)
  const paswordGenerator = useCallback(() => {
    let pass = ""
    let str = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
 if (numberAllowed) str += "0123456789"
 if (charAllowed) str += "!@#$%^&*Z()+={}[]',-_;:`.~"

 for (let i = 1;  i <= length; i++) {
  let char = Math.floor(Math.random() * str.length + 1)
   pass += str.charAt(char)
  
 }
 setPassword(pass)
  }, [length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToclipboard =  useCallback(() => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  }, [Password])
useEffect(() => {paswordGenerator()}, [length, numberAllowed, charAllowed, paswordGenerator])
  
  return(
    <>
 <div className="w-full h-screen bg-yellow-500 flex justify-center items-start pt-20">
  <div className="w-full max-w-md bg-gray-500 rounded-xl p-6">

    <h1 className="text-3xl text-red-900 font-bold text-center text- mb-4">
      Password Generator
    </h1>

    <div className="flex items-center gap-2">
<input
      type='text'
      value = {Password }
      className="flex-1 px-4 py-2 rounded-md bg-white text-black outline-none"
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
    
        
     

      <button 
      onClick={copyPasswordToclipboard}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
        Copy
      </button>

    </div>
<div className='flex text-sm gap-x-2'>
  <div className='flex text-white items-center gap-x-1'>
    <input type="range" 
    min = {6}
    max={20}
    value={length}
    className='cursor-pointer'
    onChange={(e) => {setLength(e.target.value)}} 
    />
    <label>Length: {length}</label>
  </div>
<div className='flex text-white text-sm gap-x-2'>
  <input type="checkbox" 
    defaultChecked = {numberAllowed}
    id="numberinput"
   
    
    onChange={() => {setNumberAllowed((prev) => !prev)}} 
    />
    <label htmlFor='numberInput'>Numbers</label>
</div>
<div className='flex text-white text-sm gap-x-2'>
  <input type="checkbox" 
    defaultChecked = {charAllowed}
    id="characterinput"
   
    
    onChange={() => {setCharAllowed((prev) => !prev)}} 
    />
    <label htmlFor='characterInput'>Character</label>
</div>
</div>
  </div>
</div>
    </>
  )
}
export default App
