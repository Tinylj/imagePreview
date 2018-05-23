/**
 * Created by Tiny Lu on 2018/05/07.
 * 图片预览-原生JS 未依赖其他框架，兼容IE6 以上
 */

//用于计算预览图片的大小
function clacImgZoomParam(maxWidth, maxHeight, width, height){
    var param = {
        top: 0,
        left: 0,
        width: width,
        height: height
    };
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;
        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        }
        else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}

function myPreviewImage(param)//MAXWIDTH、MAXHEIGHT与放预览图片的DIV——preview的大小相呼应
{
    this.initPram =
        {
            file:param.file,
            maxWidth:param.maxWidth,
            maxHeight:param.maxHeight,
            preId:param.preId,
            imageid:((typeof param.imageid == "undefined")?"imghead":param.imageid)
        };
    var _this = this;
    var div = document.getElementById(_this.initPram.preId);
    if (this.initPram.file.files && this.initPram.file.files[0]) {//HTML5部分
        div.innerHTML = "<img id='"+_this.initPram.imageid+"' />";
        var img = document.getElementById(_this.initPram.imageid);
        img.onload = function(){
            var rect = clacImgZoomParam(_this.initPram.maxWidth, _this.initPram.maxHeight, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            img.style.marginTop = rect.top + 'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt){
            img.src = evt.target.result;
            if(typeof param.callback == "function")
            {
                param.callback("#"+_this.initPram.imageid);
            }
        }
        reader.readAsDataURL(this.initPram.file.files[0]);
    }
    else //兼容IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        this.initPram.file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = "<img id='"+_this.initPram.imageid+"' />";
        var img = document.getElementById(_this.initPram.imageid);
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(_this.initPram.maxWidth, _this.initPram.maxHeight, img.offsetWidth, img.offsetHeight);
        div.innerHTML = "<div style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}