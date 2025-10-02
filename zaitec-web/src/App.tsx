import React, { useState } from "react";

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Hola Zaitec 🚀</h1>
        <p className="text-sm text-gray-600 mb-6">
          Contador de la semana 1 — proyecto base (React + TypeScript + Tailwind).
        </p>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            −
          </button>

          <div className="text-xl font-medium">{count}</div>

          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            +
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
