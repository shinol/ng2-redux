import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { TodoActions } from '../actions';
import { ITodosState, rootReducer } from '../store';


import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.css']
})
export class TodoDashboardComponent {
  @select((s: ITodosState) => s.lastUpdate) lastUpdate;
  @select((s: ITodosState) => s.todos.length) todosLength;

  constructor(private ngRedux: NgRedux<ITodosState>) {}

  clearAll() {
    this.ngRedux.dispatch({type: TodoActions.CLEAR})
  }
}
