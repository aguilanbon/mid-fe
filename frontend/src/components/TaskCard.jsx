export default function TaskCard({ title, description }) {
  return (
    <div className="w-full max-w-sm md:max-w-lg bg-white shadow-lg hover:shadow-xl p-4 rounded-md cursor-pointer">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="overflow-hidden line-clamp-2">{description}</p>
    </div>
  );
}
