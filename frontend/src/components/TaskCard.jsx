export default function TaskCard({ title, description }) {
  return (
    <div className="w-96 h-32 bg-white shadow-lg hover:shadow-xl p-4 rounded-md cursor-pointer">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="overflow-hidden line-clamp-2">{description}</p>
    </div>
  );
}
