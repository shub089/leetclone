import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Sproblem() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [ans, setAns] = useState<boolean | null>(null);

  const runCode = async () => {
    try {
      const res = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });

      if (!res.ok) throw new Error("Failed to submit code");

      const data = await res.json();
      setOutput(data.output);
      
      // ✅ Ensure problem exists before checking test case
      setAns(problem.testCases[0].output == data.output);
    } catch (error) {
      console.error("Error running code:", error);
    }
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/${id}`);
        if (!res.ok) throw new Error("Failed to fetch problem");
        const data = await res.json();
        setProblem(data);
      } catch (error) {
        console.error("❌ Error fetching problem:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!problem) return <p>Problem not found</p>;

  return (
    <div>
      {/* Title & Difficulty */}
      <div>
        <h2>{problem.title}</h2>
        <span>{problem.difficulty}</span>
      </div>

      {/* Description */}
      <p>{problem.description}</p>

      {/* Example Test Cases */}
      <div>
        <h3>Example Test Cases</h3>
        {problem.testCases.map((test, index) => (
          <div key={index}>
            <p>
              <strong>Input:</strong> {test.input}
            </p>
            <p>
              <strong>Expected Output:</strong> {test.output}
            </p>
          </div>
        ))}
      </div>

      {/* Code Input & Submission */}
      <div>
        <textarea onChange={(e) => setValue(e.target.value)} /> <br />
        <button onClick={runCode}>Submit</button>
        <p><strong>Your Answer:</strong> {output}</p>
        <p><strong>Result:</strong> {ans === true ? "✅ Correct" : ans === false ? "❌ Incorrect" : "Not Submitted"}</p>
      </div> 
    </div>
  );
}

export default Sproblem;
