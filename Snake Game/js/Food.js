//这一部分主要是创建食物对象，并设置属性和方法，最终显示在地图上
//自调用函数---食物
( function(){
   var elements=[];//空数组，保存每个食物对象
    var Food=function (x,y,width,height,color) {
        this.x=x||0;//横坐标
        this.y=y||0;//纵坐标
        this.width=width||20;//宽
        this.height=height||20;//高
        this.color= color||"purple";//背景颜色
    }
//    为原型添加初始化方法---使得食物在地图上显示，因为要在地图上显示，所以需要把map传进参数中
    Food.prototype.init=function (map) {
        //每次刷新时都要删除之前的食物，展现一个新的食物
        //此时调用一个内部函数，外部则无法访问这个函数
        remove();

        //创建div
        var div=document.createElement("div");
        map.appendChild(div);
        //设置div的样式
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;
        div.style.position="absolute";//子绝父相
        //产生随机横纵坐标
        this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left=this.x+"px";
        div.style.top=this.y+"px";
        // 把div加到数组elements中
        elements.push(div);
    };
    //私有的函数---删除食物
    function remove(){
        //elements数组中有这个食物
        for (var i=0;i<elements.length;i++){
            var ele=elements[i];
            //找到这个子元素的父级元素，然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //再次把elements中的这个子元素也要删除
            elements.splice(i,1);
        }
    }
window.Food=Food;
}());