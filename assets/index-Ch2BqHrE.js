(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const d=10;function g(t){return t instanceof Error?t.message:"Unknown error"}function v(t,e,r){if(e)e.textContent=t,t.length>0?e.style.paddingLeft="5px":e.style.paddingLeft="0";else throw Error(`Could not find error message span for input ${r}`)}function b(){const t=document.querySelector("#result-value");if(t)return t;throw new Error("Could not find result element")}const $=(t,e,r,s)=>{t.addEventListener(e,r,s)};function E(t,e=$){e(t,"click",()=>{let r=0,s=!1;for(let o=1;o<=d;o++){const i=`#time${o}`,a=document.querySelector(i);if(!a)throw new Error(`Could not find element with selector ${i}`);const c=a.value.trim();let f="";const m=document.querySelector(`#time-error${o}`);if(!m)throw new Error(`Could not find error message span for input ${o}`);if(c&&c.length>0)try{let u=L(c);const l=document.querySelector(`#subtract${o}`);l!=null&&l.checked&&(u=-u),r+=u}catch(u){f=g(u),s=!0}v(f,m,o)}const n=b();s?n.textContent="":(r=Math.max(0,r),n.textContent=w(r))})}function S(t){t.addEventListener("click",()=>{for(let r=1;r<=d;r++){const s=document.querySelector(`#time${r}`);s&&(s.value="");const n=document.querySelector(`#subtract${r}`);n&&(n.checked=!1)}const e=document.querySelector("#result-value");e&&(e.innerHTML="")})}function w(t){const e=Math.floor(t/60),r=t%60;return e===0?`${r} min`:`${e} h, ${r} min`}function L(t){const e=t.replace(/\s/g,""),r=e.match(/^(\d+)h,(\d+)min$/);if(r)return parseInt(r[1])*60+parseInt(r[2]);{const s=e.match(/^(\d+)min$/);if(s)return parseInt(s[1]);throw new Error("Unknown time format")}}const p=document.querySelector("#app");if(p){let t="";for(let e=1;e<=d;e++)t+=`
      <div class="input-and-error">
        <div class="input-row">
          <input id="time${e}" type="text" />
          <label class="subtract-control">
            <input type="checkbox" id="subtract${e}" />
            <span>Subtract</span>
          </label>
        </div>
        <span id="time-error${e}" class="error-message"><strong></strong></span>
      </div>
    `;p.innerHTML=`
    <div id="calculator">
      Marshall's Basic Calculator App
      <div id="user-inputs">
        ${t}
        <div id="buttons">
          <button id="add" type="button">Calculate</button>
          <button id="reset" type="button">Reset</button>
        </div>
      </div>
      <div id="result">
        Result: &nbsp;<span id="result-value"></span>
      </div>
    </div>
  `}const h=document.querySelector("button#add");h&&E(h);const y=document.querySelector("button#reset");y&&S(y);
