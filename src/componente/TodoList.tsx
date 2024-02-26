import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './TodoList.css';

// Definimos una interfaz para el tipo de dato Todo
interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

// Definimos el componente TodoList
const TodoList: React.FC = () => {
  // Inicializamos el estado todos con un array vacío
  const [todos, setTodos] = useState<Todo[]>([]);

  // Inicializamos el hook useForm para gestionar el formulario de entrada de tareas
  const { register, handleSubmit, reset } = useForm<{ task: string }>();

  // Definimos la función addTodo para agregar una nueva tarea al estado todos
  const addTodo = (task: string) => {
    const newTodo: Todo = { id: Date.now(), task, completed: false };
    setTodos([...todos, newTodo]);
    reset(); // Limpiamos el formulario después de agregar una tarea
  };

  // Definimos la función toggleCompleted para marcar una tarea como completada o no completada
  const toggleCompleted = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Definimos la función deleteTodo para eliminar una tarea del estado todos
  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  // Definimos la función onSubmit para gestionar el envío del formulario de entrada de tareas
  const onSubmit = (data: { task: string }) => {
    addTodo(data.task);
  };

  // Renderizamos el componente TodoList
  return (
    <div className="todo-list">
      <h1>Lista de Tareas</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Utilizamos el hook register para vincular el input del formulario con el estado de react-hook-form */}
        <input
          {...register('task', { required: true })}
          placeholder="Agregar tarea"
        />
        {/* Agregamos un botón de tipo submit para enviar el formulario */}
        <button type="submit">Agregar</button>
      </form>
      {/* Renderizamos la lista de tareas utilizando el estado todos */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {/* Renderizamos un input de tipo checkbox para marcar una tarea como completada o no completada */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            {/* Renderizamos el texto de la tarea */}
            <span>{todo.task}</span>
            {/* Renderizamos un botón para eliminar una tarea */}
            <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exportamos el componente TodoList
export default TodoList;