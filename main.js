// console.log("hello shiv ")

// var state = {
//     taskList:[
//         {
//             imageUrl:"",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:""
//         },
//         {
//             imageUrl:"",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:""
//         },
//         {
//             imageUrl:"",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:""
//         },
//         {
//             imageUrl:"",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:""
//         },
//     ]
// }

var state = {
    taskList:[]
};

// DOM Operation 

var taskContent = document.querySelector(".task_content");
var taskModal =document.querySelector(".task-modal-body");

console.log(taskContent);
console.log(taskModal);



const htmlTaskContent = ({id,title,description,type,url})=>`
    <div class="col-md-6 col-lg-4 mt-3 id=${id} key=${id}">
        <div class="card shadow-sm task_card">
            <div class="card-header d-flex justify-content-end task_card_header gap-2">
                <button type="button" class="btn btn-outline-info mr-2" name=${id}>
                    <i class="fas fa-pencil-alt" name=${id}></i>
                </button>
                <button type="button" class="btn btn-outline-dark mr-2" name=${id}>
                    <i class="fas fa-trash-alt" name=${id}></i>
                </button>
            </div>
            <div class="card-body">
                ${
                    url && `<img src=${url} alt="card image top" class="card-image-top md-3 rounded-lg"/>`
                }
                <h4 class="card-title">${title}</h4>
                <p class="description trim-3-lines text-muted card-text">${description}</p>
                <div class="tags text-white d-flex flex-wrap bg-primary m-1">
                    <span class="badge bg-primary m-2">${type}</span>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
            </div>
        </div>
    </div>
`

const htmlModalContent = ({id,title,description,url})=>{
    const date = new Date(paraInt(id));
    return `
        <div id=${id}>
            ${
                url && `<img src=${url} alt="card image cap" class="image-fluid md-3"/>`
            }
            <strong>Created on ${data.toDoteString()}</strong>  
            <h2 clss="my-3">${title}</h2>
            <p class="lead">${description}</p>
        </div>
    `
}


const updateLocalStorage = () =>{
    localStorage.setItem("task",JSON.stringify({
        tasks: state.taskList,
    }))
}

const loadInitialData=()=>{
    const localStorageCopy = JSON.parse(localStorage.task);
    if(localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardDate)=>{
        taskContent.insertAdjacentElement("beforeend",htmlTaskContent())
    })  
}

const handleSubmit = (event) =>{
    const id = `${Date.now()}`
    const input = {
        url: document.getElementById("imageurl").value,
        title:document.getElementById("tasktitle").value,
        description:document.getElementById("taskDescription").value,
        type:document.getElementById("tasktype").value,
    };
    if(input.title === "" || input.description === "" || input.type === ""){
        return alert("Please fill all the mandatory fields!")
    }

    taskContent.insertAdjacentHTML("beforeend",htmlTaskContent({...input, id}));

    state.taskList.push({...input,id});
    updateLocalStorage();
}