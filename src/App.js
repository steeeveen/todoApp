import React, { Component } from 'react';
import './App.css';
import { Card, Col, Row, Input, Button } from 'react-materialize';
import { CSSTransitionGroup } from 'react-transition-group'

const TodoCard = (props) => {
  return (
    <Col s={4} className='grid-example' key={props.taskName}>
      <Card className='blue-grey darken-1' textClassName='white-text' title={props.taskName}>
        {props.taskDescription}
      </Card>
    </Col>
  );
};

const CardList = (props) => {
  return (
    <Row>
      <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {props.cards.map(card => <TodoCard {...card} />)}
      </CSSTransitionGroup>
    </Row>
  );
}

class Form extends React.Component {
  state = {
    taskName: '',
    taskDescription: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      taskName: '',
      taskDescription: ''
    });
    this.props.onSubmit(this.state);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input name="taskName" s={12} label="Task Name" onChange={this.handleInputChange} value={this.state.taskName} />
        <Input name="taskDescription" s={12} label="Description" onChange={this.handleInputChange} value={this.state.taskDescription} />
        <div className="center">
          <Button type='submit' floating large className='light' waves='teal' icon='add' />
        </div>
      </form>
    );
  }
}

class App extends Component {
  state = {
    todoItems: [
    ]
  };

  addNewTodo = (todo) => {
    if (todo.taskName.length > 0) {
      this.setState(prevState => ({
        todoItems: prevState.todoItems.concat(todo)
      }));
    }
  };

  render() {
    return (
      <div className="container">
        <Form onSubmit={this.addNewTodo} />
        <CardList cards={this.state.todoItems} />
      </div>
    );
  }
}

export default App;
