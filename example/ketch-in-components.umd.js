(function(l,a){typeof exports=="object"&&typeof module!="undefined"?a(exports):typeof define=="function"&&define.amd?define(["exports"],a):(l=typeof globalThis!="undefined"?globalThis:l||self,a(l.ketchInComponents={}))})(this,function(l){"use strict";var O=Object.defineProperty,_=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var g=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var y=(l,a,u)=>a in l?O(l,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):l[a]=u,E=(l,a)=>{for(var u in a||(a={}))w.call(a,u)&&y(l,u,a[u]);if(g)for(var u of g(a))R.call(a,u)&&y(l,u,a[u]);return l},T=(l,a)=>_(l,A(a));var i=(l,a,u)=>(y(l,typeof a!="symbol"?a+"":a,u),u);var a="";const u={removeDelay:2e3};class p{constructor(e,t){i(this,"target");i(this,"options");this.target=e,this.options=t||{},this.clear()}getOption(e){return this.options[e]||u[e]}clear(){this.target.innerText=""}}const f="ketch-in-components";function v(c,e){const t=document.createElement(c,e);return t.className=f,t}class C{constructor({data:e,defaultClassName:t,removeDelay:n=2e3}){i(this,"data");i(this,"state");i(this,"element");i(this,"defaultClassName");i(this,"removeDelay");this.data=e,this.state="unmount",this.defaultClassName=t||"",this.removeDelay=n,this.element=this.createElement("div")}setRemoveDelay(e){return this.removeDelay=e,this}getRemoveDelay(){return this.removeDelay}createElement(e,t){const n=v(e,t);return n.classList.add(this.defaultClassName),n}getData(){return this.data}setState(e){return this.state=e,this.isUnmounting()?this.element.classList.add("unmount"):this.element.classList.remove("unmount"),this}getState(){return this.state}getElement(){return this.element}isMount(){return this.getState()==="mount"}isUnmount(){return this.getState()==="unmount"}isUnmounting(){return this.getState()==="unmounting"}async clear(){return this.isUnmount()||await this.unmount(),this.element=this.createElement("div"),this}async mount(e){return this.isMount()&&await this.unmount(),e.append(this.element),this.setState("mount")}unmount(){return new Promise(e=>{if(!this.isMount()){const t=setInterval(()=>{if(this.isUnmount())return clearInterval(t),e(this)},1e3)}this.setState("unmounting"),setTimeout(()=>{this.element.parentElement&&this.element.parentElement.removeChild(this.element),this.setState("unmount").clear().then(()=>e(this))},this.getRemoveDelay())})}}class b extends C{constructor({children:t,removeDelay:n,data:s={},onClose:o=()=>{}}){super({data:s,removeDelay:n,defaultClassName:"modal"});i(this,"children");i(this,"onClose");this.children=t,this.onClose=()=>o(this)}mount(t){const n=this.getElement(),s=this.createElement("div");s.append(this.children),s.classList.add("body"),n.appendChild(s);const o=this.createElement("span");return o.innerText="\uB2EB\uAE30",o.classList.add("close"),o.onclick=()=>{o.onclick=()=>{},this.unmount().then(this.onClose)},n.appendChild(o),super.mount(t)}}class L extends p{constructor(e,t){super(e,t)}add(e){return new b(T(E({},e),{removeDelay:this.getOption("removeDelay")})).mount(this.target)}}class k extends C{constructor({children:t,buttons:n,removeDelay:s,data:o={},onClick:r=()=>{}}){super({data:o,removeDelay:s,defaultClassName:"select-modal"});i(this,"children");i(this,"buttons");i(this,"onClick");this.children=t,this.buttons=n,this.onClick=(h,m,d)=>(r(h,m,d),this)}click(t){return super.unmount().then(()=>this.onClick(this,t,this.buttons[t]))}mount(t){const n=this.getElement(),s=this.createElement("div");return s.append(this.children),s.classList.add("body"),n.appendChild(s),Object.keys(this.buttons).map(o=>{const r=this.createElement("button");r.classList.add("btn"),r.innerText=this.buttons[o],r.onclick=()=>{r.onclick=()=>{},this.click(o)},n.append(r)}),super.mount(t)}}class D extends p{constructor(e,t){super(e,t)}add(e){return new k(T(E({},e),{removeDelay:this.getOption("removeDelay")})).mount(this.target)}}class S extends C{constructor({data:t,removeDelay:n,defaultClassName:s,momentDelay:o=2e3}){super({data:t,removeDelay:n,defaultClassName:s});i(this,"momentDelay");i(this,"momentTimeout");this.momentDelay=o,this.momentTimeout=null}setMomentTimeout(t){return this.momentTimeout=t,this}async mount(t){return super.mount(t).then(()=>this.setMomentTimeout(setTimeout(()=>this.unmount(),this.momentDelay)))}unmount(){return this.momentTimeout&&(clearTimeout(this.momentTimeout),this.setMomentTimeout(null)),super.unmount()}}class x extends S{constructor({children:t,data:n={},removeDelay:s=2e3,momentDelay:o=2e3,onClick:r=()=>{},onClose:h=()=>{}}){super({removeDelay:s,momentDelay:o,data:n,defaultClassName:"toast"});i(this,"children");i(this,"onClick");i(this,"onClose");this.children=t,this.onClick=r,this.onClose=m=>h(this,m)}mount(t){const n=this.getElement(),s=this.createElement("div"),o=this.createElement("span");return s.append(this.children),o.innerText="\uB2EB\uAE30",s.classList.add("text"),o.classList.add("close"),n.appendChild(s),n.appendChild(o),n.onclick=r=>{n.onclick=()=>{},!r.composedPath().some(h=>h===o)&&this.unmount(!0).then(this.onClick)},o.onclick=()=>{o.onclick=()=>{},this.unmount(!0)},super.mount(t)}unmount(t=!1){if(this.isMount()){const n=this.onClose(t),s=!!n||n===0?n:this.getRemoveDelay();this.setRemoveDelay(s)}return super.unmount()}}class M extends p{constructor(e,t){super(e,t)}add(e){return new x(T(E({},e),{removeDelay:this.getOption("removeDelay")})).mount(this.target)}}class P extends C{constructor({data:t={},status:n="",handlePen:s=()=>{},handleShape:o=()=>{},handleColor:r=()=>{},onClear:h=()=>{}}){super({data:t,defaultClassName:"toolbar"});i(this,"status");i(this,"handlePen");i(this,"handleShape");i(this,"handleColor");i(this,"onClear");this.status=n,this.handlePen=s,this.handleShape=o,this.handleColor=r,this.onClear=h}mount(t){const n=this.getElement(),s=this.createElement("div"),o=this.createElement("span"),r=this.createElement("button"),h=this.createElement("button"),m=this.createElement("button"),d=this.createElement("button");return s.classList.add("wrapper"),o.innerText=`[${this.status}]`,o.classList.add("status"),r.innerText="PEN",r.classList.add("btn_pen"),h.innerText="SHAPE_COMP",h.classList.add("select_shape"),m.innerText="PALETTE",m.classList.add("palette"),d.innerText="CLEAR_ALL",d.classList.add("btn_clear"),s.appendChild(o),s.appendChild(r),s.appendChild(h),s.appendChild(m),s.appendChild(d),n.appendChild(s),r.onclick=this.handlePen,h.onclick=this.handleShape,m.onclick=this.handleColor,d.onclick=this.onClear,super.mount(t)}}class N extends p{constructor(e,t){super(e,t)}add(e){return new P(e).mount(this.target)}}l.ModalController=L,l.SelectModalController=D,l.ToastController=M,l.ToolbarController=N,Object.defineProperties(l,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});