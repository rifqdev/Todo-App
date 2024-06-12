// import React, { useState, useEffect } from 'react';
// import TodoForm from './components/TodoForm';
// import TodoList from './components/TodoList';
// import * as XLSX from 'xlsx';

// function App() {
//   const [todos, setTodos] = useState(() => {
//     const savedTodos = localStorage.getItem('todos');
//     return savedTodos ? JSON.parse(savedTodos) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('todos', JSON.stringify(todos));
//   }, [todos]);

//   const addTodo = (task) => {
//     const newTodo = {
//       id: Date.now(),
//       task,
//       completed: false,
//       started: false,
//       startTime: null,
//       endTime: null,
//       timeSpent: null,
//       date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
//     };
//     setTodos([...todos, newTodo]);
//   };

//   const startTodo = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, started: true, startTime: new Date() } : todo
//     ));
//   };

//   const stopTodo = (id) => {
//     setTodos(todos.map(todo => {
//       if (todo.id === id) {
//         const endTime = new Date();
//         const timeDiff = (endTime - new Date(todo.startTime)) / 1000; // in seconds
//         const hours = Math.floor(timeDiff / 3600);
//         const minutes = Math.floor((timeDiff % 3600) / 60);
//         const timeSpent = hours > 0
//           ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
//           : `${minutes}m`;
//         return { ...todo, started: false, completed: true, endTime, timeSpent };
//       }
//       return todo;
//     }));
//   };

//   const toggleComplete = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const formatDataForExport = (todos) => {
//     return todos.map(todo => ({
//       Date: todo.date,
//       Task: todo.task,
//       'Start Time': todo.startTime ? new Date(todo.startTime).toLocaleTimeString() : '',
//       'End Time': todo.endTime ? new Date(todo.endTime).toLocaleTimeString() : '',
//       'Time Spent': todo.timeSpent,
//       Completed: todo.completed ? 'Yes' : 'No'
//     }));
//   };

//   const exportToXlsx = () => {
//     const formattedData = formatDataForExport(todos);
//     const worksheet = XLSX.utils.json_to_sheet(formattedData);
//     const workbook = XLSX.utils.book_new();
//     // Set column widths
//     worksheet['!cols'] = [
//       { wch: 15 }, // Date column
//       { wch: 30 }, // Task column
//       { wch: 15 }, // Start Time column
//       { wch: 15 }, // End Time column
//       { wch: 15 }, // Time Spent column
//       { wch: 10 }  // Completed column
//     ];
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Todos');
//     XLSX.writeFile(workbook, 'todos.xlsx');
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4">
//       <h1 className="text-2xl mb-4 text-center">Daily TODO</h1>
//       <TodoForm addTodo={addTodo} />
//       <TodoList todos={todos} startTodo={startTodo} stopTodo={stopTodo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
//       <button onClick={exportToXlsx} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
//         Export to XLSX
//       </button>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import * as XLSX from "xlsx";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    const newTodo = {
      id: Date.now(),
      task,
      completed: false,
      started: false,
      paused: false,
      startTime: null,
      pauseTime: null,
      accumulatedTime: 0,
      endTime: null,
      timeSpent: null,
      date: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
    setTodos([...todos, newTodo]);
  };

  const startTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const currentTime = new Date();
          const accumulatedTime = todo.accumulatedTime || 0;
          return {
            ...todo,
            started: true,
            paused: false,
            startTime: currentTime,
            accumulatedTime,
          };
        }
        return todo;
      })
    );
  };

  const pauseTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const currentTime = new Date();
          const timeDiff = (currentTime - new Date(todo.startTime)) / 1000; // in seconds
          const accumulatedTime = todo.accumulatedTime + timeDiff;
          return {
            ...todo,
            started: false,
            paused: true,
            pauseTime: currentTime,
            accumulatedTime,
          };
        }
        return todo;
      })
    );
  };

  const stopTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const endTime = new Date();
          const timeDiff = (endTime - new Date(todo.startTime)) / 1000; // in seconds
          const accumulatedTime = todo.accumulatedTime + timeDiff;
          const hours = Math.floor(accumulatedTime / 3600);
          const minutes = Math.floor((accumulatedTime % 3600) / 60);
          const timeSpent =
            hours > 0
              ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
              : `${minutes}m`;
          return {
            ...todo,
            started: false,
            paused: false,
            completed: true,
            endTime,
            timeSpent,
            accumulatedTime,
          };
        }
        return todo;
      })
    );
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const formatDataForExport = (todos) => {
    return todos.map((todo) => ({
      Date: todo.date,
      Task: todo.task,
      "Start Time": todo.startTime
        ? new Date(todo.startTime).toLocaleTimeString()
        : "",
      "End Time": todo.endTime
        ? new Date(todo.endTime).toLocaleTimeString()
        : "",
      "Time Spent": todo.timeSpent,
      Completed: todo.completed ? "Yes" : "No",
    }));
  };

  const exportToXlsx = () => {
    const formattedData = formatDataForExport(todos);
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    // Set column widths
    worksheet["!cols"] = [
      { wch: 15 }, // Date column
      { wch: 30 }, // Task column
      { wch: 15 }, // Start Time column
      { wch: 15 }, // End Time column
      { wch: 15 }, // Time Spent column
      { wch: 10 }, // Completed column
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Todos");
    XLSX.writeFile(workbook, "todos.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl mb-4 text-center">Daily TODO</h1>
      <TodoForm addTodo={addTodo} exportToXlsx={exportToXlsx} />
      <TodoList
        todos={todos}
        startTodo={startTodo}
        pauseTodo={pauseTodo}
        stopTodo={stopTodo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
      <div className="flex justify-end">
        <button
          onClick={exportToXlsx}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Export to XLSX
        </button>
      </div>
    </div>
  );
}

export default App;
