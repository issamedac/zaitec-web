import { useState } from "react";
import TodoList from "./components/TodoList";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4">
      {/* Contenedor principal centrado vertical y horizontalmente */}
      <div className="w-full max-w-6xl flex flex-col items-center space-y-16">

        {/* Hola Mundo - Centrado perfecto */}
        <div className="text-center w-full">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
            Hola Mundo
          </h1>
          <p className="text-xl text-gray-600">Proyecto de Prácticas WEB-ZAITEC</p>
        </div>

        {/* Contador - Centrado perfecto */}
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center hover:scale-105 transform transition duration-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Contador - Semana 1</h2>
          <p className="text-6xl font-mono mb-8 text-gray-800">{count}</p>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => setCount(count - 1)}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              -
            </button>
            <button
              onClick={() => setCount(count + 1)}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              +
            </button>
          </div>
        </div>

        {/* TodoList - Centrado forzado */}
        <div className="w-full flex justify-center">
          <TodoList />
        </div>

      </div>
    </div>
  );
}