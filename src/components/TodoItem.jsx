import React, { useEffect, useState } from "react";

function TodoItem({
  todo,
  startTodo,
  pauseTodo,
  stopTodo,
  toggleComplete,
  deleteTodo,
}) {
  const [borderColor, setBorderColor] = useState("");
  const handleButtonClick = () => {
    if (todo.started) {
      pauseTodo(todo.id);
    } else if (todo.paused) {
      startTodo(todo.id);
    } else {
      startTodo(todo.id);
    }
  };

  const handleStopClick = () => {
    stopTodo(todo.id);
  };

  useEffect(() => {
    if (todo.completed) {
      setBorderColor("border border-blue-600");
    } else if (todo.started) {
      setBorderColor("border border-green-600");
    } else if (todo.paused) {
      setBorderColor("border border-red-500");
    }
  }, [todo.started]);

  return (
    <div
      className={`flex items-center justify-between py-2 px-5 bg-gray-800 text-white rounded mb-2 relative mt-5 w-10/12 mx-auto ${borderColor}`}
    >
      <div className="flex items-center gap-5">
        <p className="text-sm">{todo.date}</p>
        <div className="flex gap-1">
          {todo.startTime && (
            <p>{new Date(todo.startTime).toLocaleTimeString()} - </p>
          )}
          {todo.endTime && <p>{new Date(todo.endTime).toLocaleTimeString()}</p>}
        </div>
        <p>{todo.task}</p>
        {todo.timeSpent !== null && <p>Time Spent: {todo.timeSpent}</p>}
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={handleButtonClick} className="p-1">
          {todo.completed ? (
            <img src="/done.png" alt="pause" className="w-6 h-6" />
          ) : todo.started ? (
            <img src="/pause.png" alt="pause" className="w-6 h-6" />
          ) : todo.paused ? (
            <img src="/start.png" alt="start" className="w-6 h-6" />
          ) : (
            <img src="/start.png" alt="start" className="w-6 h-6" />
          )}
        </button>
        {!todo.completed && todo.started && (
          <button onClick={handleStopClick} className="p-1">
            <img src="/stop.png" alt="stop" className="w-6 h-6" />
          </button>
        )}
        <div
          onClick={() => deleteTodo(todo.id)}
          className="absolute -right-[10px] -top-[10px] cursor-pointer"
        >
          <img src="/delete.png" alt="delete" />
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
