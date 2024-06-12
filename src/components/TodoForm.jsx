import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTodo(task);
    setTask("");
  };

  return (
    <div className="w-7/12 mx-auto my-10 ">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="bg-[#16161A] focus:outline-none ring-1 focus:ring-1 focus:ring-[#7F5AF0] p-2 w-11/12"
          placeholder="Todo..."
        />
        <button
          type="submit"
          className="bg-[#7F5AF0] text-white p-2 rounded ml-2"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
