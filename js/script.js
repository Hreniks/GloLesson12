'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = [
    // {
    //     value: 'Сварить кофе',
    //     completed: false 
    // },
    // {
    //     value: 'Помыть посуду',
    //     completed: true
    // }
];

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
            render();
        });

        const btnRemove = li.querySelector('.todo-remove');
        btnRemove.addEventListener('click', function(){
            todoList.querySelector('.todo-item').remove();
            todoData.splice(item,1);
            render();
        })
       
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
        localStorage.item = headerInput.value;
        headerInput.value = '';
    }
    

    render();
});


render();