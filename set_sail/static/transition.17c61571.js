import{_ as f}from"./plugin-vue_export-helper.db4a78ed.js";import{e as r,g as s,F as a,l as d,j as n}from"./_@vue_runtime-core@3.2.37@@vue.df642cff.js";import{I as c,p as h,q as p}from"./_@vue_shared@3.2.37@@vue.0cd2f4d6.js";import"./_@vue_reactivity@3.2.37@@vue.02b7193f.js";const g={data(){return{items:null}},mounted(){let e=this;e.items=document.querySelectorAll(".block"),e.handleScroll(),window.addEventListener("scroll",this.handleScroll)},methods:{random(e,t){return Math.floor(Math.random()*(t-e+1)+e)},getClassName(e){if(e==1)return"toScaleBig";if(e==2)return"toTop";if(e==3)return"toBottom";if(e==4)return"toLeft";if(e==5)return"toRight";if(e==6)return"toRoate";if(e==7)return"toScaleSmall"},isElementInViewport(e){var t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)},handleScroll(e){let t=this;window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;for(let o=0;o<t.items.length;o++)t.isElementInViewport(t.items[o])&&t.items[o].classList.add("in-view")}}},v={class:"title"},w={class:"content"};function y(e,t,o,S,k,i){return r(),s("div",null,[(r(),s(a,null,d(7,(l,m)=>n("div",{class:"block",key:m},[n("div",v,"BLOCK "+c(l),1),n("div",w,[(r(),s(a,null,d(4,(u,_)=>n("span",{key:_,class:h(i.getClassName(l)),style:p(`background:hsl(${210-l*30}, 100%, ${i.random(63,90)}%); transition-delay: ${u/10}s`)},c(l),7)),64))])])),64))])}var L=f(g,[["render",y],["__scopeId","data-v-430d2a9e"]]);export{L as default};
