//首先可以将整体封装成一个匿名自运行函数
(function($){
	//本函数每次调用只负责一个轮播图的功能
	//也就是说只会产生一个轮播图,这个函数的作用域只能分配给一个轮播图
	//所以要求在调用本函数的时候请务必将当前轮播图的标签传递过来
	var slide=function(ele){
		//转为jq 标签对象
		var $ele =$(ele)
		//默认的设置选项,
		var setting={
			//控制刚炸开的时间
			delay:1000,
			//控制time的时间(轮播速度)
			speed:2000
		}
		//规定每张图片处于的位置和状态
		var states=[
			{ZIndex:1,width:120,height:150,top:69,left:134,opac:0.2},
			{ZIndex:2,width:130,height:170,top:59,left:0,opac:0.5},
			{ZIndex:3,width:170,height:218,top:24,left:110,opac:0.7},
			{ZIndex:4,width:224,height:288,top:0,left:263,opac:1},
			{ZIndex:3,width:170,height:218,top:24,left:470,opac:0.7},
			{ZIndex:2,width:130,height:170,top:59,left:620,opac:0.5},
			{ZIndex:1,width:120,height:150,top:69,left:500,opac:0.2},
		]
		var lis=$(ele).find("li")
		function move(){
			lis.each(function(index,item){
				var state= states[index]
				$(item).css("z-index",state.zIndex).finish().animate(state,setting.delay).find("img").css("opacity",state.opac)
				
			})
		}
		move()
		
		//下一张
		function next(){
			states.unshift(states.pop())
			move()
		}
		//上一张
		function prev(){
			states.push(states.shift())
			move()
		}
		$(ele).find(".slide-prev").click(function(){
			prev()
		})
		$(ele).find(".slide-next").click(function(){
			next()
		})
		//自动轮播
		var time=null
		function autoPlay(){
			time=setInterval(function(){
				next()
			},setting.speed)
		}
	
		//停止轮播
		$ele.find("section").add(lis).hover(function(){
			clearInterval(time)
		},function(){
			autoPlay()
		})
	}
	
	
	$.fn.ZYSlide=function(){
		$(this).each(function(i,ele){
			slide(ele)
		})
	}
})(jQuery)


//用jq封装插件的几种写法
//插件类写法 
//$.fn.customFun=function(){
//	自定义插件代码
//}

//用法: 
//$("div").customFun()


//工具类的写法   $.ajax 
//$.customFun=function(){
	//自定义工具累的代码
//}
//用法
     //$.customFun()
