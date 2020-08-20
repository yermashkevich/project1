import React from 'react';

import TodoListItem from '../TodoListItem';
import './todo-list.css';

const TodoList = ({todos, onDeleted, onDone, onImportant}) => {
    
    const elements = todos.map((item) => {
        const {id, ...otherProps} = item;
        return (
            <li key={item.id} className="list-group-item">
                <TodoListItem {...otherProps} 
                              onDeleted={() => onDeleted(id)} 
                              onDone={() => onDone(id)} 
                              onImportant={() => onImportant(id)}
                />
            </li>
        );
    })

    return(
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
}

export default TodoList;