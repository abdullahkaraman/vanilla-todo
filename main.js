let form = document.getElementById("form")
let textInput = document.getElementById('textInput')
let dateInput = document.getElementById('dateInput')
let textarea = document.getElementById('textarea')
let msg = document.getElementById("msg")
let tasks = document.getElementById("tasks")
let add = document.getElementById("id")

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    formValidation();
});

let formValidation = ()=>{
    if(textInput.value == ""){
        console.log('failure')
        msg.innerHTML = "Task cannot be blank"
    }
    else{
        console.log('success')
        msg.innerHTML = ""
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal")
        add.click()
        
        (()=>{
            add.setAttribute("data-bs-dismiss", "")
        })()
    }
}

let data = [{}]

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        desc: textarea.value,
    })

    localStorage.setItem("data", JSON.stringify(data))

    console.log(data)
    createTask();
}

let createTask = () => {
    tasks.innerHTML = ""
    data.map((item,id)=>{
        return (
            tasks.innerHTML += `
            <div id=${id} class="item">
            <span class="font-weight-bold">${item.text}</span>
            <span class="small text-secondary">${item.date}</span>
            <p>${item.desc}</p>
            <span class="options">
            <i onClick="editTask(this)" data-toggle="modal" data-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(this);createTask()" class="fas fa-trash-alt"></i>
            </span>
            </div>
            `
            )
        })
    resetForm();
}

let deleteTask = (e) =>{
    e.parentElement.parentElement.remove()
    data.splice(e.parentElement.parentElement.id, 1)
    localStorage.setItem("data", JSON.stringify(data))
}

let editTask = (e)=>{
    let selectedTask = e.parentElement.parentElement

    textInput.value = selectedTask.children[0].innerHTML
    dateInput.value = selectedTask.children[1].innerHTML
    textarea.value = selectedTask.children[2].innerHTML

    deleteTask(e)
}

let resetForm = ()=>{
    textInput.value = ""
    dateInput.value = ""
    textarea.value = ""
}

(()=>{
    data = JSON.parse(localStorage.getItem('data')) || [];
    createTask()
})();