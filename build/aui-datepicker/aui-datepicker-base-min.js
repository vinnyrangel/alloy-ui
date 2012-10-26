AUI.add("aui-datepicker-base",function(s){var h=s.Lang,l=h.isArray,k=h.isBoolean,a=h.isFunction,m=h.isString,x=s.Array,v=s.DataType,r="calendar",o="contentBox",z="currentNode",b="dateFormat",p="date-picker",j=27,e="focus",y="formatter",g="locale",c="keypress",f="keydown",u="selectionMode",i="setValue",w="text",n="type",d="trigger";var t=s.Component.create({NAME:p,ATTRS:{calendar:{setter:"_setCalendar",value:{}},formatter:{value:function(C){var A=this,B=[];if(l(C)){x.each(C,function(E,D){B[D]=A.calendar.formatDate(E);});return B.join(",");}else{return A.calendar.formatDate(C);}},validator:a},setValue:{value:true,validator:k},stack:{lazyAdd:false,value:true,setter:"_setStack",validator:k},showOn:{value:"mousedown"},hideOn:{value:"mousedown"}},EXTENDS:s.OverlayContext,prototype:{initializer:function(){var B=this,A=B.get(r),C=new s.Calendar(A);B.calendar=C;B.after("calendar:selectionChange",B._afterSelectionChange);B.after(B._afterShow,B,"show");B._hideOnEscapeEvent();if(A.hasOwnProperty("selectedDates")){C.set("selectedDates",A.selectedDates);}},bindUI:function(){var A=this;t.superclass.bindUI.apply(this,arguments);A.on("show",A._onShowOverlay);A._bindTriggerEvents();},destructor:function(){var A=this;A.calendar.destroy();},_afterSelectionChange:function(B){var A=this;A._uiSetSelectedDates(B.newSelection);},_afterShow:function(B){var A=this;A.calendar.focus();},_bindTriggerEvents:function(){var A=this,B=A.get(d);B.after(e,function(){if(B.get(n)==w){A.show();}});B.after(c,function(){A.show();});},_hideOnEscapeEvent:function(){var A=this;s.on(f,function(B){if(B.keyCode==j){A.destructor();}});},_onShowOverlay:function(B){var A=this;A._renderCalendar();},_renderCalendar:function(){var A=this;A.calendar.render(A.get(o));},_setCalendar:function(B){var A=this;s.mix(B,{bubbleTargets:A});return B;},_setStack:function(B){var A=this;if(B){s.DatepickerManager.register(A);}else{s.DatepickerManager.remove(A);}return B;},_setTriggerValue:function(B){var A=this;var C=A.get(y).apply(A,[B]);A.get(z).val(C);},_uiSetSelectedDates:function(B){var A=this;if(A.calendar.get(u)!=="multiple"){A.hide();}if(A.get(i)){A._setTriggerValue(B);}if(B.length){A.calendar.set("date",B[B.length-1]);}}}});s.DatePicker=t;s.DatepickerManager=new s.OverlayManager({zIndexBase:1000});var q=function(){};q.ATTRS={dateFormat:{value:"%m/%d/%Y",validator:m},selectedDates:{readOnly:false,setter:function(B){var A=this;A._clearSelection();A.selectDates(B);}}};q.prototype={formatDate:function(D){var C=this,B=C.get(b),A=C.get(g);return v.Date.format(D,{format:B,locale:A});}};s.Base.mix(s.Calendar,[q]);},"@VERSION@",{skinnable:true,requires:["aui-datatype","calendar","aui-overlay-context"]});