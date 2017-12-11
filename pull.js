

function loaded(){
    console.log('执行初始化');
    var wrapper = document.getElementById('wrapper');
    var myScroll = new IScroll('.wrapper',{
        scrollbars: false,
        snap: 'li',
        mouseWheel: true,
        probeType: 3
    });
    window.scroller = myScroll;
    bindEvent();
}

function bindEvent(){
    window.scroller.on('scroll', function(event){
        let Y = this.y;
        console.log(Y)
        let pullDownEl = document.querySelector('.pull-down'),
            pullUpEl = document.querySelector('.pull-up'),
            pullDownShow = pullDownEl.classList.contains('show'),
            pullUpShow = pullUpEl.classList.contains('show');
        if(Y > 40){
            !pullDownShow && pullDownEl.classList.add('show');
            pullDownEl.innerHTML = "松开刷新";
            this.minScrollY = 0;
            return ;
        } else if(Y < 40 && Y > 0){
            pullDownEl && pullDownEl.classList.remove('show');
            pullDownEl.innerHTML = "继续下拉刷新";
            this.minScrollY = 40;
        }
    })
    window.scroller.on('scrollEnd', function(event){
        console.log('触发　scrollEnd');
        console.log(event);
    });
    
}