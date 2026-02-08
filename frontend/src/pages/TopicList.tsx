import React from "react";

const topics = [
  "Arrays",
  "Recursion",
  "Linked List",
  "Stack",
  "Queue",
  "Trees",
  "Graphs",
];

export default function TopicList() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">DSA Topics</h1>

      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic}
            className="p-3 border rounded cursor-pointer hover:bg-gray-100"
          >
            {topic}
          </div>
        ))}
      </div>
    </div>
  );
}
