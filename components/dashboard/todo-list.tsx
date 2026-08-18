"use client";

import { useId, useState, type FormEvent } from "react";
import { Panel } from "@/components/dashboard/panels";
import { TODOS, type Todo } from "@/lib/dashboard-data";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(TODOS);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const inputId = useId();

  function toggle(id: string) {
    setTodos((list) =>
      list.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }

  function remove(id: string) {
    setTodos((list) => list.filter((todo) => todo.id !== id));
  }

  function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const label = draft.trim();
    if (!label) return;
    setTodos((list) => [...list, { id: `${Date.now()}`, label, done: false }]);
    setDraft("");
    setAdding(false);
  }

  return (
    <Panel className="flex h-full flex-col">
      <h2 className="mb-5 text-h4 font-bold text-ink">To do List</h2>

      <ul className="flex flex-col gap-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`animate-rise flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors duration-200 ${
              todo.done ? "border-[#c7c7f5] bg-[#f6f6ff]" : "border-line bg-white"
            }`}
          >
            <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
              <span className="relative inline-flex h-[19px] w-[19px] shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggle(todo.id)}
                  className="peer h-[19px] w-[19px] cursor-pointer appearance-none rounded-[4px] border-2 border-ink transition-colors duration-200 checked:border-[#5b5bd6] checked:bg-[#5b5bd6]"
                />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="pointer-events-none absolute h-3 w-3 scale-50 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span
                className={`truncate text-small ${ todo.done ? "text-[#5b5bd6] line-through" : "text-ink" }`}
              >
                {todo.label}
              </span>
            </label>

            <button
              type="button"
              onClick={() => remove(todo.id)}
              aria-label={`Remove "${todo.label}"`}
              className="shrink-0 rounded p-1 text-muted transition-colors duration-200 hover:text-red-500"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex justify-end">
        {adding ? (
          <form onSubmit={add} className="animate-rise flex w-full gap-2">
            <label htmlFor={inputId} className="sr-only">
              New task
            </label>
            <input
              id={inputId}
              value={draft}
              autoFocus
              onChange={(event) => setDraft(event.target.value)}
              onBlur={() => !draft && setAdding(false)}
              placeholder="What needs doing?"
              className="h-11 flex-1 rounded-xl border border-line px-4 text-small text-ink outline-none transition-colors duration-200 focus:border-sky"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-xl bg-sky px-4 text-small font-medium text-white transition-colors duration-200 hover:bg-sky-hover"
            >
              Add
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="group flex items-center gap-2.5 text-small text-body transition-colors duration-200 hover:text-[#5b5bd6]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5b5bd6] text-white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            Add new task
          </button>
        )}
      </div>
    </Panel>
  );
}
