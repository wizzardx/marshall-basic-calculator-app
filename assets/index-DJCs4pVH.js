(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const l=10;function y(e){return e instanceof Error?e.message:"Unknown error"}function v(e,t,r){if(t)t.textContent=e,e.length>0?t.style.paddingLeft="5px":t.style.paddingLeft="0";else throw Error(`Could not find error message span for input ${r}`)}function E(){const e=document.querySelector("#result-value");if(e)return e;throw new Error("Could not find result element")}const S=(e,t,r,s)=>{e.addEventListener(t,r,s)};function b(e,t=S){t(e,"click",()=>{let r=0,s=!1;for(let o=1;o<=l;o++){const i=`#time${o}`,c=document.querySelector(i);if(!c)throw new Error(`Could not find element with selector ${i}`);const u=c.value.trim();let d="";const a=document.querySelector(`#time-error${o}`);if(!a)throw new Error(`Could not find error message span for input ${o}`);let f=0;if(u&&u.length>0)try{f=$(u)}catch(h){d=y(h),s=!0}r+=f,v(d,a,o)}const n=E();s?n.textContent="":n.textContent=L(r)})}function w(e){e.addEventListener("click",()=>{for(let r=1;r<=l;r++){const s=document.querySelector(`#time${r}`);s&&(s.value="")}const t=document.querySelector("#result-value");t&&(t.innerHTML="")})}function L(e){const t=Math.floor(e/60),r=e%60;return`${String(t).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function $(e){const t=e.replace(/\s/g,""),r=t.match(/^(\d+)h,(\d+)min$/);if(r)return parseInt(r[1])*60+parseInt(r[2]);{const s=t.match(/^(\d+)min$/);if(s)return parseInt(s[1]);throw new Error("Unknown time format")}}const p=document.querySelector("#app");if(p){let e="";for(let t=1;t<=l;t++)e+="<div class='input-and-error'>",e+=`<input id="time${t}" type="text" />`,e+=`<span id="time-error${t}" class="error-message"><strong></strong></span>`,e+="</div>";p.innerHTML=`
    <div id="calculator">
        Marshall's Basic Calculator App
      <div id="user-inputs">
          ${e}
          <div id="buttons">
            <button id="add" type="button">Calculate</button>
            <button id="reset" type="button">Reset</button>
          </div>
      </div>
      <div id="result">
          Result: &nbsp;<span id="result-value"></span>
      </div>
    </div>
  `}const m=document.querySelector("button#add");m&&b(m);const g=document.querySelector("button#reset");g&&w(g);
