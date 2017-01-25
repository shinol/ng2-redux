import { TodoActions } from './actions';
import { tassign } from 'tassign';

export interface ITodoState {
    _id: number,
    isCompleted: boolean,
    title: string
}

export interface ITodosState {
    lastUpdate: Date;
    todos: Array<ITodoState>;
}

export const initialState: ITodosState = {
    lastUpdate: new Date(),
    todos: [
        {
            _id: 1,
            isCompleted: false,
            title: ''
        }
    ]
}

export function rootReducer(state: ITodosState, action): ITodosState {

    switch(action.type) {
        case TodoActions.ADD:  // action.payload is a title:string
            return tassign(state, {
                lastUpdate: new Date(),
                todos: state.todos.concat({
                    _id: state.todos.length + 1, 
                    isCompleted: false,
                    title: action.payload})
                });
        case TodoActions.TOGGLE:
            var item = state.todos.find(i => i._id === action.payload._id);
            var idx = state.todos.indexOf(item);
            var beforeItems = state.todos.slice(0, idx);
            var afterItems = state.todos.slice(idx+1);
            var updatedItem = tassign(item, {isCompleted: !item.isCompleted});
            return tassign(state, {
                lastUpdate: new Date(),
                todos: [...beforeItems, updatedItem, ...afterItems]
            });
        case TodoActions.REMOVE:
            var newArray = state.todos.filter(i => i._id !== action.payload._id);
            return tassign(state, {
                lastUpdate: new Date(),
                todos: newArray
            });
        case TodoActions.CLEAR:
            return tassign(state, {
                lastUpdate: new Date(),
                todos: []
            })
        default:
            return tassign(state, {}); // return copy of todos object.;
    }
    
}