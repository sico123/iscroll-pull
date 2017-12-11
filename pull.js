

function loaded(){
    console.log('执行初始化');
    var wrapper = document.getElementById('wrapper');
    var myScroll = new IScroll('.wrapper',{
        scrollbars: false,
        snap: 'li',
        mouseWheel: true
    });
}