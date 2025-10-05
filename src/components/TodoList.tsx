import { useEffect, useState } from "react";
import type { FormEvent, ChangeEvent, JSX } from "react";

interface TodoItem {
  id: string;
  text: string;
}

const STORAGE_KEY = "zaitec_week2_todo_v1";

export default function TodoList(): JSX.Element {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  // Cargar tareas desde localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const savedItems = JSON.parse(raw) as TodoItem[];
        setItems(savedItems);
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    }
  }, []);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const newItem: TodoItem = { 
      id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
      text 
    };
    
    // Actualizar estado de forma inmediata
    const newItems = [newItem, ...items];
    setItems(newItems);
    setInput("");
    
    // Guardar en localStorage después de actualizar el estado
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  };

  const handleDelete = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const filteredItems = items.filter(item =>
    item.text.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Lista de Tareas - Semana 2
      </h2>

      {/* Filtro */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="🔍 Filtrar tareas..."
          className="w-full max-w-md border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Formulario */}
      <form onSubmit={handleAdd} className="flex gap-3 mb-8 justify-center">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="✏️ Escribe una nueva tarea..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 max-w-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Añadir
        </button>
      </form>

      {/* TABLA - Versión corregida que SÍ se ve */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50">
            <p className="text-gray-500 text-lg">No hay tareas todavía</p>
            <p className="text-gray-400 text-sm mt-2">Añade tu primera tarea arriba</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                  Tarea
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-lg text-gray-800">
                    {item.text}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium text-lg"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}