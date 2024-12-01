let form = document.getElementById("form")
let textinput = document.getElementById("textinput")
let msg = document.getElementById("msg")
let dateinput  =  document.getElementById("dateinput")
let textarea = document.getElementById("textarea")
let tasks = document.getElementById("tasks")
let add = document.getElementById("add")

form.addEventListener('submit',(e)=>{
  e.preventDefault()
  formValidation()

})

let formValidation = () =>{
    if(textinput.value === "" || dateinput.value === "" || textarea.value === "" ){
        msg.innerHTML = "Plese Enter The All Value"
    }
    else{
        msg.innerHTML =""
        acceptData()
        add.setAttribute("data-bs-dismiss","modal")
        add.click()
    }
}
  let data = [];

  let acceptData = () =>{
    data.push({
      text:textinput.value,
      date:dateinput.value,
      desc:textarea.value
    })

    localStorage.setItem("data",JSON.stringify(data))

    createTask()
  }

  let createTask =()=>{
    tasks.innerHTML = ""
    data.map((x,y)=>{
      return tasks.innerHTML += `
      <div id=${y}>
          <span class="fw-bold">${x.text}</span>
                  <span class="small text-secondary">${x.date}</span>
                  <p>${x.desc}</p>
                  <span class="options">
                      <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="bi bi-pencil-square"></i>
                      <i onclick="deleteTask(this);createTask()"class="bi bi-trash3-fill"></i>
                  </span>
              </div>`
    })
       resetForm();
  }

  let resetForm = ()=>{
    textinput.value="";
    dateinput.value="";
    textarea.value="";
  }

  let deleteTask  =(e)=>{
    e.parentElement.parentElement.remove()
    data.splice(e.parentElement.parentElement.id,1)
    localStorage.setItem("data",JSON.stringify(data))
  }

  let editTask = (e)=>{
    let selectedTask = e.parentElement.parentElement;

    textinput.value = selectedTask.children[0].innerHTML;
    dateinput.value = selectedTask.children[1].innerHTML;
    textarea.value  = selectedTask.children[2].innerHTML;

    deleteTask(e)
  }

  (()=>{
     data = JSON.parse(localStorage.getItem("data")) || []
     createTask();
     console.log(data)
  })()