import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const init = () => {
  // const todos = JSON.parse(localStorage.getItem('todos')) || [];
  return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {

  const [todos, dispatchTodo] = useReducer(todoReducer, [], init);
  // Guardamos local ante un cambio
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos) || []);
  }, [todos]);

  // Eliminar
  const borrarTodo = (id) => {
    dispatchTodo({
      type: 'DELETE_TODO',
      payload: id
    });
  };
  // Agregar
  const handleNewTodo = (todo) => {
    console.log(todo);
    dispatchTodo({
      type: 'ADD_TODO',
      payload: todo
    });
  };
  // Completar
  const onToggleTodo = (id) => {
    dispatchTodo({
      type: 'TOGGLE_TODO',
      payload: id
    });
  };

  // totales
  const todoCount = todos.length;
  // Pendientes
  const pendingTodoCount = todos.filter(todo => !todo.done).length;
  
  return {
    todos,
    borrarTodo,
    onToggleTodo,
    handleNewTodo,
    pendingTodoCount,
    todoCount
  }
}