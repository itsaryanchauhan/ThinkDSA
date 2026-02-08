import React from "react";

export default function ProblemList() {
  const problems = [
    "Problem 1",
    "Problem 2",
    "Problem 3",
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Problems</h1>

      {problems.map((p, i) => (
        <div key={i} className="p-3 border mb-2 rounded">
          {p}
        </div>
      ))}
    </div>
  );
}
