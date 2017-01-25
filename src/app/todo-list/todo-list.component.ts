import { Component } from '@angular/core';

import { NgRedux, select } from 'ng2-redux';
import { ITodosState, rootReducer } from '../store';
import { TodoActions } from '../actions';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  // Read the comment in TodoService
  // @select((s: IAppState) => s.messages.newMessages) newMessages;
  @select() todos;

  constructor(private ngRedux: NgRedux<ITodosState>) { 
  }

  addTodo(input) {
    if (!input.value) return; 

    this.ngRedux.dispatch({type: TodoActions.ADD, payload: input.value});

    input.value = '';
  }

  toggleTodo(todo) {
    this.ngRedux.dispatch({type: TodoActions.TOGGLE, payload: todo});
  }

  removeTodo(todo) {
    this.ngRedux.dispatch({type: TodoActions.REMOVE, payload: todo});
  }
}
