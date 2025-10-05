import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";

interface TodoItem {
  id: string;
  text: string;
}

const STORAGE_KEY = "zaitec_week2_todo_v1";

export default function TodoList(): JSX.Element {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as TodoItem[]);
    } catch (err) {
      console.error("Error leyendo localStorage:", err);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Error guardando localStorage:", err);
    }
  }, [items]);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const newItem: TodoItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
    };
    setItems((prev) => [...prev, newItem]);
    setInput("");
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  return (
    <section className="max-w-md mx-auto mt-10 p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Lista de tareas</h2>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Escribe algo..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Añadir
        </button>
      </form>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No hay elementos todavía</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border rounded px-3 py-2"
            >
              <span>{item.text}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
