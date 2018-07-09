var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    install(Vue,options){
        // 校验工具
        Vue.prototype.VTools={
            /**
             *手机号检验
             */
            checkMobile: function (rule, value, callback) {
                var ruleText = /^1[3|4|5|7|8]\d{9}$/,
                    massageText=(rule.messageText?rule.messageText:'手机号');
                if (value === '' || value==undefined) {
                    rule.beNull?callback():callback(new Error('请输入'+massageText));
                } else if (!ruleText.test(value)) {
                    callback(new Error(massageText+'格式错误'));
                } else {
                    callback();
                }
            },
            /**
             *登录密码检验
             */
            checkPassword: function (rule, value, callback) {
                var ruleText = /^[a-zA-Z\d]{6,16}$/,
                    massageText=(rule.messageText?rule.messageText:'密码');
                value=value?value.trim():value;
                if (value === '') {
                    callback(new Error('请输入'+massageText));
                } else if (!ruleText.test(value)) {
                    callback(new Error(massageText+'格式错误:6-16位大小写字母、数字'));
                } else {
                    callback();
                }
            },
            /**
             *账号校验
             */
            checkAccount: function (rule, value, callback) {
                var ruleText = /^[\u4e00-\u9fa5]{4,20}$|^[\dA-Za-z_\-]{4,20}$/,
                    massageText=(rule.messageText?rule.messageText:'用户名');
                value=value?value.trim():value;
                if (value === '') {
                    callback(new Error('请输入'+massageText));
                } else if (!ruleText.test(value)) {
                    callback(new Error('格式错误:支持中文, 字母, 数字, \\"-\\", \\"_\\", 的组合, 4-20个字符'));
                } else {
                    callback();
                }
            },
            /**
             *邮箱校验
             */
            checkEmail: function (rule, value, callback) {
                var ruleText = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    massageText=(rule.messageText?rule.messageText:'邮箱');
                value=value?value.trim():value;
                if (value === '') {
                    callback(new Error('请输入'+massageText));
                } else if (!ruleText.test(value)) {
                    callback(new Error(massageText+'格式错误:如xxx@xxx.com'));
                } else {
                    callback();
                }
            }
        },
        // 全局工具
        Vue.prototype.GTools= {
            formatDate:{
                format: function (date, pattern) {
                    pattern = pattern || DEFAULT_PATTERN;
                    return pattern.replace(SIGN_REGEXP, function ($0) {
                        switch ($0.charAt(0)) {
                            case 'y': return padding(date.getFullYear(), $0.length);
                            case 'M': return padding(date.getMonth() + 1, $0.length);
                            case 'd': return padding(date.getDate(), $0.length);
                            case 'w': return date.getDay() + 1;
                            case 'h': return padding(date.getHours(), $0.length);
                            case 'm': return padding(date.getMinutes(), $0.length);
                            case 's': return padding(date.getSeconds(), $0.length);
                        }
                    });
                },
                parse: function (dateString, pattern) {
                    var matchs1 = pattern.match(SIGN_REGEXP);
                    var matchs2 = dateString.match(/(\d)+/g);
                    if (matchs1.length == matchs2.length) {
                        var _date = new Date(1970, 0, 1);
                        for (var i = 0; i < matchs1.length; i++) {
                            var _int = parseInt(matchs2[i]);
                            var sign = matchs1[i];
                            switch (sign.charAt(0)) {
                                case 'y': _date.setFullYear(_int); break;
                                case 'M': _date.setMonth(_int - 1); break;
                                case 'd': _date.setDate(_int); break;
                                case 'h': _date.setHours(_int); break;
                                case 'm': _date.setMinutes(_int); break;
                                case 's': _date.setSeconds(_int); break;
                            }
                        }
                        return _date;
                    }
                    return null;
                }

            },
            getQueryStringByName: function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                var context = "";
                if (r != null)
                    context = r[2];
                reg = null;
                r = null;
                return context == null || context == "" || context == "undefined" ? "" : context;
            },
            initSelectData: function(data,defaultText){
                var tempData=[];
                if(defaultText){
                    var tempItem={
                        label:defaultText,
                        value:''
                    };
                    tempData.push(tempItem);
                }
                for(var index in data){
                    var tempItem={
                        label:data[index],
                        value:index
                    };
                    tempData.push(tempItem);
                }
                return tempData;
            },
            showView: function(matchedPath,route,isSubView){
                let currentPath = route.matched[route.matched.length-1].path;
                var exp = RegExp(matchedPath+'$');
                if(isSubView) {
                    return !exp.test(currentPath);
                }else{
                    return exp.test(currentPath);
                }

            },
            listToTree: function(myId,pId,list){
                function exists(list, parentId){
                    for(var i=0; i<list.length; i++){
                        if (list[i][myId] == parentId) return true;
                    }
                    return false;
                }

                var nodes = [];
                // get the top level nodes
                for(var i=0; i<list.length; i++){
                    var row = list[i];
                    if (!exists(list, row[pId])){
                        row.label=row.reMark;
                        nodes.push(row);
                    }
                }

                var toDo = [];
                for(var i=0; i<nodes.length; i++){
                    toDo.push(nodes[i]);
                }
                while(toDo.length){
                    var node = toDo.shift(); // the parent node
                    // get the children nodes
                    for(var i=0; i<list.length; i++){
                        var row = list[i];
                        if (row[pId] == node[myId]){
                            //var child = {id:row.id,text:row.name};
                            row.label=row.reMark;
                            if (node.children){
                                node.children.push(row);
                            } else {
                                node.children = [row];
                            }
                            toDo.push(row);
                        }
                    }
                }
                return nodes;
            },
            removeEmpty:function(data){
                var result={};
                for(var key in data){
                    if(data[key]!=''){
                        result[key]=data[key]
                    }
                }
                return result;
            },
            getCookie:function(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return (arr[2]);
                else
                    return null;
            },
            setCookie:function (c_name, value, expiredays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + expiredays);
                document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
            },
            delCookie:function (name) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = this.getCookie(name);
                if (cval != null)
                    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            },
            /**
             * 格式化价格-》万元
             * @param {int} price
             * */
            priceFormat:function(price){
                if(!price) return;
                var priceStr=price.toString();
                if(priceStr.lastIndexOf(".")!=-1){
                    priceStr=priceStr.substr(0,priceStr.lastIndexOf("."));
                }
                var priceF;
                if(priceStr.length>4){
                    priceF=priceStr.substring(0,(priceStr.length-4));
                    priceF+=(priceStr.slice(-4,-3)!=='0')?"."+priceStr.slice(-4,-3):'';
                    priceF+="万";
                }else{
                    priceF=priceStr+"元";
                }
                return priceF;
            },
        };
        Vue.prototype._DataSize=(data)=>{
            switch(typeof data){
                case 'undefined':
                    return 0;
                    break;
                case 'string':
                    return data.length;
                    break;
                case 'object':
                    return data?Object.keys(data).length:0;
                    break;
                case 'number':
                    return 1;
                    break;
                case 'boolean':
                    return 1;
                    break;
                default :
                    return 0;
                    break;
            }
        };
        Vue.prototype._resource=(resouce,data)=>{
            if(resouce){
                if(resouce.indexOf(','+data+',')>=0){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }

        };
        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
        // 例子：
        // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
        Date.prototype.Format = function (fmt) {
            let o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;

        };
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    }
};
