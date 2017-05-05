$(function() {
    //$("#workSpace").draggable();
    //$("#people").draggable();
    var chairAreaWidth=parseFloat(document.getElementById("chairsArea").offsetWidth);
    var img_chair_width=parseFloat(document.getElementById("mother").offsetWidth);
    console.log(chairAreaWidth);
    flag=0;
    //console.log($("#people .people")[1]);
    //for(var i=0;i<=$("#people .people").length;i++){
    //    $("#people .people")[i].css({"top":100*i+"px"});

    //}
    $( "#mother" ).draggable({
        start: function() {
            console.log(1);
            $(this).css({"position":"absolute"});
        },
        drag: function() {

        },
        stop: function() {
            //var elem=`<div   class="chair img" id=${"d"+flag++}  ><span>${flag}号</span></div>`;
            var elem="<div class='chair img iconfont icon-zuowei' id="+"d"+flag++ +"><input type='text' value="+'d'+flag+"></div>";
            var id1=flag;
            id1--;
            console.log("id："+id1);
            //console.log("mother-right:"+mother.style.right);
            $("#chairsArea").append(elem);
            //200为起始位置的200px,300为图片宽度
            var mother_left=parseFloat(mother.style.left);
            console.log(chairAreaWidth);
            console.log(mother.style.left);
            $("#d"+id1).css({"left":chairAreaWidth+mother_left+"px","top":mother.style.top}).addClass("animated jello").draggable({
                drag:function(){
                    CHAR1=$(this);
                    $("#trash").removeClass("animated flash");
                    CHAR1.removeClass("animated jello");

                    console.log("flash");
                    $("#trash").droppable({
                        drop: function (event, ui) {

                            if(navigator.userAgent.indexOf('MSIE') >= 0){
                                CHAR1.remove();
                            }else{
                                CHAR1.addClass("animated bounceOut");
                            }
                            setTimeout(function(){//延时执行
                                $("#trash").addClass("animated flash");
                            },1000);
                        }
                    });
                    $("#chairsArea").droppable({
                        drop: function (event, ui) {
                            CHAR1.addClass("animated jello");
                        }
                    });
                }
            });
            mother.style.left=0;
            mother.style.top=0;

        }
    });



    //双击击号牌修改

});
//事件冒泡删除当前元素,chairarea做事件代理
//当chair有people时候不允许删除 当 没有poeple时候才允许删除。
$("#chairsArea").dblclick(function(e){
    //当chair中只有一个元素input时候才允许删除
    if(e.target.className.indexOf("chair")!=-1&&e.target.childNodes.length==1){
        e.target.remove();
    }
});
$("button.btn").on("click",function(){
    console.log("提交");
   console.log($("#chairsArea>.chair"));
    var listItem=$("#chairsArea>.chair");
    var inputValue=$("#chairsArea>.chair>input");
    var chairCount=listItem.length;

    var list=[];
    for(var i=0;i<chairCount;i++){
        list[i]={
            "id":       listItem[i].id,
            "top":listItem[i].style.top,
            "left":     listItem[i].style.left,
            "chairName":$("#chairsArea>.chair>input")[i].value
        }
    }
    console.log(JSON.stringify(list));
    $.ajax({
        url:"data/1.php",
        type:"post",
        data:list,
        datatype:"text",
        success:function(data){
            console.log("数据传输成功");
            console.log(data);

        }
    });

});



