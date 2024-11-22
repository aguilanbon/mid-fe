import Header from "./Header";
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}