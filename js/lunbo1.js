//通过改变位置left
$(function(){
var win=$(".banner_middle")[0];  //窗口
 var as=$("a",win);  
 var lis=$("li",$(".point")[0]);
 var butl=$(".butl")[0];
var butr=$(".butr")[0];

 //字符串转化成数字
var widths=parseInt(getStyle(as[0],"width"));
var num=0;
var next=0;
/*自动轮播(双下标)：
    num记录当前窗口图片
    next记录即将显示图片
  在动画之前下一张图片就为，left=widths
  动画
  num  left=-widths
  next  left=0
  更新num=next
*/

//初始化第一张
 var flag=true;
for (var i = 0; i < as.length; i++) {
    if(i==0){
      continue;//跳过本次循环
    }
   
   as[i].style.left=widths+"px";
};
//自动轮播
var t=setInterval(moveL,2000);
   
  win.onmouseover=function(){
  clearInterval(t)
}
win.onmouseout=function(){

  t=setInterval(moveL,2000);
}

//选项卡
for (var i= 0; i<lis.length; i++) {
  lis[i].index=i;
  lis[i].onclick=function(){
       // (this.index)相当于next
      //就位
      if(num==this.index){
         return;
      }
      as[this.index].style.left=widths+"px";
     lis[num].className="";
    lis[this.index].className="hot";
       animate(as[num],{left:-widths});
      animate(as[this.index],{left:0});     
       //同时更新
       next=this.index;
        num=this.index;
  }
  }
   
   //右边按钮
  butr.onclick=function(){
 if(flag){
   flag=false
 moveL();

}  
}  
//左边按钮
butl.onclick=function(){
   if(flag){
flag=false
   moveR();
}
}  

function moveL(){
    next++;
  if(next==as.length){
      next=0
  };
  //  就位 不需要动画，直接用css
   as[next].style.left=widths+"px";
   //按钮
  //初始化状态
   lis[num].className="";
   lis[next].className="hot";
   //动画当前的向左移动
   animate(as[num],{left:-widths})
   //下一张到当前位置
   animate(as[next],{left:0},function(){
    flag=true;
   });
   //更新
   num=next;
}
   

function moveR(){
    next--;
 
  if(next<0){
     next=lis.length-1;
  }
//  就位 不需要动画，直接用css
   as[next].style.left=-widths+"px";
   //按钮
  //初始化状态
   lis[num].className="";
   lis[next].className="hot";

   //动画当前的向左移动
   animate(as[num],{left:widths})
   //下一张到当前位置
   animate(as[next],{left:0},function(){
    flag=true;
   })
   //更新
   num=next;
}









// 先获取元素
var list=$(".list");
var ltem=$(".ltem");
// 循环分别给每一添加个元素onmouseover onmouseout
for(var i=0;i<list.length;i++){
  // 先执行for后执行事件
  list[i].index=i;
   list[i].onmouseover=function(){
   ltem[this.index].style.display="block";
},  
   list[i].onmouseout=function(){
   ltem[this.index].style.display="none";
    }
}


// 方法2
/*window.onload=function(){
// 先获取元素
var list=$(".list");
var ltem=$(".ltem");
// 循环分别给每一添加个元素onmouseover onmouseout
for(let i=0;i<list.length;i++){
  // 先执行for后执行事件
  list[i].index=i;
   list[i].onmouseover=function(){
   ltem[i].style.display="block";
},  
   list[i].onmouseout=function(){
      ltem[i].style.display="none";
  } 
 }

}*/

// 方法3

// // 先获取元素
// var list=$(".list");
// var ltem=$(".ltem");
// // 循环分别给每一添加个元素onmouseover onmouseout
// for(var i=0;i<list.length;i++){
//  // 先执行for后执行事件
//  (function(n){
//   list[n].onmouseover=function(){
//    ltem[n].style.display="block";
// }, 
//   list[n].onmouseout=function(){
//       ltem[n].style.display="none";
//  } 
//  })(i);
// }

//});




/*window.onload=function(){*/
   
    var wins=$(".subnav")[0]; 

    
    nodelunbo(wins,1)
   function nodelunbo(obj,num){

   var imgBox=$(".imgBox",obj)[0];
   //alert(imgBox.length);
   var subnav_inters=$(".subnav_inter",imgBox);
   //alert(subnav_inters.length)
   var widths=parseInt(getStyle(subnav_inters[0],'width'))+10;
  
   var btnl=$(".btnl",obj)[0];
   var btnr=$(".btnr",obj)[0];
   var flag=true;

/*设置imgbox的宽度
*/

imgBox.style.width=widths*subnav_inters.length+"px";

var t=setInterval(moveL,2000);
   //先移动imgBox 把第一张图片放最后imgBox.style.left=0;    
obj.onmouseover=function(){
    clearInterval(t);
  }
  obj.onmouseout=function(){
    t=setInterval(moveL,2000)
  }

     btnr.onclick=function(){
      if(flag){
      flag=false;
      moveR();
      }
  }
  btnl.onclick=function(){  
    if(flag){
      flag=false;
      moveL();
    }
  }  


       function moveL(){
          
          animate(imgBox,{left:-num*widths},function(){
            for (var i  = 0; i < num; i++) {
              var first=firstChild(imgBox);
             imgBox.appendChild(first);
             imgBox.style.left=0; //把
            };
          
            flag=true;
          })

       }
//先拔图（把最后一张放到最前面imgBox.style.left=-widths+'px';） 后动画

        function moveR(){
      for (var i = 0; i < num; i++) {
        
      
    var last=lastChild(imgBox);
    beforeChild(imgBox,last);   
    imgBox.style.left=-num*widths+"px";
       }; 

    animate(imgBox,{left:0},function(){
            flag=true;   
      
    });
        
    

  }

}
});










 









  