import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo } from './Redux/todoSlice';

const Todo = () => {
  const [text, setText] = useState('');
  const [editeId, setEditeId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  //   Load todos from localStorage on initial render
  useEffect(() => {
    const SavedTods = JSON.parse(localStorage.getItem('todos')) || [];
    if (SavedTods.length > 0) {
      SavedTods.forEach((todo) => {
        dispatch({
          type: 'todos/loadFromStorage',
          payload: todo,
        });
      });
    }
  }, [dispatch]);


useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
}, [todos])

const handleAddTodo = () => {
    if(text.trim()){
        if(editeId){
            dispatch(removeTodo(editeId));
            dispatch(addTodo(`${text} (edited)`));
            setEditeId(null); //clear the edited state 
        }
        else{
            dispatch(addTodo(text))
        }
        setText('');
    }
}

};

export default Todo;
