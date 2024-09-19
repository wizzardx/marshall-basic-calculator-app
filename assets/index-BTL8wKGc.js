(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();function d(u){u.addEventListener("click",()=>{let t=0;for(let n=1;n<=10;n++){const e=document.querySelector(`#num${n}`);e!=null&&e.value&&(t+=parseInt(e.value))}const o=document.querySelector("#result-value");o&&(o.innerHTML=t.toString())})}function a(u){u.addEventListener("click",()=>{for(let o=1;o<=10;o++){const n=document.querySelector(`#num${o}`);n&&(n.value="")}const t=document.querySelector("#result-value");t&&(t.innerHTML="")})}const s=document.querySelector("#app");if(s){let u="";for(let t=1;t<=10;t++)u+=`<input id="num${t}" type="number" />`;s.innerHTML=`
    <div id="calculator">
        Marshall's Basic Calculator App
      <div id="user-inputs">
          ${u}
          <div id="buttons">
            <button id="add" type="button">Add</button>
            <button id="reset" type="button">Reset</button>
          </div>
      </div>
      <div id="result">
          Result: &nbsp;<span id="result-value"></span>
      </div>
    </div>
  `}const c=document.querySelector("button#add");c&&d(c);const l=document.querySelector("button#reset");l&&a(l);
