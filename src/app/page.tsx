import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <main className="text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Hello, This is under development.
        </h1>
        <p className="text-gray-400 text-sm">
          check out the full code:{" "}
          <a 
            href="https://github.com/yourusername/resume-master" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 underline underline-offset-4 transition-colors"
          >
            github
          </a>
        </p>
      </main>
    </div>
  );
}
