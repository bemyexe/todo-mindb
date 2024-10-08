import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FilterTodos, Todo } from '../../@types';

import { Button, TodoFilters, TodoList, TodoPanel } from './components';

import './style.css';

const DEFAULT_TODOS: Todo[] = [];

const DEFAULT_FILTER = 'all';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(DEFAULT_TODOS);

  const [filter, setFilter] = useState<FilterTodos>(DEFAULT_FILTER);

  const handleAddTodo = (title: Todo['title']) => {
    setTodos([...todos, { id: uuidv4(), title, completed: false }]);
  };

  const handleToggleTodo = (id: Todo['id']) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleFilterChange = (newFilter: FilterTodos) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    const map = {
      all: true,
      active: !todo.completed,
      completed: todo.completed,
    };
    return map[filter];
  });

  const itemsLeft = todos.reduce(
    (acc, todo) => (todo.completed ? acc : acc + 1),
    0
  );

  const itemsCompletedLeft = todos.find((todo) => todo.completed === true);

  return (
    <div className="app-wrapper">
      <div className="app-content">
        <TodoPanel handleAddTodo={handleAddTodo} />
        <TodoFilters filter={filter} handleFilterChange={handleFilterChange} />
        <p>{itemsLeft} items left </p>
        <Button
          variant="filled"
          onClick={handleClearCompleted}
          children="Clear completed"
          disabled={!itemsCompletedLeft}
          title="Clear completed"
        />
        <TodoList todos={filteredTodos} handleToggleTodo={handleToggleTodo} />
      </div>
    </div>
  );
};
