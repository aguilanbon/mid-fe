export default function LoadingIndicator() {
  return (
    <div className="w-full flex flex-col items-center justify-start py-8">
      <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}
