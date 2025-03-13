import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaHandPointUp, FaHandPointDown } from "react-icons/fa";

let btnClass =
  "bg-purple-500 hover:bg-purple-800 text-sm cursor-pointer p-2 border-none text-white mx-1 rounded";
const TodoItem = ({
  task,
  id,
  isComplete,
  handleDelete,
  handleCheckBox,
  handleEdit,
  handleTaskUp,
  handleTaskDown,
}) => {
  return (
    <div className="todo bg-white-400 flex sm:w-full justify-between my-3 gap-3">
      <div className="flex items-center gap-5 text-lg">
        <input
          onChange={() => {
            handleCheckBox(id);
          }}
          type="checkbox"
          name=""
          id=""
          checked={isComplete}
          className="hover:cursor-pointer"
        />
        <div className={isComplete ? "line-through" : ""}>{task}</div>
      </div>

      <div className="buttons flex h-full">
        <button
          onClick={(e) => {
            handleEdit(e, id);
          }}
          className={btnClass}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => {
            handleDelete(id);
          }}
          className={btnClass}
        >
          <MdDelete />
        </button>
        <button
          className={btnClass}
          onClick={() => {
            handleTaskUp(id);
          }}
        >
          <FaHandPointUp />
        </button>
        {
          <button
            className={btnClass}
            onClick={() => {
              handleTaskDown(id);
            }}
          >
            <FaHandPointDown />
          </button>
        }
      </div>
    </div>
  );
};

export default TodoItem;
