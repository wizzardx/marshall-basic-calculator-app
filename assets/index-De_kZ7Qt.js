(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const l=10;function y(e){return e instanceof Error?e.message:"Unknown error"}function v(e,t,r){if(t)t.innerHTML=e,e.length>0?t.style.paddingLeft="5px":t.style.paddingLeft="0";else throw Error(`Could not find error message span for input ${r}`)}function L(){const e=document.querySelector("#result-value");if(e)return e;throw new Error("Could not find result element")}const E=(e,t,r,i)=>{e.addEventListener(t,r,i)};function S(e,t=E){t(e,"click",()=>{let r=0,i=!1;for(let o=1;o<=l;o++){const s=`#time${o}`,c=document.querySelector(s);if(!c)throw new Error(`Could not find element with selector ${s}`);const u=c.value.trim();let d="";const a=document.querySelector(`#time-error${o}`);if(!a)throw new Error(`Could not find error message span for input ${o}`);let f=0;if(u&&u.length>0)try{f=M(u)}catch(h){d=y(h),i=!0}r+=f,v(d,a,o)}const n=L();i?n.innerHTML="":n.innerHTML=w(r)})}function b(e){e.addEventListener("click",()=>{for(let r=1;r<=l;r++){const i=document.querySelector(`#time${r}`);i&&(i.value="")}const t=document.querySelector("#result-value");t&&(t.innerHTML="")})}function w(e){const t=Math.floor(e/60),r=e%60;return`${String(t).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function M(e){const t=e.replace(/\s/g,""),r=t.match(/^(\d+)h,(\d+)min$/);if(r)return parseInt(r[1])*60+parseInt(r[2]);{const i=t.match(/^(\d+)min$/);if(i)return parseInt(i[1]);throw new Error("Unknown time format")}}const p=document.querySelector("#app");if(p){let e="";for(let t=1;t<=l;t++)e+="<div class='input-and-error'>",e+=`<input id="time${t}" type="text" />`,e+=`<span id="time-error${t}" class="error-message"><strong></strong></span>`,e+="</div>";p.innerHTML=`
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
  `}const m=document.querySelector("button#add");m&&S(m);const g=document.querySelector("button#reset");g&&b(g);
