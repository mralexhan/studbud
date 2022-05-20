const e=document.querySelector(".menu-toggle"),t=document.querySelector(".menu");e.addEventListener("click",(()=>{e.classList.toggle("active"),t.classList.toggle("active")}));document.querySelectorAll("audio").length;var n=document.getElementById("song1"),a=document.getElementById("play"),l=document.getElementById("pause"),d=document.getElementById("elapsed"),i=document.getElementById("slider"),o=document.getElementById("timer"),s=n.duration,c=document.getElementById("volume");document.getElementById("prevSong"),document.getElementById("nextSong");l.style.display="none",n.addEventListener("timeupdate",(function(){var e=n.currentTime/s*100;d.style.width=.01*e*i.offsetWidth+"px";var t=Math.floor(n.currentTime%60),a=Math.floor(n.currentTime/60);o.innerHTML=String(a).padStart(2,"0")+":"+String(t).padStart(2,"0")}),!1),a.onclick=function(){n.play(),a.style.display="none",pause.style.display="initial"},l.onclick=function(){n.pause(),a.style.display="initial",pause.style.display="none"},n.addEventListener("canplaythrough",(function(){s=n.duration}),!1),c.addEventListener("change",(function(e){n.volume=e.currentTarget.value/100}));const m=document.querySelector(".newTaskForm"),u=document.querySelector(".newTaskColumnForm");var r=document.querySelector(".taskContent > ul"),p=document.querySelector(".taskColumn > ul"),g=document.getElementById("taskName"),y=document.getElementById("taskDue"),E=document.getElementById("taskComp"),C=document.getElementById("taskPriority"),k=(document.getElementById("taskColumnAdd"),[]),v=[];function f(){document.querySelector(".newTaskForm").style.display="initial"}document.getElementById("taskColumnAdd").addEventListener("click",(function(){document.querySelector(".newTaskColumnForm").style.display="initial"})),document.getElementById("newTaskColumnOut").addEventListener("click",(function(){document.querySelector(".newTaskColumnForm").style.display="none"})),document.getElementById("taskAdd").addEventListener("click",f),document.getElementById("newTaskOut").addEventListener("click",(function(){document.querySelector(".newTaskForm").style.display="none"})),m.addEventListener("submit",(function(e){e.preventDefault(),function(e,t,n,a,l){let d=(new Date).getFullYear(),i={id:Date.now(),taskName:e,dueDate:t,dateCreated:d,estimatedTime:n,priorityRating:a,completionStatus:l};k.push(i),function(e){let t=document.createElement("div");t.setAttribute("data-id",e.id),t.classList.add("taskCard");let n=document.createElement("div");n.classList.add("taskCardTitle");let a=document.createElement("h3");a.innerHTML=e.taskName,n.appendChild(a),t.appendChild(n);let l=document.createElement("div");l.classList.add("taskCardInfo");let d=document.createElement("p");d.innerHTML="Due Date: "+e.dueDate;let i=document.createElement("p"),o=document.createElement("span"),s=e.priorityRating.substring(0,1).toUpperCase()+e.priorityRating.substring(1);o.insertAdjacentText("afterbegin",s),"low"==e.priorityRating&&o.classList.add("pLow");"medium"==e.priorityRating&&o.classList.add("pMedium");"high"==e.priorityRating&&o.classList.add("pHigh");i.innerHTML="Priority Rating: ",i.appendChild(o);let c=document.createElement("p"),u=e.estimatedTime,r=Math.floor(u/60),g=u%60;c.innerHTML="Est. Time to Complete: "+r+"H"+g+"M",l.appendChild(d),l.appendChild(i),l.appendChild(c),t.appendChild(l);let y=document.createElement("div");y.classList.add("taskCardIcons");let E=document.createElement("button"),C=document.createElement("img");C.classList.add("icon"),C.src="images/Trashcan.png",C.alt="Delete Task Card Icon",E.appendChild(C),y.appendChild(E);let k=document.createElement("button"),v=document.createElement("img");v.classList.add("icon"),v.src="images/CompNo.png",v.alt="Task Not Completed Icon",k.appendChild(v);let f=document.createElement("button"),h=document.createElement("img");h.classList.add("icon"),h.src="images/CompYes.png",h.alt="Task Completed Icon",f.appendChild(h),y.appendChild(k),y.appendChild(f),t.appendChild(y),f.style.display="none",p.appendChild(t),m.reset(),m.style.display="none";let L,I={id:e.id,taskName:e.taskName,dueDate:e.dueDate,dateCreated:e.dateCreated,estimatedTime:e.estimatedTime,priorityRating:e.priorityRating,completionStatus:e.completionStatus};null==localStorage.getItem("tasks")?L=[]:(L=localStorage.getItem("tasks"),L=JSON.parse(L));let S=L.find((function(e){return e.id===L.id}));if(!S){L.push(I);let e=JSON.stringify(L);localStorage.setItem("tasks",e)}E.addEventListener("click",(function(e){e.preventDefault(),t.remove(),localStorage.removeItem(L)})),k.addEventListener("click",(function(t){t.preventDefault(),f.style.display="initial",k.style.display="none",e.completionStatus=!0})),f.addEventListener("click",(function(t){t.preventDefault(),f.style.display="none",k.style.display="initial",e.completionStatus=!1}))}(i)}(g.value,y.value,E.value,C.options[C.selectedIndex].value,!1)})),u.addEventListener("submit",(function(e){e.preventDefault(),function(e,t){let n={id:Date.now(),columnName:e,columnColor:t};v.push(n),function(e){let t=document.createElement("div");t.classList.add("taskColumn"),t.style.minHeight="20vh",t.style.backgroundColor=e.columnColor;let n=document.createElement("h2");n.innerHTML=e.columnName,t.appendChild(n);let a=document.createElement("button");a.classList.add("taskOut");let l=document.createElement("img");l.classList.add("icon"),l.src="images/Remove.png",l.alt="Remove Task Column Icon",a.appendChild(l),t.appendChild(a);let d=document.createElement("ul");t.appendChild(d);let i=document.createElement("button");i.classList.add("taskAdd");let o=document.createElement("img");o.classList.add("icon"),o.src="images/Add.png",o.alt="Add Task Button Icon",i.appendChild(o),t.appendChild(i),u.reset(),u.style.display="none";let s,c={id:e.id,columnName:e.columnName,columnColor:e.columnColor};null==localStorage.getItem("taskColumns")?s=[]:(s=localStorage.getItem("taskColumns"),s=JSON.parse(s));if(!s.find((function(t){return t.id===e.id}))){s.push(c);let e=JSON.stringify(s);localStorage.setItem("taskColumns",e)}i.addEventListener("click",(function(e){e.preventDefault(),p=d,f()})),a.addEventListener("click",(function(e){e.preventDefault(),t.remove(),localStorage.removeItem(s)})),r.append(t)}(n)}(taskColumnName.value,colorpicker.value)}));
//# sourceMappingURL=index.997fe140.js.map