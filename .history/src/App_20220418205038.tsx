import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import 'uno.css'
import SearchQQ from './components/SearchQQ/SearchQQ'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SearchQQ></SearchQQ>
    </div>
  )
}

export default App
