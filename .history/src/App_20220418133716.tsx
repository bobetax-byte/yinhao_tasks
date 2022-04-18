import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import SearchQQ from './SearchQQ'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SearchQQ></SearchQQ>
    </div>
  )
}

export default App
