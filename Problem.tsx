import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Problem() {

  const [problem,setProblem] = useState([]); // ✅ Use State for Problems
  const navigate = useNavigate()

  
  useEffect(()=>{
    const fetchProblems = async () => {
      const res = await fetch("http://localhost:5000/problems")
      const data = await res.json()
      setProblem(data)
    }

    fetchProblems()
  },[])

 



  return (
    <div className="bg-black">
      <div>
        <h2>LeetCode Problems</h2>
        {problem.map((problem) => (
          <div key={problem._id} className="problem_box" onClick={()=> {navigate(`/${problem._id}`)}}>
            <h3>{problem.title} - {problem.difficulty}</h3>
            <p>{problem.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Problem;
