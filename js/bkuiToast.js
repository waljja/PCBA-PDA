;(function ($){
    $.extend({
        bkuiToast:function (options){
            var defaults = {
                content:'',
                iconHtml:'<i class="fa fa-spinner fa-spin"></i>',
                themeClass:'',
                timeout: 0,
                onShow:null,
                onClose:null
            }
            var options = $.extend({},defaults,options);
            var bkuiToast={};

            bkuiToast.createBox = function (iconHtml,content) {
                var minToast = '';
                var that = this;
                if (!content && iconHtml){
                    minToast = ' bkui-mini-toast';
                }else if (!iconHtml && content){
                    minToast = ' bkui-text-toast';
                }

                var $box = $('<div class="bkui-toast'+minToast+'"></div>');
                var sMask = '<div class="bkui_mask_transparent"></div>'; 
                var sContentBox = '<div class="bkui-toast-wrapper"><div class="bkui-toast-icon"><div class="bkui-loading-icon">'+iconHtml+'</div></div><div class="bkui-toast-content">'+content+'</div></div>' ;

                $box.html(sMask+sContentBox);
                $box.addClass(options.themeClass);
                $box.appendTo($('body'));

                if (options.timeout && (typeof options.timeout == 'number')){
                    setTimeout(function(){
                        that.hide();
                    },options.timeout)
                }
                return $box;
            };
            bkuiToast.show = function (){
                $box.css({'display':'block'}).appendTo($('body'));
                if(typeof options.onShow=='function'){
                    options.onShow();
                }
                return bkuiToast;
            };
            bkuiToast.hide = function () {
                if (typeof arguments[0]=='boolean' || arguments[0]=="true") {
                    $box.remove();
                    bkuiToast.closeFn();
                    bkuiToast = null;
                }else{
                    $box.hide(0,function (){
                        bkuiToast.closeFn();
                    });
                }
            };
            bkuiToast.closeFn = function (){
                if(typeof options.onClose=='function'){
                    options.onClose();
                }
            };
            bkuiToast.setContent = function (content) {
                $box.find('.bkui-toast-content').text(content);
                return bkuiToast;
            };
            bkuiToast.setIcon = function (content) {
                $box.find('.bkui-loading-icon').html(content);
                return bkuiToast;
            };
            bkuiToast.destroy = function () {
                $box.remove();
                bkuiToast = null;
            };
            var $box = bkuiToast.createBox(options.iconHtml,options.content);
            return bkuiToast;
        }
    })
})(jQuery)