import { useState } from "react";

function App() {
  // Estado del contador
  const [count, setCount] = useState<number>(0);

  // Función para incrementar
  const increment = () => setCount((prev) => prev + 1);

  // Función para decrementar (no permite negativos)
  const decrement = () =>
    setCount((prev) => (prev > 0 ? prev - 1 : prev));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Hola Zaitec 🚀</h1>
      <p className="text-lg mb-4">Contador de la semana 1 — proyecto base</p>

      <div className="flex items-center space-x-4">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          −
        </button>
        <span className="text-2xl font-semibold">{count}</span>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          +
        </button>
      </div>

      {count === 0 && (
        <p className="mt-4 text-gray-500">No hay elementos todavía</p>
      )}
    </div>
  );
}

export default App;
