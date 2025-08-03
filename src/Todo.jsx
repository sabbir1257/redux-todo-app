import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, toggleTodo } from './Redux/todoSlice';

const Todo = () => {
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  //   Load todos from localStorage on initial render
  useEffect(() => {
    const SavedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (SavedTodos.length > 0) {
      SavedTodos.forEach((todo) => {
        dispatch({
          type: 'todos/loadFromStorage',
          payload: todo,
        });
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (text.trim()) {
      if (editId) {
        dispatch(removeTodo(editId));
        dispatch(addTodo(`${text} (edited)`));
        setEditId(null); //clear the edited state
      } else {
        dispatch(addTodo(text));
      }
      setText('');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center py-10 min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-5">Redux Todo App</h1>
        <div className="w-11/12">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter Your Todo List"
              className="flex-grow px-4 py-2 border rounded-md focus:outline-none"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleAddTodo}
            >
              {editId ? 'Edit ToDo' : 'Add Todo'}
            </button>
          </div>
          <div>
            <ul className="max-w-11/12 bg-white rounded-lg shadow p-5 space-y-4">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex justify-between items-center p-3 rounded-lg shadow-md ${
                    todo.completed ? 'bg-green-100' : 'bg-gray-50'
                  }`}
                >
                  <div
                    className={`flex flex-col cursor-pointer ${
                      todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
                    onClick={() => dispatch(toggleTodo(todo.id))}
                  >
                    <span>{todo.text}</span>
                    <span>{new Date(todo.id).toLocaleString()}</span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleAddTodo(todo)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(removeTodo(todo.id))}
                      className="px-3 py-1 bg-red-500 rounded-xl hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
