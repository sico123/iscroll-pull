var num = 0;
var myScroll;




function loaded() {
    console.log('执行初始化');
    var wrapper = document.getElementById('wrapper');
    var pullDownEl = document.getElementById('pullDown');
    var pullDownOffset = pullDownEl.offsetHeight;
    var myScroll = new IScroll('#wrapper', {
        scrollbars: false,
        mouseWheel: true,
        topOffset: pullDownOffset,
        startY: -pullDownOffset,
        useTransition: true,
        probeType: 1
        
    });
    window.myScroll = myScroll;


    //暂时没有什么用
    myScroll.on("scrollStart", function () {
        console.log(this.startY);
        if (this.y == this.startY) {
            isScrolling = true;
        }
        console.log('scroll begin');
        console.log('start-y:' + this.y);
        console.log(`isScrolling: `+ isScrolling);
    });

    myScroll.on("scroll", function(e){
        // console.log(`this.y: ${this.y}`)
        if (this.y >= 5 && pullDownEl && !pullDownEl.className.match('flip')) {
            pullDownEl.className = 'flip';
            pullDownEl.innerHTML = "松开以刷新数据";
            myScroll.options.bounceTime = 600;
        } else if(this.y < 5 && pullDownEl && pullDownEl.className.match('flip')){
            pullDownEl.className = '';
            pullDownEl.innerHTML = "下拉刷新数据";
            myScroll.options.bounceTime = 20;
        }
        // console.log('Y: '+ this.y);
    });

    myScroll.on('scrollEnd', function(e){
        console.error('end');
        if(pullDownEl && !pullDownEl.className.match('flip') && this.y > this.options.startY){
            console.log('恢复原位置');
            myScroll.scrollTo(0, this.options.startY, 200);
        } else  if(pullDownEl && pullDownEl.className.match('flip')){
            pullDownEl.className = 'loading';
            pullDownEl.innerHTML = '正在刷新';
            console.log(isScrolling);
            if(isScrolling){
                console.log('before pull up action:'+this.y); 
                doPullDownAction();
                console.log('after pull down action: ' + this.y);
            }
        }
    });
    myScroll.on('refresh', function(){
        if(pullDownEl && pullDownEl.className.match('loading')){
            pullDownEl.className = '';
            pullDownEl.innerHTML = "下拉刷新数据";
            this.scrollTo(0, this.options.startY, 800);
        }
    })
}

//下拉刷新事件
function doPullDownAction(){
    setTimeout(function(){

        var html = '';
        for(var i = 0; i< 20; i++){

        }
    }, 1000);
}