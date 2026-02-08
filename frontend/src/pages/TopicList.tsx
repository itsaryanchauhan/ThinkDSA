import { useNavigate } from "react-router-dom";

export default function TopicList() {
  const navigate = useNavigate();

  const topics = [
    { id: "arrays", name: "Arrays" },
    { id: "recursion", name: "Recursion" },
    { id: "dp", name: "Dynamic Programming" },
    { id: "graphs", name: "Graphs" }
  ];

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">DSA Topics</h1>

      {topics.map((topic) => (
        <div
          key={topic.id}
          className="p-4 border rounded mb-3 cursor-pointer hover:bg-gray-900"
          onClick={() => navigate(`/topic/${topic.id}`)}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
}
