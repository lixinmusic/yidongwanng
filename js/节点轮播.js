window.onload=function(){
   
    var wins=$(".subnav")[0]; 

    
    nodelunbo(wins,1)
   function nodelunbo(obj,num){

   var imgBox=$(".imgBox",obj)[0];
   var ass=$("a",imgBox);
   alert(ass.length)
   var widths=parseInt(getStyle(ass[0],'width'))+10;
  
   var btnl=$(".btnl",obj)[0];
   var btnr=$(".btnr",obj)[0];
   var flag=true;

/*设置imgbox的宽度
*/

imgBox.style.width=widths*ass.length+"px";

var t=setInterval(moveL,1000);
   //先移动imgBox 把第一张图片放最后imgBox.style.left=0;    
obj.onmouseover=function(){
		clearInterval(t);
	}
	obj.onmouseout=function(){
		t=setInterval(moveL,1000)
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
}