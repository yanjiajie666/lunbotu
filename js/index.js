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

//将状态和位置赋值给li
var lis=$("#box li")

function move(){
	lis.each(function(index,ele){
	var state=states[index]
	$(ele).css("z-index",state.ZIndex).finish().animate(state,1000).find("img").css("opacity",state.opac)
	})
}
move()
//下一张的
function next(){
	states.unshift(states.pop())
	move()
}
$("#box .next").click(function(){
	//原理:把数组中的最后一个元素移动到数组中的第一个元素
	next()
})

$("#box .prev").click(function(){
	//原理:把数组第一个元素移动到最后一位
	states.push(states.shift())
	move()
})

//自动轮播
var time=null
function autoPlay(){
	time=setInterval(function(){
		next()
	},3000)
}
autoPlay()

//停止轮播
$("#box section").add("#box li").hover(function(){
	clearInterval(time)
},function(){
	autoPlay()
})
