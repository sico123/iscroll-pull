let num = 0;
let myScroll;
let isScrolling = false;

function loaded() {
    console.log('执行初始化');
    let wrapper = document.getElementById('wrapper');
    let pullDownEl = document.getElementById('pullDown');
    let pullDownOffset = pullDownEl.offsetHeight;
    let pullUpEl = $('#pullUp'),
        pullUpOffset = pullUpEl.height();
    let myScroll = new IScroll('#wrapper', {
        scrollbars: false,
        mouseWheel: true,
        topOffset: pullDownOffset,
        startY: -pullDownOffset,
        useTransition: true,
        probeType: 1

    });
    window.myScroll = myScroll;


    myScroll.on('refresh', function () {
        if (pullDownEl && pullDownEl.className.match('loading')) {
            pullDownEl.className = '';
            pullDownEl.innerHTML = "下拉刷新数据";
            this.scrollTo(0, this.options.startY, 800);
        } else if (pullUpEl && pullUpEl.hasClass('loading')) {
            pullUpEl.attr('class', '');
            pullUpEl.html('上拉加载数据');
            // this.scrollTo(0, this.maxScrollY, 800);
        }
    });
    //暂时没有什么用
    myScroll.on("scrollStart", function () {
        console.log(`this.y: ${this.y}`);
        console.log(`this.startY: ${this.startY}`);
        if (this.y === this.startY) {
            isScrolling = true;
        }
        console.log(`isScrolling: ${isScrolling}`);
    });

    myScroll.on("scroll", function (e) {
        // console.log(`this.y: ${this.y}`)
        if (this.y >= 5 && pullDownEl && !pullDownEl.className.match('flip')) {
            pullDownEl.className = 'flip';
            pullDownEl.innerHTML = "松开以刷新数据";
            myScroll.options.bounceTime = 600;
        } else if (this.y < 5 && pullDownEl && pullDownEl.className.match('flip')) {
            pullDownEl.className = '';
            pullDownEl.innerHTML = "下拉刷新数据";
            myScroll.options.bounceTime = 20;
        } else if (this.y <= this.maxScrollY - 5 && pullUpEl && !pullUpEl.hasClass('flip')) {
            console.log('pull up呵呵哒');
            console.log(this.y);
            console.log(this.maxScrollY);

            pullUpEl.attr('class', 'flip');
            pullUpEl.html("松开以加载数据");
            myScroll.options.bounceTime = 600;
        } else if (this.y < this.maxScrollY && this.y > this.maxScrollY - 5 && pullUpEl && pullUpEl.hasClass('flip')) {
            pullUpEl.attr('class', '').html('上拉加载数据');
            myScroll.options.bounceTime = 20;
        }
        // console.log('Y: '+ this.y);
    });

    myScroll.on('scrollEnd', function (e) {
        console.error('end');
        if (pullDownEl && !pullDownEl.className.match('flip') && this.y > this.options.startY) {
            console.log('恢复原位置');
            if (isScrolling) {
                myScroll.scrollTo(0, this.options.startY, 200);
            }
        } else if (pullDownEl && pullDownEl.className.match('flip')) {
            pullDownEl.className = 'loading';
            pullDownEl.innerHTML = '正在刷新';
            console.log(isScrolling);
            if (isScrolling) {
                console.log('before pull action:' + this.y);
                doPullDownAction();
                console.log('after pull action: ' + this.y);
            }
        } else if (pullUpEl && !pullUpEl.hasClass('flip') && this.y > this.maxScrollY + 5) {
            console.log('上拉恢复');
            if (isScrolling) {
                myScroll.scrollTo(0, this.maxScrollY);
            }
        } else if (pullUpEl && pullUpEl.hasClass('flip')) {
            pullUpEl.attr('class', 'loading').html('正在加载');
            if (isScrolling) {
                doPullUpAction();
            }
        }
        isScrolling = false;

    });

}

//下拉刷新事件
function doPullDownAction() {
    let html = '';
    setTimeout(function () {
        $('.item').remove();
        num = 0;
        for (let i = 0; i < 20; i++) {
            html += `<li class="item">${++num}</li>`
        }
        $('#pullDown').after(html);
        window.myScroll.refresh();
    }, 1000);

}

function doPullUpAction() {
    let html = '';
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            html += `<li class="item">${++num}</li>`
        }
        $('#pullUp').before(html);
        window.myScroll.refresh();
    }, 1000)
}