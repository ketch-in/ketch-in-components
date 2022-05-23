(function(l,o){typeof exports=="object"&&typeof module!="undefined"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(l=typeof globalThis!="undefined"?globalThis:l||self,o(l.ketchInComponents={}))})(this,function(l){"use strict";var N=Object.defineProperty,O=Object.defineProperties;var R=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable;var y=(l,o,u)=>o in l?N(l,o,{enumerable:!0,configurable:!0,writable:!0,value:u}):l[o]=u,h=(l,o)=>{for(var u in o||(o={}))P.call(o,u)&&y(l,u,o[u]);if(f)for(var u of f(o))w.call(o,u)&&y(l,u,o[u]);return l},d=(l,o)=>O(l,R(o));var r=(l,o,u)=>(y(l,typeof o!="symbol"?o+"":o,u),u);var o="";const u={removeDelay:2e3};class p{constructor(e,t){r(this,"target");r(this,"options");this.target=e,this.options=t||{},this.clear()}getOption(e){return this.options[e]||u[e]}clear(){this.target.innerText=""}}const g="ketch-in-components";function v(m,e){const t=document.createElement(m,e);return t.className=g,t}class C{constructor({data:e,defaultClassName:t,removeDelay:n=2e3}){r(this,"data");r(this,"state");r(this,"element");r(this,"defaultClassName");r(this,"removeDelay");this.data=e,this.state="unmount",this.defaultClassName=t||"",this.removeDelay=n,this.element=this.createElement("div")}setRemoveDelay(e){return this.removeDelay=e,this}getRemoveDelay(){return this.removeDelay}createElement(e,t){const n=v(e,t);return console.log(n,this.defaultClassName),n.classList.add(this.defaultClassName),n}getData(){return this.data}setState(e){return this.state=e,this.isUnmounting()?this.element.classList.add("unmount"):this.element.classList.remove("unmount"),this}getState(){return this.state}getElement(){return this.element}isMount(){return this.getState()==="mount"}isUnmount(){return this.getState()==="unmount"}isUnmounting(){return this.getState()==="unmounting"}async clear(){return this.isUnmount()||await this.unmount(),this.element=this.createElement("div"),this}async mount(e){return this.isMount()&&await this.unmount(),e.append(this.element),this.setState("mount")}unmount(){return new Promise(e=>{if(!this.isMount()){const t=setInterval(()=>{if(this.isUnmount())return clearInterval(t),e(this)},1e3)}this.setState("unmounting"),setTimeout(()=>{this.element.parentElement&&this.element.parentElement.removeChild(this.element),this.setState("unmount").clear().then(()=>e(this))},this.getRemoveDelay())})}}class T extends C{constructor({children:t,removeDelay:n,data:i={},onClose:s=()=>{}}){super({data:i,removeDelay:n,defaultClassName:"modal"});r(this,"children");r(this,"onClose");this.children=t,this.onClose=()=>s(this)}mount(t){const n=this.getElement(),i=this.createElement("div");i.append(this.children),i.classList.add("body"),n.appendChild(i);const s=this.createElement("span");return s.innerText="\uB2EB\uAE30",s.classList.add("close"),s.onclick=()=>{s.onclick=()=>{},this.unmount().then(this.onClose)},n.appendChild(s),super.mount(t)}}class D extends p{constructor(e,t){super(e,t)}add(e){return new T(d(h({},e),{removeDelay:this.getOption("removeDelay")})).mount(this.target)}}class k extends C{constructor({children:t,buttons:n,removeDelay:i,data:s={},onClick:a=()=>{}}){super({data:s,removeDelay:i,defaultClassName:"select-modal"});r(this,"children");r(this,"buttons");r(this,"onClick");this.children=t,this.buttons=n,this.onClick=(c,E,L)=>(a(c,E,L),this)}click(t){return super.unmount().then(()=>this.onClick(this,t,this.buttons[t]))}mount(t){const n=this.getElement(),i=this.createElement("div");return i.append(this.children),i.classList.add("body"),n.appendChild(i),Object.keys(this.buttons).map(s=>{const a=this.createElement("button");a.classList.add("btn"),a.innerText=this.buttons[s],a.onclick=()=>{a.onclick=()=>{},this.click(s)},n.append(a)}),super.mount(t)}}class x extends p{constructor(e,t){super(e,t)}add(e){return new k(d(h({},e),{removeDelay:this.getOption("removeDelay")})).mount(this.target)}}class M extends C{constructor({data:t,removeDelay:n,defaultClassName:i,momentDelay:s=2e3}){super({data:t,removeDelay:n,defaultClassName:i});r(this,"momentDelay");r(this,"momentTimeout");this.momentDelay=s,this.momentTimeout=null}setMomentTimeout(t){return this.momentTimeout=t,this}async mount(t){return super.mount(t).then(()=>this.setMomentTimeout(setTimeout(()=>this.unmount(),this.momentDelay)))}unmount(){return this.momentTimeout&&(clearTimeout(this.momentTimeout),this.setMomentTimeout(null)),super.unmount()}}class S extends M{constructor({text:t,data:n={},removeDelay:i=2e3,momentDelay:s=2e3,onClick:a=()=>{},onClose:c=()=>{}}){super({removeDelay:i,momentDelay:s,data:n,defaultClassName:"toast"});r(this,"text");r(this,"onClick");r(this,"onClose");this.text=t,this.onClick=a,this.onClose=E=>c(this,E)}mount(t){const n=this.getElement(),i=this.createElement("p"),s=this.createElement("span");return i.innerText=this.text,s.innerText="\uB2EB\uAE30",i.classList.add("text"),s.classList.add("close"),n.appendChild(i),n.appendChild(s),n.onclick=a=>{n.onclick=()=>{},!a.composedPath().some(c=>c===s)&&this.unmount(!0).then(this.onClick)},s.onclick=()=>{s.onclick=()=>{},this.unmount(!0)},super.mount(t)}unmount(t=!1){if(this.isMount()){const n=this.onClose(t),i=!!n||n===0?n:this.getRemoveDelay();this.setRemoveDelay(i)}return super.unmount()}}class b extends p{constructor(e,t){super(e,t)}add(e){return new S(d(h({},e),{removeDelay:this.getOption("removeDelay")})).mount(this.target)}}l.ModalController=D,l.SelectModalController=x,l.ToastController=b,Object.defineProperties(l,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
