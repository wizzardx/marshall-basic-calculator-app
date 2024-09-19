(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();function d(r){r.addEventListener("click",()=>{let t=0;for(let i=1;i<=10;i++){const e=document.querySelector(`#time${i}`);e!=null&&e.value&&(t+=f(e.value))}const n=document.querySelector("#result-value");n&&(n.innerHTML=p(t))})}function a(r){r.addEventListener("click",()=>{for(let n=1;n<=10;n++){const i=document.querySelector(`#time${n}`);i&&(i.value="")}const t=document.querySelector("#result-value");t&&(t.innerHTML="")})}function f(r){const[t,n]=r.split(":").map(Number);return t*60+n}function p(r){const t=Math.floor(r/60),n=r%60;return`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`}const s=document.querySelector("#app");if(s){let r="";for(let t=1;t<=10;t++)r+=`<input id="time${t}" type="time" />`;s.innerHTML=`
    <div id="calculator">
        Marshall's Basic Calculator App
      <div id="user-inputs">
          ${r}
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
