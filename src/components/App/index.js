import React, { Component } from 'react';

import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import AddItemPanel from '../AddItemPanel';

import './app.css';

export default class App extends Component {

    maxCount = 0;

    state = {
        toDoData: [
            this.createNewItem('Drink Coffee'),
            this.createNewItem('Make Awesome App'),
            this.createNewItem('Have a Lunch')
        ],
        term: '',
        filter: 'all'
    }

    createNewItem(label){
        return {
            label, 
            important: false, 
            done: false,
            id: this.maxCount++
        }
    }

    deleteItem = (id) => {
        this.setState(({toDoData}) => {
            const idx = toDoData.findIndex((el) => el.id === id );

            const newArray = [
                ...toDoData.slice(0, idx), 
                ...toDoData.slice(idx + 1)
            ];

            return {
                toDoData: newArray
            }
        })
    }
    
    addItem = (text) => {
        this.setState(({toDoData}) => {
            const newEl = this.createNewItem(text);

            const newArray = [
                ...toDoData, newEl
            ];

            return {
                toDoData : newArray
            }
        })
    }

    toggleProperty(arr, id, propName){
        const idx = arr.findIndex((el) => el.id === id );
            
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName] };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleDone = (id) => {
        this.setState(({toDoData}) => {
            return {
                toDoData: this.toggleProperty(toDoData, id, 'done'),
            };
        })
    }

    onToggleImportant = (id) => {
        this.setState(({toDoData}) => {
            return {
                toDoData: this.toggleProperty(toDoData, id, 'important'),
            };
        })
    } 

    searchItem(items, term){
        if(term.length == 0){
            return items;
        } 

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }
    
    onSearchChange = (term) => {
        this.setState({term});
    }

    filter(items, filter){
        switch(filter){
            case 'all':
                return items;
            case 'active': 
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default: 
                return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({filter});
    }

    render() {
        const {toDoData, term, filter} = this.state;
        const visibleItems = this.filter(this.searchItem(toDoData, term), filter);

        const toDoCount = toDoData.filter(item => !item.done).length;
        const doneCount = toDoData.filter(item => item.done).length;

        return (
            <div className="todo-app">
                <AppHeader todo={toDoCount} done={doneCount}  />
                <div className="top-panel">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
                </div>
                
                <TodoList todos={visibleItems} 
                          onDeleted={this.deleteItem}
                          onDone={this.onToggleDone}
                          onImportant={this.onToggleImportant}
                />

                <AddItemPanel addItem = {this.addItem} />
            </div>
        );
    }
}