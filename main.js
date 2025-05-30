const addTaskBtn = document.getElementById('add-task-btn'); // получили элемент кнопку "Добавити"
const deskTaskImput = document.getElementById('description-task'); // получили елемент імпут, в якому вводим наш товар
const todoWrapper = document.querySelector('.todos-wrapper'); // получили елемент, в якому записуються список, де вводився в імпут

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemeElems = [];

function Task(description) { // створили шаблон для задачі
    this.description = description; // Задача (те, що ввели в інпут)
    this.completed = false; // статус задачі, виконана чи ні. За замовчуванням стоїть не виконана
}

const createTemlate = (task, index) => {
    return `
    <div class='todo-item ${task.completed ? 'checked' : ''}'>
        <div class='description'>${task.description}</div>
        <div class='buttons'>
                <input onclick="completeTask(${index})" class='btn-comlete' type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class='btn-delete'><i class="material-icons">delete_outline </i></button>    
        </div>
    </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks];
}

const fillHtmlList = () => {
    todoWrapper.innerHTML = '';
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todoWrapper.innerHTML += createTemlate(item, index);
        })
        todoItemeElems = document.querySelectorAll('.todo-item');
    }
};

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemeElems[index].classList.add('checked');
    } else {
        todoItemeElems[index].classList.remove('checked');
    }
    updateLocal(); 
    fillHtmlList();
};


addTaskBtn.addEventListener('click', () => {   // Клікнувши кнопку добавити, виконуєм функцію
    if(deskTaskImput.value.length === 0) {    // Блокуємо добавлення пустих списків
        return
    } 
    tasks.push(new Task(deskTaskImput.value)); // Добавляєм в наш масив в кінець об'єкту, який створили за допомогою готового шаблона Task
    updateLocal();
    fillHtmlList();
    deskTaskImput.value = '';
});

function checkPhoneKey(key) {
    if (key == 'Enter') {
        tasks.push(new Task(deskTaskImput.value)); // Добавляєм в наш масив в кінець об'єкту, який створили за допомогою готового шаблона Task
        updateLocal();
        fillHtmlList();
        deskTaskImput.value = '';
        };
};


const deleteTask = index => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}