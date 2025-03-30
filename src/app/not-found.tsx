import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full px-16 md:px-0 h-screen flex items-center justify-center">
      <div className="text-[#f7adee] flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-md">
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider  mb-4">
          Whoops! Page not found
        </p>

        <Link
          href="/"
          className="px-6 py-3 bg-[#440829] text-lg md:text-xl font-semibold rounded-lg shadow-md hover:bg-[#440829dc] transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
