import { Link } from "react-router-dom";

export default function TaskCard({ id, title, description }) {
  return (
    <Link to={`/edit/${id}`}>
      <div className="w-full bg-white shadow-lg hover:shadow-xl p-4 rounded-md">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="overflow-hidden line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
