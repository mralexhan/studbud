const toggler=document.querySelector(".menu-toggle"),menu=document.querySelector(".menu");function determineTimes(){let e=parseInt(document.getElementById("pomoMin").value),t=parseInt(document.getElementById("pomoSec").value),n=parseInt(document.getElementById("shortMin").value),o=parseInt(document.getElementById("shortSec").value),l=parseInt(document.getElementById("longMin").value),d=parseInt(document.getElementById("longSec").value),m=1e3*(60*e+t),a=1e3*(60*n+o),r=1e3*(60*l+d);document.getElementById("pomoCount").innerHTML=String(e).padStart(2,"0")+":"+String(t).padStart(2,"0"),document.getElementById("shortCount").innerHTML=String(n).padStart(2,"0")+":"+String(o).padStart(2,"0"),document.getElementById("longCount").innerHTML=String(l).padStart(2,"0")+":"+String(d).padStart(2,"0");let i=0;document.getElementById("pomoStop").addEventListener("click",g),document.getElementById("shortStop").addEventListener("click",g),document.getElementById("longStop").addEventListener("click",g);for(let l=0;l<4;l++)setTimeout((function(){c(e,t)}),i),i+=m,setTimeout((function(){shortCountdown(n,o)}),i),i+=a;function g(){document.getElementById("bigPomo").style.display="block",document.getElementById("pomoSmall").style.display="none",document.getElementById("shortSmall").style.display="none",document.getElementById("longSmall").style.display="none",document.getElementById("bigPomo").reset();for(let e=0;e<1e4;e++)clearInterval(e)}function c(e,t){document.getElementById("bigPomo").style.display="none",document.getElementById("pomoSmall").style.display="block",document.getElementById("shortSmall").style.display="none",document.getElementById("longSmall").style.display="none";let n=1e3*(60*e+t),o=setInterval((function(){n-=1e3;let d=Math.floor(n/1e3/60),m=n/1e3%60;l.innerHTML=String(d).padStart(2,"0")+":"+String(m).padStart(2,"0"),0==n&&(clearInterval(o),l.innerHTML=String(e).padStart(2,"0")+":"+String(t).padStart(2,"0"))}),1e3);console.log(o);let l=document.getElementById("pomoCount")}setTimeout((function(){longCountdown(l,d)}),i),i+=r,setTimeout(g,i)}function shortCountdown(e,t){document.getElementById("bigPomo").style.display="none",document.getElementById("pomoSmall").style.display="none",document.getElementById("shortSmall").style.display="block",document.getElementById("longSmall").style.display="none";let n=1e3*(60*e+t),o=setInterval((function(){n-=1e3;let d=Math.floor(n/1e3/60),m=n/1e3%60;l.innerHTML=String(d).padStart(2,"0")+":"+String(m).padStart(2,"0"),0==n&&(clearInterval(o),l.innerHTML=String(e).padStart(2,"0")+":"+String(t).padStart(2,"0"))}),1e3);console.log(o);let l=document.getElementById("shortCount")}function longCountdown(e,t){document.getElementById("bigPomo").style.display="none",document.getElementById("pomoSmall").style.display="none",document.getElementById("shortSmall").style.display="none",document.getElementById("longSmall").style.display="block";let n=1e3*(60*e+t),o=setInterval((function(){n-=1e3;let d=Math.floor(n/1e3/60),m=n/1e3%60;l.innerHTML=String(d).padStart(2,"0")+":"+String(m).padStart(2,"0"),0==n&&(clearInterval(o),l.innerHTML=String(e).padStart(2,"0")+":"+String(t).padStart(2,"0"))}),1e3);console.log(o);let l=document.getElementById("longCount")}toggler.addEventListener("click",(()=>{toggler.classList.toggle("active"),menu.classList.toggle("active")})),document.getElementById("startPomo").addEventListener("click",determineTimes);
//# sourceMappingURL=pomodoro.fb433c01.js.map
