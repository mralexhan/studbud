const toggler=document.querySelector(".menu-toggle"),menu=document.querySelector(".menu");toggler.addEventListener("click",(()=>{toggler.classList.toggle("active"),menu.classList.toggle("active")}));const taskForm=document.querySelector(".newTaskForm"),taskColumnForm=document.querySelector(".newTaskColumnForm");var taskColumnList=document.querySelector(".taskContent > ul"),tasklist=document.querySelector(".taskColumn > ul"),taskNameInput=document.getElementById("taskName"),taskDueInput=document.getElementById("taskDue"),taskCompInput=document.getElementById("taskComp"),taskPriorityInput=document.getElementById("taskPriority"),addTaskColumnButton=document.getElementById("taskColumnAdd"),taskListArray=[],taskColumnArray=[];function showAddTaskForm(){document.querySelector(".newTaskForm").style.display="initial"}function closeAddTaskForm(){document.querySelector(".newTaskForm").style.display="none"}function showAddTaskColumnForm(){document.querySelector(".newTaskColumnForm").style.display="initial"}function closeAddTaskColumnForm(){document.querySelector(".newTaskColumnForm").style.display="none"}function addTask(e,t,n,a,l){let o=(new Date).getFullYear(),d={id:Date.now(),taskName:e,dueDate:t,dateCreated:o,estimatedTime:n,priorityRating:a,completionStatus:l};taskListArray.push(d),renderTask(d)}function addTaskColumn(e,t){let n={id:Date.now(),columnName:e,columnColor:t};taskColumnArray.push(n),renderTaskColumn(n)}function renderTask(e){let t=document.createElement("div");t.setAttribute("data-id",e.id),t.classList.add("taskCard");let n=document.createElement("div");n.classList.add("taskCardTitle");let a=document.createElement("h3");a.innerHTML=e.taskName,n.appendChild(a),t.appendChild(n);let l=document.createElement("div");l.classList.add("taskCardInfo");let o=document.createElement("p");o.innerHTML="Due Date: "+e.dueDate;let d=document.createElement("p"),s=document.createElement("span"),i=e.priorityRating.substring(0,1).toUpperCase()+e.priorityRating.substring(1);s.insertAdjacentText("afterbegin",i),"low"==e.priorityRating&&s.classList.add("pLow"),"medium"==e.priorityRating&&s.classList.add("pMedium"),"high"==e.priorityRating&&s.classList.add("pHigh"),d.innerHTML="Priority Rating: ",d.appendChild(s);let m=document.createElement("p"),u=e.estimatedTime,r=Math.floor(u/60),c=u%60;m.innerHTML="Est. Time to Complete: "+r+"H"+c+"M",l.appendChild(o),l.appendChild(d),l.appendChild(m),t.appendChild(l);let p=document.createElement("div");p.classList.add("taskCardIcons");let k=document.createElement("button"),y=document.createElement("img");y.classList.add("icon"),y.src="images/Trashcan.png",y.alt="Delete Task Card Icon",k.appendChild(y),p.appendChild(k);let g=document.createElement("button"),C=document.createElement("img");C.classList.add("icon"),C.src="images/CompNo.png",C.alt="Task Not Completed Icon",g.appendChild(C);let E=document.createElement("button"),v=document.createElement("img");v.classList.add("icon"),v.src="images/CompYes.png",v.alt="Task Completed Icon",E.appendChild(v),p.appendChild(g),p.appendChild(E),t.appendChild(p),E.style.display="none",tasklist.appendChild(t),taskForm.reset(),taskForm.style.display="none";let h,T={id:e.id,taskName:e.taskName,dueDate:e.dueDate,dateCreated:e.dateCreated,estimatedTime:e.estimatedTime,priorityRating:e.priorityRating,completionStatus:e.completionStatus};if(null==localStorage.getItem("tasks")?h=[]:(h=localStorage.getItem("tasks"),h=JSON.parse(h)),!h.find((function(e){return e.id===h.id}))){h.push(T);let e=JSON.stringify(h);localStorage.setItem("tasks",e)}k.addEventListener("click",(function(e){e.preventDefault(),t.remove(),localStorage.removeItem(h)})),g.addEventListener("click",(function(t){t.preventDefault(),E.style.display="initial",g.style.display="none",e.completionStatus=!0})),E.addEventListener("click",(function(t){t.preventDefault(),E.style.display="none",g.style.display="initial",e.completionStatus=!1}))}function renderTaskColumn(e){let t=document.createElement("div");t.classList.add("taskColumn"),t.style.minHeight="20vh",t.style.backgroundColor=e.columnColor;let n=document.createElement("h2");n.innerHTML=e.columnName,t.appendChild(n);let a=document.createElement("button");a.classList.add("taskOut");let l=document.createElement("img");l.classList.add("icon"),l.src="images/Remove.png",l.alt="Remove Task Column Icon",a.appendChild(l),t.appendChild(a);let o=document.createElement("ul");t.appendChild(o);let d=document.createElement("button");d.classList.add("taskAdd");let s=document.createElement("img");s.classList.add("icon"),s.src="images/Add.png",s.alt="Add Task Button Icon",d.appendChild(s),t.appendChild(d),taskColumnForm.reset(),taskColumnForm.style.display="none";let i,m={id:e.id,columnName:e.columnName,columnColor:e.columnColor};if(null==localStorage.getItem("taskColumns")?i=[]:(i=localStorage.getItem("taskColumns"),i=JSON.parse(i)),!i.find((function(t){return t.id===e.id}))){i.push(m);let e=JSON.stringify(i);localStorage.setItem("taskColumns",e)}d.addEventListener("click",(function(e){e.preventDefault(),tasklist=o,showAddTaskForm()})),a.addEventListener("click",(function(e){e.preventDefault(),t.remove(),localStorage.removeItem(i)})),taskColumnList.append(t)}document.getElementById("taskColumnAdd").addEventListener("click",showAddTaskColumnForm),document.getElementById("newTaskColumnOut").addEventListener("click",closeAddTaskColumnForm),document.getElementById("taskAdd").addEventListener("click",showAddTaskForm),document.getElementById("newTaskOut").addEventListener("click",closeAddTaskForm),taskForm.addEventListener("submit",(function(e){e.preventDefault(),addTask(taskNameInput.value,taskDueInput.value,taskCompInput.value,taskPriorityInput.options[taskPriorityInput.selectedIndex].value,!1)})),taskColumnForm.addEventListener("submit",(function(e){e.preventDefault(),addTaskColumn(taskColumnName.value,colorpicker.value)}));var numSongs=document.querySelectorAll("audio").length,songIndex=1,music=document.getElementById("song"+songIndex),playButton=document.getElementById("play"),pauseButton=document.getElementById("pause"),playhead=document.getElementById("elapsed"),timeline=document.getElementById("slider"),timer=document.getElementById("timer"),duration=music.duration,volumeSlider=document.getElementById("volume"),prevSong=document.getElementById("prevSong"),nextSong=document.getElementById("nextSong");function timeUpdate(){var e=music.currentTime/duration*100;playhead.style.width=.01*e*timeline.offsetWidth+"px";var t=Math.floor(music.currentTime%60),n=Math.floor(music.currentTime/60);timer.innerHTML=String(n).padStart(2,"0")+":"+String(t).padStart(2,"0")}pauseButton.style.display="none",music.addEventListener("timeupdate",timeUpdate,!1),playButton.onclick=function(){music.play(),playButton.style.display="none",pause.style.display="initial"},pauseButton.onclick=function(){music.pause(),playButton.style.display="initial",pause.style.display="none"},music.addEventListener("canplaythrough",(function(){duration=music.duration}),!1),volumeSlider.addEventListener("change",(function(e){music.volume=e.currentTarget.value/100}));
//# sourceMappingURL=index.77230535.js.map
