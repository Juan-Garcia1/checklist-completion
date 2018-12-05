import React, { Component } from "react";
import "./App.css";
import uuid from "uuid";

import ProgressBar from "./Components/ProgressBar";

class App extends Component {
  state = {
    todos: [
      // {
      //   id:
      //   task: "take out garbage",
      //   complete: false
      // }
    ],
    task: "",
    completed: []
  };

  handleTaskChange = e => {
    const value = e.target.value;
    this.setState({
      task: value
    });
  };

  addTask = e => {
    e.preventDefault();
    const { todos, task } = this.state;
    if (!task) {
      alert("Please enter a task");
    } else {
      const newTodos = [...todos, { id: uuid(), task, complete: false }];
      this.setState({
        todos: newTodos,
        task: ""
      });
    }
  };

  deleteTask = id => {
    const { todos } = this.state;
    const newTodos = todos.filter(todo => todo.id !== id);
    // remove deleted task from the completed array as well
    const newCompleted = this.state.completed.filter(c => c.id !== id);
    this.setState({
      todos: newTodos,
      completed: newCompleted
    });
  };

  completeTask = id => {
    const { todos, completed } = this.state;
    const newTodo = todos.map(todo => {
      if (todo.id === id) {
        // make task completed to true
        todo.complete = true;
        // add completed todo to the completed array
        const newCompletedArr = [...completed, todo];
        this.setState({
          completed: newCompletedArr
        });
      }
      return todo;
    });
    this.setState({
      todos: newTodo
    });
  };

  render() {
    const { todos, completed, task } = this.state;
    // get the percentage of completed tasks
    const completion = ((completed.length / todos.length) * 100).toFixed(0);

    return (
      <main>
        <ProgressBar completion={completion} />

        <div>
          {todos.length ? (
            todos.map(({ id, task, complete }) => (
              <div key={id}>
                <p
                  onClick={() => this.completeTask(id)}
                  style={{ textDecoration: complete ? "line-through" : "" }}
                >
                  {task}
                </p>
                <button onClick={() => this.deleteTask(id)}>X</button>
              </div>
            ))
          ) : (
            <p>There are no more tasks</p>
          )}
        </div>

        <form onSubmit={this.addTask}>
          <input
            value={task}
            placeholder="Add a task..."
            onChange={this.handleTaskChange}
          />
          <button type="submit">Add Task</button>
        </form>
      </main>
    );
  }
}

export default App;
