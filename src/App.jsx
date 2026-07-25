import { useState } from 'react'

import News from './components/News'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>test</div>
      <News />
    </>
  )
}

export default App
