import { Route, Routes } from "react-router-dom"
import Problem from "./problem"
import Sproblem from "./Sproblem"

function App() {
  return (
    <div>
      <Routes>
         <Route path="/" element={<Problem />} />
         <Route path="/:id" element ={<Sproblem />}/>
      </Routes>
    </div>
  )
}

export default App
