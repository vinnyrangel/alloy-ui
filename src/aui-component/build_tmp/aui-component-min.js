AUI.add("aui-component",function(B){var F=B.Lang,D=B.ClassNameManager.getClassName,H="component",C=D(H),G=D("helper","hidden");var E=function(I){var A=this;A._originalConfig=I;E.superclass.constructor.apply(this,arguments);};E.NAME="component";E.ATTRS={cssClass:{lazyAdd:false,value:null},hideClass:{value:G},owner:{validator:function(I){var A=this;return I instanceof B.Widget||I===null;}},relayEvents:{value:true},render:{value:false,writeOnce:true}};B.extend(E,B.Widget,{initializer:function(I){var A=this;if(I){A._uiSetCssClass(I.cssClass);}A._setOwnerComponent(A.get("ownerComponent"));A._setRelayEvents(A.get("relayEvents"));A._setComponentClassNames();A.after("cssClassChange",A._afterCssClassChange);A.after("destroy",A._afterComponentDestroy);A.after("ownerChange",A._afterComponentOwnerChange);A.after("relayEventsChange",A._afterComponentRelayEventsChange);A.after("visibleChange",A._afterComponentVisibleChange);},clone:function(I){var A=this;I=I||{};I.id=I.id||B.guid();B.mix(I,A._originalConfig);return new A.constructor(I);},toggle:function(){var A=this;return A.set("visible",!A.get("visible"));},_afterComponentDestroy:function(I){var A=this;try{A.get("boundingBox").remove();}catch(J){}},_afterComponentOwnerChange:function(I){var A=this;A._setOwnerComponent(I.newVal);},_afterComponentRelayEventsChange:function(I){var A=this;A._setRelayEvents(I.newVal);},_afterComponentVisibleChange:function(J){var A=this;var L=A.get("hideClass");if(L!==false){var I=A.get("boundingBox");var K="addClass";if(J.newVal){K="removeClass";}I[K](L||G);}},_afterCssClassChange:function(I){var A=this;A._uiSetCssClass(I.newVal,I.prevVal);},_relayEvents:function(){var A=this;E.superclass.fire.apply(A,arguments);var I=A._ownerComponent;if(I){I.fire.apply(I,arguments);}},_setComponentClassNames:function(){var A=this;var L=A._getClasses();var J;var I=[];for(var K=L.length-4;K>=0;K--){var J=L[K].NAME.toLowerCase();I.push(D(J,"content"));}A.get("contentBox").addClass(I.join(" "));},_setRelayEvents:function(I){var A=this;if(I){A.fire=A._relayEvents;}else{A.fire=E.superclass.fire;}},_setOwnerComponent:function(I){var A=this;A._ownerComponent=I;},_uiSetCssClass:function(L,N){var I=this;var M=N+"-content";var A=L+"-content";var K=I.get("boundingBox");var J=I.get("contentBox");K.replaceClass(N,L);J.replaceClass(M,A);}});B.Component=E;},"@VERSION@",{skinnable:false,requires:["widget"]});