import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg">La página que buscas no existe.</p>
      <Link
        href="/"
        className="mt-6 text-blue-600 underline hover:text-blue-800"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
