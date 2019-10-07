import React from "react";
import CurrentViewEntry from "./CurrentViewEntry";
import { fakeList } from "../../Component/fakeList";
import { taskList } from "../../Component/realTask";

let numberId = 0;
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoText: "",
      todoList: fakeList, // 화면 출력을 위한 fakedata
      taskList: taskList // 실제 데이터베이스
    };
    this.todoslist = this.todoslist.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  todoslist(text) {
    this.setState({
      todoText: ""
    });
  }
  addTodo() {
    const { todoText, taskList } = this.state;
    if (todoText.length === 0) return alert("내용을 입력하세요");
    const todos = {
      id: numberId++,
      text: todoText,
      complete: false
    };
    const newTodo = [...taskList, todos];
    this.setState({ taskList: newTodo, todoText: "" });
  }
  onChange(e) {
    this.setState({ todoText: e.target.value });
  }
  render() {
    const { todoText, taskList } = this.state;
    const { onChange, addTodo } = this;
    console.log(taskList);
    return (
      <div className="viewEntry">
        <input
          className="input"
          type="text"
          placeholder="New Todo"
          value={todoText}
          onChange={onChange}
          onKeyDown={e => (e.keyCode === 13 ? addTodo() : null)}
        />
        <button className="inputBtn" onClick={() => addTodo()}>
          input
        </button>
        {taskList
          .filter(item => !item.complete)
          .map(todos => (
            <CurrentViewEntry
              text={todos.text}
              complete={todos.complete}
              onChange={onChange}
              key={todos.id}
            />
          ))}
      </div>
    );
  }
}
