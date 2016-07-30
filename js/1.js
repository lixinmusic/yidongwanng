

//获取元素
 
/*function $(select,content){
   var content=content?content:document
   var first=select.charAt(0);
       if (first==".") {
          return getClass(select.slice(1),content)
       } 
       else if(first=="#"){
         return content.getElementById(select.slice(1))
       }
       else if (/^[a-z][a-z1-6]{0,8}$/.test(select)) { 
         return content.getElementsByTagName(select)
       } 
}*/
function $(select,ranges){
	if (typeof select=='string') {
    var ranges=ranges?ranges:document;
	if(select.charAt(0)=="."){
		return getClass(select.slice(1),ranges);
	}else if(select.charAt()=="#"){
		return document.getElementById(select.slice(1));
	}else if(/^[a-z][a-z1-6]{0,8}$/.test(select)){
		return ranges.getElementsByTagName(select);
	
	}else if(/^<[a-z][a-z1-6]{0,8}>$/.test(select)){
		return document.createElement(select.slice(1,-1));
	}
	 
	} else if(typeof select=='function'){
		/*addEvent(window,'load',selecter)*/
	    window.onload=function(){
           select()    //select()=&(function(){})
	    
	    }
	}

}


function getClass(className,range){
	// 设置范围
	var range=range?range:document;
	// 判断浏览器
	if(document.getElementsByClassName){
		// w3c
		return range.getElementsByClassName(className);
	}else{
		// ie6~8
		// arr 保存指定的className对象
		// 获取所有的元素
		var all=range.getElementsByTagName("*");
		// 挑选指定的元素
		var arr=[];
		for(var i=0;i<all.length;i++){
			// 函数：判断当前元素的className是否包含指定的className
			if(checkClass(all[i].className,className)){
				arr.push(all[i]);
			}
		}
		// 挑选完毕。将数组输出
		return arr;

	}
}

function checkClass(obj,className){
	// 检查obj里面是否包含className
	// obj one two
	// className  "one"
	var arr=obj.split(" ");
	for(var i=0;i<arr.length;i++){
		if(arr[i]==className){
			return true;

		}
	}
	return false;
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}

//***************************************
//***************************************

function firstChild(obj){
      		return getChilds(obj)[0]
      	}


    function lastChild(obj){
      		var length=getChilds(obj).length;
      		return getChilds(obj)[length-1]
      	}

function arndomChild(obj,num){
      		
      		return getChilds(obj)[num]
      	}

/*function getChilds(){
    type=type==undefined?true:type;

    var new=[];
    for (var i = 0; i < Child.length; i++) {
      	
         if(Child[i].nodeType==1){
             new.push=Child[i];  
         }
         return new;
      };
   
   parent.getChild()
   Node.prototype.getChild=function(){
      var chlid=this.childNodes;
      var arr=[];
      for (var i = 0; i < child.length; i++) {
           if(child[i].nodeType){

      }
      };

      return new;
   }
}*/
function getChilds(obj,type){
      	var objs=obj.childNodes
      	var newarr=[]
      	type=type==undefined?true:type;
      		if(type==true){
      			for (var i = 0; i <objs.length; i++) {
      			if(objs[i].nodeType==1){
                    newarr.push(objs[i])
      			}
      		}
      		}
      		if(type==false){
	      		for (var i = 0; i <objs.length; i++) {
	      			if(objs[i].nodeType==1){
	                    newarr.push(objs[i])
	      			}
	      		}
	      	}	
      		return newarr;
      	}


/*
beforeChild(obj,div)
给元素最前面插入一个元素
obj 父元素
div 要插入元素
思路1、获得父元素obj的第一个子元素
2、obj.insterBefore(div,firstChild)
*/

function beforeChild(obj,child){
      var first=firstChild(obj)
   obj.insertBefore(child,first);

}

//***********************************
 /*insterAfter(obj,div，true)
  给元素的后面插入一个元素
  obj 插入的位置
  div 要插入的元素
  type；类型  true 忽略文本 false 不能忽略文本
  思路1.是否有下一个兄弟节点，
  往下一个兄弟节点前面插入元素
  如果没有兄弟节点，直接往父元素后面插入


*/
function insertAfter(obj,ele,type){
	type=type==undefined?true:type;

	var parent=obj.parentNode;//获取父元素
	
	var next=getNext(obj,type);
	if (next) {
		parent.insertBefore(ele,next);
	} else{
		parent.appendChild(ele);
	} 

}
/*getNext(obj,true)
获得obj的下一个兄弟节点，如果有兄弟节点则返回
兄弟节点。如果没有返回flase
obj  指定的对象
type；类型  true 忽略文本（默认） 

            false 不能忽略文本
1.判断是否有下一个兄弟节点（next） a、返回flase
b、有判断next是否是一个元素（有意义的文本） 
3、更新next，继续寻找下一个兄弟节点
  判断next是否为空
  如果是空     返回fasle
  不是空  重复步骤b 继续找
*/
function getNext(obj,type){
	type=type==undefined?true:type;
		if (type) {
			//忽略文本
			var next=obj.nextSibling;
			if (next==null) {
				return false;
			}
		//next类型是一个注释或是文本
	   while(next.nodeType==8||next.nodeType==3){
             //更新
             next=next.nextSibling;
	         //更新的同时看下一个是否为空
	         if (next==null) {
				return false;
				}

	   }
	 
        return next;
	 }else{
		//不能忽略文本	
       var next=obj.nextSibling;
			if (next==null) {
				return false;
			}
		//next类型是一个注释或是文本
	   while(next.nodeType==8||(next.nodeType==3&&!(next.nodeValue.replace(/^\s+|\s+$/g,"")))){
             //更新
             next=next.nextSibling;
	         //更新的同时看下一个是否为空
	         if (next==null) {
				return false;
				}

	   }
	 
        return next;

      }

}








