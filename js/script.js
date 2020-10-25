'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [
    // {
    //     value: 'Сварить кофе',
    //     completed: false 
    // },
    // {
    //     value: 'Помыть посуду',
    //     completed: true
    // }
];

    let json = [];

    function setLocalStorage(){
        localStorage.setItem('data',JSON.stringify(todoData));
        // json.push(JSON.stringify(newTodo));
        // console.log('json: ', json);
        // localStorage.setItem(headerInput.value, json);
    }

const render = function() {
        todoList.textContent = '';
        todoCompleted.textContent = '';


    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' + 
        '<div class="todo-buttons">' + 
        '<button class="todo-remove"></button>' + 
        '<button class="todo-complete"></button>' + 
        '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        }
        else{
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click',function(){
            item.completed = !item.completed;
            setLocalStorage();
            render();
        });

        const btnRemove = li.querySelector('.todo-remove');
        btnRemove.addEventListener('click', function(){
            if (item.completed){
                todoCompleted.querySelector('.todo-item').remove();
                 
            }
            else {
                todoList.querySelector('.todo-item').remove();
                
            }
            todoData.splice(todoData.indexOf(item), 1);
            setLocalStorage();
            render();
        });

       
       
    });
}

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false 
    };



    if (headerInput.value === ''){
        alert('Введите планы');
    }
    else{
        todoData.push(newTodo);
        
        headerInput.value = '';
    }
    


    setLocalStorage();
    render();
});


function getLocalStorage(){
    if (localStorage.getItem('data')) todoData = JSON.parse(localStorage.getItem('data'));
    else todoData = [];
    
    // let data = JSON.parse(json);
    // console.log('data: ', data);
    
        // let keys = Object.keys(localStorage);
        // for (let key of keys) 
        //todoData.push(JSON.parse(localStorage.getItem(key)));
            
        
    }

getLocalStorage();
render();