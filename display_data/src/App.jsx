import { useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import DisplayData from './components/DisplayData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DisplayData></DisplayData>
    </>
  )
}

export default App
