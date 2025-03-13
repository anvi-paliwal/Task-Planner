import React, { useRef, useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [showCompleted, setShowCompleted] = useState(true);
  const inputRef = useRef();

  const handleSave = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return null;
    const newTodo = {
      id: Date.now(),
      task: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };
  const handleEdit = (e, id) => {
    console.log(id);
    let t = todoList.filter((todo) => todo.id === id);
    inputRef.current.value = t[0].task;
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };
  const handleDelete = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };
  const handleCheckBox = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };
  const toggleCompleted = (e) => {
    setShowCompleted(!showCompleted);
  };
  const handleTaskUp = (id) => {
    let index = todoList.findIndex((todo) => {
      return todo.id === id;
    });
    if (index > 0) {
      const updatedTasks = [...todoList];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTodoList(updatedTasks);
    }
  };
  const handleTaskDown = (id) => {
    let index = todoList.findIndex((todo) => {
      return todo.id === id;
    });
    if (index < todoList.length - 1) {
      const updatedTasks = [...todoList];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTodoList(updatedTasks);
    }
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <div className=" mx-6">
      <h3 className="text-center text-xl  py-8 text-black font-bold">
        Manage your Task here
      </h3>
      <div className="flex items-center justify-around gap-2">
        <input
          ref={inputRef}
          className="text-slate-700 p-5 outline-none rounded-md border w-4/5 h-8 pl-6 pr-2 placeholder:text-slate-500"
          type="text"
          placeholder="Add Task"
        />
        <button
          onClick={handleSave}
          className="bg-purple-500 hover:bg-purple-800  border-none w-1/5 h-10 text-lg font-medium cursor-pointer text-white rounded-md"
        >
          Save
        </button>
      </div>

      <div className="todos  my-2 py-4">
        <p>
          <input
            onChange={toggleCompleted}
            type="checkbox"
            checked={showCompleted}
            id="show"
          />
          &nbsp;
          <label htmlFor="show">Show Completed</label>
        </p>

        <h2 className="text-lg my-4 font-bold">Your Tasks</h2>
        {todoList.length === 0 && (
          <div className="m-5">No Tasks are pending!</div>
        )}
        {todoList.map((todo) => {
          return (
            (showCompleted || !todo.isComplete) && (
              <TodoItem
                key={todo.id}
                task={todo.task}
                id={todo.id}
                isComplete={todo.isComplete}
                handleDelete={handleDelete}
                handleCheckBox={handleCheckBox}
                handleEdit={handleEdit}
                handleTaskUp={handleTaskUp}
                handleTaskDown={handleTaskDown}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
