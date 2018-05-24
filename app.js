
const form=document.querySelector('#task-form');
const taskInput=document.querySelector('#task');
const filter=document.querySelector('#filter');
const tasklist=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');


allEventload();


function allEventload(){
	form.addEventListener('submit',addTask);
	tasklist.addEventListener('click',removeTask);
	clearBtn.addEventListener('click',clearTasks);
	filter.addEventListener('keyup',filterTask);
	document.addEventListener('DOMContentLoaded',getTask);
}

function addTask(e){
	//console.log(e.target);
	if(taskInput.value!==''){
		const li=document.createElement('li');
		li.className='collection-item';
		li.appendChild(document.createTextNode(taskInput.value));
		

		const link=document.createElement('a');
		link.className='delete-item secondary-content';
		link.innerHTML='<i class="fa fa-remove"></i>';
		li.appendChild(link);

		tasklist.appendChild(li);
		// local Storage set
		storageTaskLocalStorage(taskInput.value);

		taskInput.value='';

		 console.log(li);
		// console.log(tasklist);
		e.preventDefault();
	}

	else{
		alert('Please fill the input box');
	}
	

}

function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('Are you Sure Delete!')){
			//console.log(e.target.parentElement.classList.contains('delete-item'));
			e.target.parentElement.parentElement.remove();

			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}

	}

}

function clearTasks(){
	tasklist.innerHTML='';
	//console.log(tasklist);
	clearTaskFormLocalStorage();
} 

function filterTask(e){
	const text=e.target.value.toLowerCase();
	const listSelectAll=document.querySelectorAll('.collection-item');
	listSelectAll.forEach(function(task){
		const item=task.firstChild.textContent;
		if(item.toLowerCase().indexOf(text)!=-1){
			task.style.display='block';
		}else{
			task.style.display='none';
		}
	});
}




function storageTaskLocalStorage(task){
	let tasks;
	if(localStorage.getItem('tasks')===null){
		tasks=[];
	}else{
		tasks=JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.push(task);
	localStorage.setItem('tasks',JSON.stringify(tasks));
}


function getTask(){
	let tasks;
	if(localStorage.getItem('tasks')===null){
		tasks=[];
	}else{
		tasks=JSON.parse(localStorage.getItem('tasks'))
	}
	tasks.forEach(function(task){

		const li=document.createElement('li');
		li.className='collection-item';
		li.appendChild(document.createTextNode(task));
		

		const link=document.createElement('a');
		link.className='delete-item secondary-content';
		link.innerHTML='<i class="fa fa-remove"></i>';
		li.appendChild(link);

		tasklist.appendChild(li);

	});
}

function removeTaskFromLocalStorage(taskItem){
	let tasks;
	if(localStorage.getItem('tasks')===null){
		tasks=[];
	}else{
		tasks=JSON.parse(localStorage.getItem('tasks'))
	}
	tasks.forEach(function(task,index){
		if(taskItem.textContent==task){
			tasks.splice(index,1);
		}
	});
	localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTaskFormLocalStorage(){
	localStorage.clear();
}
