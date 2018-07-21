// 这一部分主要功能是自定义构造小蛇对象，并围着个对象添加属性和方法
(function () {
    var elements = [];//存放小蛇的每个身体部分
    // 构造小蛇对象
    var Snake = function (width, height, direction) {
        this.width = width || 20;//小蛇的宽
        this.height = height || 20;//小蛇的高
        //小蛇的身体
        this.body = [
            {x: 3, y: 2, color: "red"},//头
            {x: 2, y: 2, color: "skyblue"},//身体
            {x: 1, y: 2, color: "skyblue"},//身体
        ]
        this.direction = direction || "right";
    }
    Snake.prototype.init = function (map) {
        //为原型添加方法，小蛇初始化
        //    先删除之前的小蛇
        remove();
        //循环遍历创建div
        for (var i = 0; i < this.body.length; i++) {
            //数组中每个元素都是一个对象
            var obj = this.body[i];
            //创建div
            var div = document.createElement("div");
            //把div加入到map中
            map.appendChild(div);
            //设置div的样式
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            //横纵坐标
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            //背景颜色
            div.style.backgroundColor = obj.color;
            //把创建好的div加入到elements数组中，目的是为了删除
            elements.push(div);
        }
    };
    //为原型添加方法--小蛇动起来
    Snake.prototype.move = function (food, map) {
        //改变小蛇的身体的坐标位置
        var i = this.body.length - 1;//2
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断方向--改变小蛇的头的坐标位置
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }
        //判断有没有吃到食物，也就是判断小蛇的头的坐标位置和食物的坐标一致
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;
        //判断小蛇的头的坐标和食物的坐标是否相同
        if (headX == food.x && headY == food.y) {
            //获取小蛇最后的尾巴
            var last = this.body[this.body.length - 1];
            //把最后的蛇尾复制一个，重新的加入到小蛇的body中
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            //把食物删除。重新初始化食物
            food.init(map);
        }
    };

    //删除小蛇的私有函数
    function remove() {
        //删除map中的小蛇的每个div，同时删除elements数组中每个元素，从蛇尾向舌头方向删除div
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            //先从当前的子元素中找到该子元素的父级元素,然后再s删除这个子元素
            var ele=elements[i];
            //从map地图上删除这个子元素div
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }
//把Snake暴露给window,外部可以访问
    window.Snake=Snake;
}
());