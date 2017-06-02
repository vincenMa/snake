//全局变量使用const关键字定义，只读，不能更改；
const northImg= new Image();
northImg.src="img/north.png";

const southImg= new Image();
southImg.src="img/south.png";

const eastImg= new Image();
eastImg.src="img/east.png";

const westImg= new Image();
westImg.src="img/west.png";

const foodImg3= new Image();
foodImg3.src="img/food3.png";

const foodImg2= new Image();
foodImg2.src="img/food2.png";

const foodImg1= new Image();
foodImg1.src="img/food1.png";


const bgImg= new Image();
bgImg.src="img/background.png";

const bodyImg= new Image();
bodyImg.src="img/body.png";

const sbodyImg= new Image();
sbodyImg.src="img/body.png";

const startImg= new Image();
startImg.src="img/1.jpg";



function Snake(){
	this.canvas=$("#gameview")[0];//画布
	this.ctx=this.canvas.getContext("2d");//画笔
	this.width=850;//（游戏屏幕）背景宽度
	this.height=500;//游戏屏幕高度
	this.step=25;//设计步长
	this.stepX=Math.floor(this.width/this.step);//X轴步数
	this.stepY=Math.floor(this.height/this.step);//Y轴步数
	this.snakeBodyList=[];//设置蛇身数组
	this.foodList=[];//食物数组
	this.timer=null;//蛇动的定时器
	this.score=0;//分数
	this.isDead=false;//蛇是否活着
	this.isEaten=false;//食物是否被吃掉标识位
	this.isPhone=false;//适配移动端
	this.timers=null;
	//1生成初始化页面，点击页面，进入游戏
	this.init =function(){
		this.device();//判断设备类型
		this.ctx.drawImage(startImg,0,0,this.width,this.height);
		this.timers=setInterval(function(){
			$("#aranges").html("25米/"+$("#ranges").prop("value")+"毫秒");
		},100)
		
	}
	this.start=function(){
		this.device();//判断设备类型
		this.score=0;//积分清零
		this.paint();//绘制背景，食物
		this.move();//2.4蛇移动
//		var _this=this;
//		var dex=true;
//		 $("#kaishi").click(function(){
//       	if(dex==true){
//       		_this.move();
//       	    $(this).html("暂停");
//       	    dex=false;
//       	}else{
//       		clearInterval(_this.timer);
//       		$(this).html("开始游戏");
//             dex=true;
//       	}
//          
//       })
	}
	
	this.device=function(){
		//1读取BOM对象navigator的userAgent信息
		var deviceInfo= navigator.userAgent;
		//判断是否是PC端
		if(deviceInfo.indexOf("Windows")==-1){
			this.isPhone=true;
//			this.canvas.width=window.innerWidth;
//			this.canvas.height=window.innerHeight;
//			this.width=window.innerWidth;
//			this.height==window.innerHeight-1;
			
			this.width=414;
			this.height=550;
			
			this.canvas.width=414;
			this.canvas.height=550;
			
			this.stepX=this.width/this.step;
			this.stepY=this.height/this.step;
			
			
		}
		
	}
	
	//2游戏开始。绘制背景。食物
	this.paint = function(){
		this.ctx.drawImage(bgImg,0,0,this.width,this.height);
		//2.2化蛇
		this.drawSnake();
		//2.3画食物
		this.drawFood();
	}
	
	//化蛇：算法[{x:横坐标,y：纵坐标,img： bodyImg,direct："west"}]
	this.drawSnake=function(){
		//2.2.1循环生成snakeBodyList数组中的对象集合（默认蛇于中间，蛇头向西）
		if(this.snakeBodyList.length<5){
			for(let i=0;i<5;i++){
			//蛇的节点设置
			this.snakeBodyList.push({
				x: Math.floor(this.stepX/2+i-2),//x不是px像素坐标点，而是步数
				y: Math.floor(this.stepY/2),//Y轴步数
				img: bodyImg,
				direct:"west"
			})
		}
		//2.2.2替换snakeBodyList数组第一个元素的img变为蛇头图片
		this.snakeBodyList[0].img=westImg;
//		this.snakeBodyList[0].direct="west";
		}
		//2.2.3便利snakeBodyList数组。画出蛇初始状态
		for(var i=0;i<this.snakeBodyList.length;i++){
			var snode=this.snakeBodyList[i];
			this.ctx.drawImage(snode.img,snode.x*this.step,snode.y*this.step,this.step,this.step);
		}
	}
	//画食物
	
	this.drawFood=function(){
		//2.3.1当食物已经存在的时候，画面刷新时，食物在原有位置重新绘制
		if(this.foodList.length>0){
			var fnode=this.foodList[0];
		this.ctx.drawImage(fnode.img,fnode.x*this.step,fnode.y*this.step,this.step,this.step);
		return;
		}
		//如果食物没有（食物被吃，或游戏初始化），生成XY随机坐标。判断是否与蛇身重复，如果重复，重新绘制，调用this.ctx.drawImage（），否则按照随机生成的点push到数组中，生成图案
		var foodX=Math.floor(Math.random()*this.stepX);
		var foodY=Math.floor(Math.random()*this.stepY);
		var foodFlag=false;//判断食物与蛇身是否重复
		for(var i=0;i<this.snakeBodyList.length;i++){
			var sonde1=this.snakeBodyList[i];
		if(foodX==sonde1.x&&foodY==sonde1.y){
			foodFlag=true;
		}
		}
		if(foodFlag){
			foodFlag=false;
			this.drawFood();
		}else{

				this.foodList.push({
			     x:foodX,
			     y:foodY,
			     img:foodImg2
		    })
				//改变事物。随机生成三种食物
				var asd=parseInt(Math.random()*3+1);
				foodImg2.src="img/food"+asd+".png";
				foodImg2.zxc=asd;

			
			var fnode=this.foodList[0];
		this.ctx.drawImage(fnode.img,fnode.x*this.step,fnode.y*this.step,this.step,this.step)
		}
		var fnode=this.foodList[0];
		this.ctx.drawImage(fnode.img,fnode.x*this.step,fnode.y*this.step,this.step,this.step)
	}
	//3蛇动
	//3.1判断设备如果是pc，相应键盘，否则响应触屏事件
	//3.2生成键盘事件处理器
	this.keyHandler=function(){//键盘
		var _this=this;
		//事件处理是异步的，无法传递this对象
		document.onkeydown=function(ev){
			var ev=ev||window.event;
			switch(ev.keyCode){
				case 38://向上
				  _this.snakeBodyList[0].img=northImg;
				  _this.snakeBodyList[0].direct="north";
				break;
				case 37://向左
				  _this.snakeBodyList[0].img=westImg;
				  _this.snakeBodyList[0].direct="west";
				break;
				case 39://向右
				  _this.snakeBodyList[0].img=eastImg;
				  _this.snakeBodyList[0].direct="east";
				break;
				case 40://向下
				  _this.snakeBodyList[0].img=southImg;
				  _this.snakeBodyList[0].direct="south";
				break;
			}
		}
	}
	this.touchHandler=function(){//触屏
		var _this=this;
		document.addEventListener("touchstart",function(ev){
//			console.log(ev);
            var ev = ev||window.event;
			var touchX=ev.changedTouches[0].clientX;
			var touchY=ev.changedTouches[0].clientY;
//			console.log(touchY);
			var head=_this.snakeBodyList[0];
			var headX=head.x*_this.step//乘以步长;
			var headY=head.y*_this.step;
			if(head.direct=="north" || head.direct=="south"){
				if(touchX<headX){
					head.direct="west";
					head.img=westImg;
				}else if(touchX>headX){
					head.direct="east";
					head.img=eastImg;
				}
			}else if(head.direct=="west" || head.direct=="east"){
				if(touchY<headY){
					head.direct="north";
					head.img=northImg;
				}else{
					head.direct="south";
					head.img=southImg;
				}
			}
		})
	}
	
	this.move = function(){
		if(!this.isPhone){
			this.keyHandler();
//			console.log("asdas");
		}else{
			this.touchHandler();
//			console.log("哈哈哈哈哈");
		}
		var _this=this;
		//事件处理是异步的，无法传递this对象
		
		//运用定时器，每0.2秒动蛇（坐标变化，重绘）
		var sudu=$("#ranges").prop("value");
		
		console.log(sudu);

          this.timer=setInterval(function(){
			//蛇头的坐标发生变化， 并且蛇身发生变化，移动
			//s首先解决蛇身跟随的问题
			for(var i=_this.snakeBodyList.length-1;i>0;i--){
				_this.snakeBodyList[i].x=_this.snakeBodyList[i-1].x;
				_this.snakeBodyList[i].y=_this.snakeBodyList[i-1].y;
			}
			//根据方向坐标，处理蛇头的新坐标
			var shead=_this.snakeBodyList[0];
			
			switch(shead.direct){
				case "north":
				    shead.y-=1;
				break;
				case "south":
				    shead.y+=1;
				break;
				case "west":
				    shead.x-=1;
				break;
				case "east":
				    shead.x+=1;
				break;
			}
			//3.1.1判断蛇移动后新位置是否已经触碰边界或触碰自身死亡。
			_this.dead();//判断生死
			if(_this.isDead){
				//蛇死时候播放音乐
				$("#music").attr("src","img/dead.mp3");
				$(".bcontent").css("display","block");
				$(".content").html("最终分数："+_this.score);
                
				
				
				
				//alert最终分数
				
				
				clearInterval(_this.timer);//如果不清除，速度不断加快
				_this.isDead=false;//改变状态
				_this.snakeBodyList=[];//清除蛇身
//				$(_this.canvas).hide(2000);//游戏重新开始
			}else{//3.1.2 false 蛇活着，判断蛇头是否与食物的坐标点一致，如果一致，清空数组（判断是否吃到食物）
			_this.eat();
			if(_this.isEaten){
				//吃食物播放音乐
				$("#music1").attr("autoplay","autoplay");
				$("#music1").attr("src","img/4787.wav");
				_this.isEaten=false;
				
				//加分
				switch(foodImg2.zxc){//根据不同事物加不同分数
					case 1:
					_this.score+=10;
					break;
					case 2:
					_this.score+=20;
					break;
					case 3:
					_this.score+=30;
					break;
				}
				console.log(_this.foodList[0].img.src);
				//清空食物数组
				_this.foodList=[];
				
				//蛇身涨一节
				var lastNodeIndex=_this.snakeBodyList.length;
				_this.snakeBodyList[lastNodeIndex]={
					x:-2, 
					y:-2,
					img:bodyImg,
					direct:_this.snakeBodyList[lastNodeIndex-1].direct
				}
			}
			//3.1.3 否则重绘
			_this.paint();//重绘游戏画面
			}
			
		},sudu)
	}
	
	//4蛇死
	this.dead=function(){
//		this.isDead=true;//实验是否可以弹出分数
        const LEFT_END=0;//左边界
        const RIGHT_END=this.stepX;//右边界
        const NORTH_END=0;//上边界
        const SOUTH_END=this.stepY;//下边界
        const headX=this.snakeBodyList[0].x;//蛇头横坐标
        const headY=this.snakeBodyList[0].y;//纵坐标
        //判断边界
        if(headX<LEFT_END || headY<NORTH_END || headX>RIGHT_END || headY>SOUTH_END){
        	this.isDead=true;
        	return;
        };
        //判断是否撞到自身
        for(var k=this.snakeBodyList.length-1;k>3;k--){
        	
        if(this.snakeBodyList[k].x==headX && this.snakeBodyList[k].y==headY){
        	this.isDead=true;
        	$("#music").attr("src","img/dead.mp3");
        }
        }
	}
	//5 吃食物
	this.eat=function(){
		const HEAD_X=this.snakeBodyList[0].x;
		const HEAD_Y=this.snakeBodyList[0].y;
		const FOOD_X=this.foodList[0].x;
		const FOOD_Y=this.foodList[0].y;
		if(HEAD_X==FOOD_X && HEAD_Y==FOOD_Y){
			this.isEaten=true;
		}
	}
	
	
	
}
