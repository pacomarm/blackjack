const myModule=(()=>{"use strict";let e=[],t=["C","D","H","S"],o=["A","J","Q","K"],l=[];const r=document.querySelector("#bTake"),n=document.querySelector("#bStop"),d=document.querySelector("#bNew"),s=document.querySelectorAll("small"),a=document.querySelectorAll(".divCartas"),c=()=>{e=[];for(let o=2;o<11;o++)for(let l of t)e.push(o+l);for(let l of t)for(let t of o)e.push(t+l);e=_.shuffle(e)},i=()=>{if(e.length<1)throw"Error no cards bro";return e.pop()},u=(e,t)=>(l[t]+=1*(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"==t?"11":10:1*t})(e),s[t].innerText=l[t],l[t]),b=(e,t)=>{const o=document.createElement("img");o.src=`cartas/${e}.png`,o.classList.add("carta"),a[t].append(o)},f=e=>{let t=0;do{let e=i();t=u(e,l.length-1),b(e,l.length-1)}while(t<e&&e<=21);setTimeout(()=>{m()},15)},m=()=>{const[e,t]=l;e>21?alert("CPU won bro"):t>21?alert("U won bro"):e==t?alert("we tied bro"):e>t?alert("U won bro"):alert("CPU won bro"),d.disabled=!1,n.disabled=!0};return r.addEventListener("click",()=>{let e=i();const t=u(e,0);b(e,0),t>21?(r.disabled=!0,n.disabled=!0,f(t)):21===t&&(r.disabled=!0,n.disabled=!0,f(t))}),n.addEventListener("click",()=>{r.disabled=!0,d.disabled=!0,f(l[0])}),d.addEventListener("click",()=>{window.location.reload()}),((e=2)=>{c();for(let t=0;t<e;t++)l.push(0);console.log({playersPoints:l})})(2),{}})();




