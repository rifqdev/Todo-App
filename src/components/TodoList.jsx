import React from "react";
import TodoItem from "./TodoItem";

function TodoList({
  todos,
  startTodo,
  pauseTodo,
  stopTodo,
  toggleComplete,
  deleteTodo,
}) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          startTodo={startTodo}
          pauseTodo={pauseTodo}
          stopTodo={stopTodo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
