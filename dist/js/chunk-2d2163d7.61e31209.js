(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2163d7"],{c22d:function(t,o,n){"use strict";n.r(o);var e=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"container vue"},[t._l(t.posts[0].slice(0,t.pokemonToShow),(function(o){return n("div",{key:o},[n("div",[t._v(" "+t._s(o.name)+" "+t._s(o.data.id))])])})),t.posts[0].length>4&&t.pokemonToShow<t.posts[0].length?n("button",{on:{click:t.loadMore}},[t._v(" Load more articles ")]):t._e()],2)},s=[],a=(n("4160"),n("159b"),n("bc3a")),i=n.n(a),c={data:function(){return{posts:[],pokemonToShow:1}},methods:{getList:function(){var t=this;this.busy=!0,i.a.get("https://pokeapi.co/api/v2/pokemon/?limit=30").then((function(o){t.posts.push(o.data.results),t.posts[0].forEach((function(t){i.a.get(t.url).then((function(o){return t.data=o.data}))}))}))},loadMore:function(){this.pokemonToShow+=2}},created:function(){this.getList()}},u=c,r=n("2877"),p=Object(r["a"])(u,e,s,!1,null,null,null);o["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d2163d7.61e31209.js.map