var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {

    install(Vue,options)
    {
            // 全局变量
        Vue.prototype.GData= {
            companyName:window.EW?EW.companyName:{},
            companyMiniName:window.EW?EW.companyMiniName:{},
            certiTypeDataAll:{
                "01":"居民身份证",
                "04":"军官证",
                "07":"护照",
                "06":"军官离退休证",
                "12":"社保证",
                "14":"个人其他",
                "16":"法人证书",
                "17":"台胞证"
            },
            certiTypeData:{
                "1":"营业执照",
                "2":"税务登记证",
                "3":"组织机构代码证",
                "01":"居民身份证",
                "02":"护照",
                "03":"军人证",
                "04":"驾驶证",
                "05":"港澳台同胞证",
                "07":"中国护照",
                "09":"居民户口簿",
                "10":"组织机构代码证",
                "11":"营业执照",
                "21":"统一社会信用代码证",
                "553":"外国人永久居留身份证",
                "99":"其他"
            },
            VCINameData : {
                //FORCE:"交强险",
                RC0001: "车辆损失险",
                RC0002: "全车盗抢险",
                RC0003: "司机座位责任险",
                RC0004: "乘客座位责任险",
                RC0005: "第三者责任保险",
                RC0006: "不计免赔合计",
                RC0007: "自燃损失险",
                RC0008: "车身划痕损失险",
                RC0009: "玻璃单独破碎险",
                RC0010: "涉水行驶损失险",
                RC0031: "指定专修厂",
                RC0044: "无法找到第三方",
                RC0016: "精神损害抚慰金责任险",
                RC0012: "修理期间费用补偿险",
                RC0051: "新增加设备损失险",
                RC0052: "车上货物责任险",
                RC0054: "机动车油污责任险",
                RC0055: "机动车钥匙丢失或损坏费用补偿险"
            },
            VCINameOfOrder: {
                //FORCE:"交强险",
                RC0001: "车辆损失险",
                RC0002: "全车盗抢险",
                RC0003: "司机座位责任险",
                RC0004: "乘客座位责任险",
                RC0005: "第三者责任保险",
                RC0006: "不计免赔合计",
                RC0007: "自燃损失险",
                RC0008: "车身划痕损失险",
                RC0009: "玻璃单独破碎险",
                RC0010: "涉水行驶损失险",
                RC0031: "指定专修厂",
                RC0044: "无法找到第三方",
                RC0016: "精神损害抚慰金责任险",
                RC0012: "修理期间费用补偿险",
                RC0051: "新增加设备损失险",
                RC0052: "车上货物责任险",
                RC0053: "三责险附加法定节假日限额翻倍险",
                RC0054: "机动车油污责任险",
                RC0055: "机动车钥匙丢失或损坏费用补偿险"
            },
            permissions:[],
            permissionDefault:',resIndexWelcome,',
            provinceData:{
                110000: "北京",
                120000: "天津",
                130000: "河北省",
                140000: "山西省",
                150000: "内蒙古自治区",
                210000: "辽宁省",
                220000: "吉林省",
                230000: "黑龙江省",
                310000: "上海",
                320000: "江苏省",
                330000: "浙江省",
                340000: "安徽省",
                350000: "福建省",
                360000: "江西省",
                370000: "山东省",
                410000: "河南省",
                420000: "湖北省",
                430000: "湖南省",
                440000: "广东省",
                450000: "广西壮族自治区",
                460000: "海南省",
                500000: "重庆",
                510000: "四川省",
                520000: "贵州省",
                530000: "云南省",
                540000: "西藏自治区",
                610000: "陕西省",
                620000: "甘肃省",
                630000: "青海省",
                640000: "宁夏回族自治区",
                650000: "新疆维吾尔自治区",
                710000: "台湾",
                810000: "香港特别行政区",
                820000: "澳门特别行政区",
                900000: "钓鱼岛"
            },
            cityArea:{
                110000:[{"cityCode":"110000","cityName":"北京市"}],
                120000:[{"cityCode":"120101","cityName":"和平区"},{"cityCode":"120102","cityName":"河东区"},{"cityCode":"120103","cityName":"河西区"},{"cityCode":"120104","cityName":"南开区"},{"cityCode":"120105","cityName":"河北区"},{"cityCode":"120106","cityName":"红桥区"},{"cityCode":"120107","cityName":"滨海新区"},{"cityCode":"120110","cityName":"东丽区"},{"cityCode":"120111","cityName":"西青区"},{"cityCode":"120112","cityName":"津南区"},{"cityCode":"120113","cityName":"北辰区"},{"cityCode":"120114","cityName":"武清区"},{"cityCode":"120115","cityName":"宝坻区"},{"cityCode":"120221","cityName":"宁河县"},{"cityCode":"120223","cityName":"静海县"},{"cityCode":"120225","cityName":"蓟县"}],
                350000:[{"cityCode":"350100","cityName":"福州市"},{"cityCode":"350200","cityName":"厦门市"},{"cityCode":"350300","cityName":"莆田市"},{"cityCode":"350500","cityName":"泉州市"},{"cityCode":"350600","cityName":"漳州市"},{"cityCode":"350800","cityName":"龙岩市"}],
                210000:[{"cityCode":"210100","cityName":"沈阳市"},{"cityCode":"210200","cityName":"大连市"},{"cityCode":"210300","cityName":"鞍山市"},{"cityCode":"210400","cityName":"抚顺市"},{"cityCode":"210500","cityName":"本溪市"},{"cityCode":"210600","cityName":"丹东市"},{"cityCode":"210700","cityName":"锦州市"},{"cityCode":"210800","cityName":"营口市"},{"cityCode":"210900","cityName":"阜新市"},{"cityCode":"211000","cityName":"辽阳市"},{"cityCode":"211100","cityName":"盘锦市"},{"cityCode":"211200","cityName":"铁岭市"},{"cityCode":"211300","cityName":"朝阳市"},{"cityCode":"211400","cityName":"葫芦岛市"}],
                220000:[{"cityCode":"220100","cityName":"长春市"}, {"cityCode":"220200","cityName":"吉林市"}, {"cityCode":"220300","cityName":"四平市"}, {"cityCode":"220400","cityName":"辽源市"}, {"cityCode":"220500","cityName":"通化市"}, {"cityCode":"220600","cityName":"白山市"}, {"cityCode":"220700","cityName":"松原市"}, {"cityCode":"220800","cityName":"白城市"}, {"cityCode":"222400","cityName":"延边朝鲜族自治州"}],
                510000:[{"cityCode":"510100","cityName":"成都市"},{"cityCode":"510700","cityName":"绵阳市"},{"cityCode":"511100","cityName":"乐山市"},{"cityCode":"511500","cityName":"宜宾市"}],
                320000:[{"cityCode":"320100","cityName":"南京市"},{"cityCode":"320200","cityName":"无锡市"},{"cityCode":"320300","cityName":"徐州市"},{"cityCode":"320400","cityName":"常州市"},{"cityCode":"320500","cityName":"苏州市"},{"cityCode":"320600","cityName":"南通市"},{"cityCode":"320700","cityName":"连云港市"},{"cityCode":"320800","cityName":"淮安市"},{"cityCode":"320900","cityName":"盐城市"},{"cityCode":"321000","cityName":"扬州市"},{"cityCode":"321100","cityName":"镇江市"},{"cityCode":"321200","cityName":"泰州市"},{"cityCode":"321300","cityName":"宿迁市"}],
                330000:[{"cityCode":"330100","cityName":"杭州市"},{"cityCode":"330200","cityName":"宁波市"},{"cityCode":"330300","cityName":"温州市"},{"cityCode":"330400","cityName":"嘉兴市"},{"cityCode":"330500","cityName":"湖州市"},{"cityCode":"330600","cityName":"绍兴市"},{"cityCode":"330700","cityName":"金华市"},{"cityCode":"330800","cityName":"衢州市"},{"cityCode":"330900","cityName":"舟山市"},{"cityCode":"331000","cityName":"台州市"},{"cityCode":"331100","cityName":"丽水市"}],
                340000:[{"cityCode":"340100","cityName":"合肥市"},{"cityCode":"340200","cityName":"芜湖市"},{"cityCode":"340800","cityName":"安庆市"},{"cityCode":"341200","cityName":"阜阳市"}],
                440000:[{"cityCode":"440100","cityName":"广州市"},{"cityCode":"440200","cityName":"韶关市"},{"cityCode":"440300","cityName":"深圳市"},{"cityCode":"440400","cityName":"珠海市"},{"cityCode":"440500","cityName":"汕头市"},{"cityCode":"440600","cityName":"佛山市"},{"cityCode":"440700","cityName":"江门市"},{"cityCode":"440800","cityName":"湛江市"},{"cityCode":"440900","cityName":"茂名市"},{"cityCode":"441200","cityName":"肇庆市"},{"cityCode":"441300","cityName":"惠州市"},{"cityCode":"441400","cityName":"梅州市"},{"cityCode":"441500","cityName":"汕尾市"},{"cityCode":"441600","cityName":"河源市"},{"cityCode":"441700","cityName":"阳江市"},{"cityCode":"441800","cityName":"清远市"},{"cityCode":"441900","cityName":"东莞市"},{"cityCode":"442000","cityName":"中山市"},{"cityCode":"445100","cityName":"潮州市"},{"cityCode":"445200","cityName":"揭阳市"},{"cityCode":"445300","cityName":"云浮市"}],
                130000:[{"cityCode":"130100","cityName":"石家庄市"},{"cityCode":"130200","cityName":"唐山市"},{"cityCode":"130300","cityName":"秦皇岛市"},{"cityCode":"130400","cityName":"邯郸市"},{"cityCode":"130500","cityName":"邢台市"},{"cityCode":"130600","cityName":"保定市"},{"cityCode":"130700","cityName":"张家口市"},{"cityCode":"130800","cityName":"承德市"},{"cityCode":"130900","cityName":"沧州市"},{"cityCode":"131000","cityName":"廊坊市"},{"cityCode":"131100","cityName":"衡水市"}],
                410000:[{"cityCode":"410100","cityName":"郑州市"},{"cityCode":"410200","cityName":"开封市"},{"cityCode":"410300","cityName":"洛阳市"},{"cityCode":"410400","cityName":"平顶山市"},{"cityCode":"410600","cityName":"鹤壁市"},{"cityCode":"410800","cityName":"焦作市"},{"cityCode":"410881","cityName":"济源市"},{"cityCode":"410900","cityName":"濮阳市"},{"cityCode":"411000","cityName":"许昌市"},{"cityCode":"411100","cityName":"漯河市"},{"cityCode":"411200","cityName":"三门峡市"},{"cityCode":"411300","cityName":"南阳市"},{"cityCode":"411400","cityName":"商丘市"},{"cityCode":"411500","cityName":"信阳市"},{"cityCode":"411600","cityName":"周口市"},{"cityCode":"411700","cityName":"驻马店市"}],
                420000:[{"cityCode":"420100","cityName":"武汉市"},{"cityCode":"420200","cityName":"黄石市"},{"cityCode":"420300","cityName":"十堰市"},{"cityCode":"420500","cityName":"宜昌市"},{"cityCode":"420600","cityName":"襄阳市"},{"cityCode":"420700","cityName":"鄂州市"},{"cityCode":"420800","cityName":"荆门市"},{"cityCode":"420900","cityName":"孝感市"},{"cityCode":"421000","cityName":"荆州市"},{"cityCode":"421100","cityName":"黄冈市"},{"cityCode":"421200","cityName":"咸宁市"},{"cityCode":"421300","cityName":"随州市"},{"cityCode":"422800","cityName":"恩施土家族苗族自治州"}],
                430000:[{"cityCode":"430100","cityName":"长沙市"},{"cityCode":"430200","cityName":"株洲市"},{"cityCode":"430300","cityName":"湘潭市"},{"cityCode":"430400","cityName":"衡阳市"},{"cityCode":"430500","cityName":"邵阳市"},{"cityCode":"430600","cityName":"岳阳市"},{"cityCode":"430700","cityName":"常德市"},{"cityCode":"430800","cityName":"张家界市"},{"cityCode":"430900","cityName":"益阳市"},{"cityCode":"431000","cityName":"郴州市"},{"cityCode":"431100","cityName":"永州市"},{"cityCode":"431200","cityName":"怀化市"},{"cityCode":"431300","cityName":"娄底市"},{"cityCode":"433100","cityName":"湘西土家族苗族自治州"}],
                360000:[{"cityCode":"360100","cityName":"南昌市"},{"cityCode":"360200","cityName":"景德镇市"},{"cityCode":"360300","cityName":"萍乡市"},{"cityCode":"360400","cityName":"九江市"},{"cityCode":"360500","cityName":"新余市"},{"cityCode":"360600","cityName":"鹰潭市"},{"cityCode":"362100","cityName":"赣州市"},{"cityCode":"362200","cityName":"宜春市"},{"cityCode":"362300","cityName":"上饶市"},{"cityCode":"362400","cityName":"吉安市"},{"cityCode":"362500","cityName":"抚州市"}],
                370000:[{"cityCode":"370100","cityName":"济南市"},{"cityCode":"370200","cityName":"青岛市"},{"cityCode":"370300","cityName":"淄博市"},{"cityCode":"370400","cityName":"枣庄市"},{"cityCode":"370500","cityName":"东营市"},{"cityCode":"370600","cityName":"烟台市"},{"cityCode":"370700","cityName":"潍坊市"},{"cityCode":"370800","cityName":"济宁市"},{"cityCode":"370900","cityName":"泰安市"},{"cityCode":"371000","cityName":"威海市"},{"cityCode":"371100","cityName":"日照市"},{"cityCode":"371200","cityName":"莱芜市"},{"cityCode":"371300","cityName":"临沂市"},{"cityCode":"371400","cityName":"德州市"},{"cityCode":"371500","cityName":"聊城市"},{"cityCode":"371600","cityName":"滨州市"},{"cityCode":"371700","cityName":"菏泽市"}],
                140000:[{"cityCode":"140100","cityName":"太原市"}],
                150000:[{"cityCode":"150100","cityName":"呼和浩特市"},{"cityCode":"150200","cityName":"包头市"},{"cityCode":"150300","cityName":"乌海市"},{"cityCode":"150400","cityName":"赤峰市"},{"cityCode":"150500","cityName":"通辽市"},{"cityCode":"150600","cityName":"鄂尔多斯市"},{"cityCode":"150700","cityName":"呼伦贝尔市"},{"cityCode":"150800","cityName":"巴彦淖尔市"},{"cityCode":"150900","cityName":"乌兰察布市"},{"cityCode":"152500","cityName":"锡林郭勒盟"}],
                610000:[{"cityCode":"610100","cityName":"西安市"},{"cityCode":"610200","cityName":"铜川市"},{"cityCode":"610300","cityName":"宝鸡市"},{"cityCode":"610400","cityName":"咸阳市"},{"cityCode":"610500","cityName":"渭南市"},{"cityCode":"610600","cityName":"延安市"},{"cityCode":"610700","cityName":"汉中市"},{"cityCode":"610800","cityName":"榆林市"},{"cityCode":"610900","cityName":"安康市"},{"cityCode":"611000","cityName":"商洛市"}],
                650000:[{"cityCode":"650100","cityName":"乌鲁木齐市"},{"cityCode":"650200","cityName":"克拉玛依市"},{"cityCode":"650300","cityName":"吐鲁番地区"},{"cityCode":"650400","cityName":"昌吉回族自治州"},{"cityCode":"650500","cityName":"石河子市"},{"cityCode":"652700","cityName":"博尔塔拉蒙古自治州"},{"cityCode":"652800","cityName":"巴音郭楞蒙古自治州"},{"cityCode":"652900","cityName":"阿克苏地区"},{"cityCode":"653000","cityName":"克孜勒苏柯尔克孜自治州"},{"cityCode":"653100","cityName":"喀什地区"},{"cityCode":"653200","cityName":"和田地区"},{"cityCode":"654000","cityName":"伊犁哈萨克自治州"},{"cityCode":"654200","cityName":"塔城地区"},{"cityCode":"654300","cityName":"阿勒泰地区"},{"cityCode":"659000","cityName":"自治区直辖县级行政区划"}],
                530000:[{"cityCode":"530100","cityName":"昆明市"},{"cityCode":"530200","cityName":"曲靖市"},{"cityCode":"530300","cityName":"玉溪市"},{"cityCode":"530400","cityName":"保山市"},{"cityCode":"530500","cityName":"丽江市"},{"cityCode":"530600","cityName":"普洱市"},{"cityCode":"530700","cityName":"临沧市"},{"cityCode":"530800","cityName":"楚雄彝族自治州"},{"cityCode":"530900","cityName":"红河哈尼族彝族自治州"},{"cityCode":"531000","cityName":"文山壮族苗族自治州"},{"cityCode":"531100","cityName":"西双版纳傣族自治州"},{"cityCode":"531200","cityName":"大理白族自治州"},{"cityCode":"531300","cityName":"德宏傣族景颇族自治州"}]
            },
            autoBrandData:{
                "A": [
                    {name: "奥迪", value: "奥迪"},
                    {name: "奥路卡", value: "奥路卡"},
                    {name: "奥克斯", value: "奥克斯"},
                    {name: "阿斯顿-马丁", value: "阿斯顿-马丁"},
                    {name: "安驰", value: "安驰"}
                ],
                "B": [
                    {name: "本田", value: "本田"},
                    {name: "比亚迪", value: "比亚迪"},
                    {name: "宝马", value: "宝马"},
                    {name: "奔驰", value: "奔驰"},
                    {name: "梅赛德斯-迈巴赫", value: "梅赛德斯-迈巴赫"},
                    {name: "保时捷", value: "保时捷"},
                    {name: "标致", value: "标致"},
                    {name: "福建奔驰", value: "福建奔驰"},
                    {name: "北汽威旺", value: "北汽威旺"},
                    {name: "宝骏", value: "宝骏"},
                    {name: "北汽绅宝", value: "北汽绅宝"},
                    {name: "宾利", value: "宾利"},
                    {name: "北汽", value: "北汽"},
                    {name: "一汽奔腾", value: "一汽奔腾"},
                    {name: "别克", value: "别克"},
                    {name: "北京汽车", value: "北京汽车"},
                    {name: "北汽幻速", value: "北汽幻速"}
                ],
                "C": [
                    {name: "昌河铃木", value: "昌河铃木"},
                    {name: "长安", value: "长安"},
                    {name: "长安羚羊", value: "长安羚羊"},
                    {name: "长城", value: "长城"},
                    {name: "昌河", value: "昌河"},
                    {name: "长丰", value: "长丰"},
                    {name: "长丰三菱", value: "长丰三菱"},
                    {name: "长安谛艾仕", value: "长安谛艾仕"},
                    {name: "长丰扬子", value: "长丰扬子"}
                ],
                "D": [
                    {name: "东南", value: "东南"},
                    {name: "东风风神", value: "东风风神"},
                    {name: "东风", value: "东风"},
                    {name: "大迪", value: "大迪"},
                    {name: "大众", value: "大众"},
                    {name: "东风风行", value: "东风风行"},
                    {name: "东南克莱斯勒", value: "东南克莱斯勒"},
                    {name: "东南道奇", value: "东南道奇"},
                    {name: "道奇", value: "道奇"},
                    {name: "东风(东风股份)", value: "东风(东风股份)"},
                    {name: "成都大运", value: "成都大运"},
                    {name: "东方红", value: "东方红"},
                    {name: "东风风度", value: "东风风度"}
                ],
                "F": [
                    {name: "南京菲亚特", value: "南京菲亚特"},
                    {name: "丰田", value: "丰田"},
                    {name: "菲亚特", value: "菲亚特"},
                    {name: "福特", value: "福特"},
                    {name: "富迪", value: "富迪"},
                    {name: "飞碟", value: "飞碟"},
                    {name: "福田", value: "福田"},
                    {name: "福汽启腾", value: "福汽启腾"},
                    {name: "法拉利", value: "法拉利"},
                    {name: "福德", value: "福德"},
                    {name: "福达", value: "福达"}
                ],
                "G": [
                    {name: "广汽乘用车", value: "广汽乘用车"},
                    {name: "广汽菲亚特", value: "广汽菲亚特"},
                    {name: "观致", value: "观致"}
                ],
                "H": [
                    {name: "悍马", value: "悍马"},
                    {name: "海马", value: "海马"},
                    {name: "一汽红旗", value: "一汽红旗"},
                    {name: "哈飞", value: "哈飞"},
                    {name: "华普", value: "华普"},
                    {name: "悍霸", value: "悍霸"},
                    {name: "华泰", value: "华泰"},
                    {name: "黄海", value: "黄海"},
                    {name: "华翔富奇", value: "华翔富奇"},
                    {name: "哈弗", value: "哈弗"},
                    {name: "恒天汽车", value: "恒天汽车"},
                    {name: "华山", value: "华山"},
                    {name: "黑豹(哈飞)", value: "黑豹(哈飞)"},
                    {name: "黑豹(山东)", value: "黑豹(山东)"},
                    {name: "华颂", value: "华颂"}
                ],
                "J": [
                    {name: "吉利", value: "吉利"},
                    {name: "金杯", value: "金杯"},
                    {name: "解放(一汽吉林)", value: "解放(一汽吉林)"},
                    {name: "吉利帝豪", value: "吉利帝豪"},
                    {name: "江南", value: "江南"},
                    {name: "吉普", value: "吉普"},
                    {name: "江淮", value: "江淮"},
                    {name: "北京吉普", value: "北京吉普"},
                    {name: "捷豹", value: "捷豹"},
                    {name: "江铃福特", value: "江铃福特"},
                    {name: "江铃", value: "江铃"},
                    {name: "金旅", value: "金旅"},
                    {name: "吉奥", value: "吉奥"},
                    {name: "海格(苏州金龙)", value: "海格(苏州金龙)"},
                    {name: "解放", value: "解放"},
                    {name: "俊风", value: "俊风"}
                ],
                "K": [
                    {name: "开瑞", value: "开瑞"},
                    {name: "上海通用凯迪拉克", value: "上海通用凯迪拉克"},
                    {name: "北京克莱斯勒", value: "北京克莱斯勒"},
                    {name: "凯迪拉克", value: "凯迪拉克"},
                    {name: "克莱斯勒", value: "克莱斯勒"},
                    {name: "凯马", value: "凯马"},
                    {name: "凯翼", value: "凯翼"}
                ],
                "L": [
                    {name: "力帆(乘用车)", value: "力帆(乘用车)"},
                    {name: "雷克萨斯", value: "雷克萨斯"},
                    {name: "长安铃木", value: "长安铃木"},
                    {name: "铃木", value: "铃木"},
                    {name: "陆风", value: "陆风"},
                    {name: "路虎", value: "路虎"},
                    {name: "青年莲花", value: "青年莲花"},
                    {name: "雷诺", value: "雷诺"},
                    {name: "林肯", value: "林肯"},
                    {name: "力帆(重庆)", value: "力帆(重庆)"},
                    {name: "广汽本田理念", value: "广汽本田理念"},
                    {name: "劳斯莱斯", value: "劳斯莱斯"},
                    {name: "兰博基尼", value: "兰博基尼"}
                ],
                "M": [
                    {name: "迷你", value: "迷你"},
                    {name: "面包车", value: "面包车"},
                    {name: "MG名爵", value: "MG名爵"},
                    {name: "迈凯伦", value: "迈凯伦"},
                    {name: "马自达", value: "马自达"},
                    {name: "天汽美亚", value: "天汽美亚"},
                    {name: "玛莎拉蒂", value: "玛莎拉蒂"}
                ],
                "N": [
                    {name: "南汽新雅途", value: "南汽新雅途"},
                    {name: "南京依维柯", value: "南京依维柯"},
                    {name: "纳智捷", value: "纳智捷"},
                    {name: "南骏", value: "南骏"}
                ],
                "O": [
                    {name: "讴歌", value: "讴歌"},
                    {name: "欧宝", value: "欧宝"},
                    {name: "一汽欧朗", value: "一汽欧朗"},
                    {name: "欧铃", value: "欧铃"}
                ],
                "Q": [
                    {name: "奇瑞", value: "奇瑞"},
                    {name: "起亚", value: "起亚"},
                    {name: "启辰", value: "启辰"},
                    {name: "全球鹰", value: "全球鹰"},
                    {name: "庆铃(五十铃)", value: "庆铃(五十铃)"},
                    {name: "奇瑞捷豹路虎", value: "奇瑞捷豹路虎"}
                ],
                "R": [
                    {name: "日产", value: "日产"},
                    {name: "荣威", value: "荣威"},
                    {name: "瑞麒", value: "瑞麒"}
                ],
                "S": [
                    {name: "北京三菱", value: "北京三菱"},
                    {name: "斯巴鲁", value: "斯巴鲁"},
                    {name: "东南三菱", value: "东南三菱"},
                    {name: "上海大众斯柯达", value: "上海大众斯柯达"},
                    {name: "萨博", value: "萨博"},
                    {name: "斯柯达", value: "斯柯达"},
                    {name: "双环红星", value: "双环红星"},
                    {name: "双环", value: "双环"},
                    {name: "双龙", value: "双龙"},
                    {name: "三菱", value: "三菱"},
                    {name: "思铭", value: "思铭"},
                    {name: "上海大通", value: "上海大通"},
                    {name: "精灵Smart", value: "精灵Smart"}
                ],
                "T": [
                    {name: "天津一汽", value: "天津一汽"},
                    {name: "通家福", value: "通家福"},
                    {name: "特斯拉", value: "特斯拉"},
                    {name: "天马", value: "天马"},
                ],
                "W": [
                    {name: "上汽通用五菱", value: "上汽通用五菱"},
                    {name: "长安沃尔沃", value: "长安沃尔沃"},
                    {name: "沃尔沃", value: "沃尔沃"},
                    {name: "威麟", value: "威麟"},
                    {name: "沃尔沃亚太", value: "沃尔沃亚太"},
                    {name: "万丰", value: "万丰"},
                    {name: "潍柴汽车", value: "潍柴汽车"},
                ],
                "X": [
                    {name: "现代", value: "现代"},
                    {name: "北京现代", value: "北京现代"},
                    {name: "东风雪铁龙", value: "东风雪铁龙"},
                    {name: "夏利", value: "夏利"},
                    {name: "上海通用雪佛兰", value: "上海通用雪佛兰"},
                    {name: "上汽通用五菱雪佛兰", value: "上汽通用五菱雪佛兰"},
                    {name: "华泰现代", value: "华泰现代"},
                    {name: "雪铁龙", value: "雪铁龙"},
                    {name: "雪佛兰", value: "雪佛兰"},
                    {name: "新凯", value: "新凯"},
                    {name: "西雅特", value: "西雅特"},
                ],
                "Y": [
                    {name: "英菲尼迪", value: "英菲尼迪"},
                    {name: "一汽吉林", value: "一汽吉林"},
                    {name: "解放(一汽红塔)", value: "解放(一汽红塔)"},
                    {name: "英伦", value: "英伦"},
                    {name: "天津达路", value: "天津达路"},
                    {name: "一汽华利", value: "一汽华利"},
                    {name: "解放(一汽哈轻)", value: "解放(一汽哈轻)"},
                    {name: "一汽大发", value: "一汽大发"},
                    {name: "野马", value: "野马"},
                    {name: "东风英菲尼迪", value: "东风英菲尼迪"},
                    {name: "跃进", value: "跃进"}
                ],
                "Z": [
                    {name: "众泰", value: "众泰"},
                    {name: "华晨中华", value: "华晨中华"},
                    {name: "中顺", value: "中顺"},
                    {name: "郑州东风", value: "郑州东风"},
                    {name: "郑州海马", value: "郑州海马"},
                    {name: "中兴", value: "中兴"},
                    {name: "中国重汽", value: "中国重汽"},
                ]
            },
            policyNames:{

            },
            resourceNames:"",
            invoiceTypeData:{
                '05':'增值税电子普通发票',
                '01':'普通增值税发票',
                '02':'专用增值税发票'
            },
            invoiceCertiTypeData:{
                "01":"纳税识别号",
                "02":"统一社会信用代码"
            },
        },
            // 校验工具
        Vue.prototype.VTools={
            /**
             *手机号检验
             */
            checkInit: function (rule, value, callback) {
                var ruleText = /^[1-9]\d*$|^[0]$/,
                    massageText=(rule.messageText?rule.messageText:'整数');
                value=value?value.trim():value;
                if (value === '') {
                    rule.beNull?callback():callback(new Error('请输入'+massageText));
                } else if (!ruleText.test(value)) {
                    callback(new Error(massageText+'格式错误'));
                } else {
                    callback();
                }
            },
            /**
             *手机号检验
             */
            checkRate: function (rule, value, callback) {
                var ruleText = /^[1-9]\d*^|$[0]$/,
                    massageText=(rule.messageText?rule.messageText:'整数');
                value=value?value.trim():value;
                if (value === '') {
                    rule.beNull?callback():callback(new Error('请输入'+massageText));
                } else if (!ruleText.test(value)) {
                    callback(new Error(massageText+'格式错误'));
                } else {
                    callback();
                }
            },
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

                !/^[a-zA-Z\d]*$/.test(value)

            },
            checkIdNo:function(rule, value, name, callback){
                var n = name?name:'';
                var k= value;
                var pa = {};
                var ereg = '';
                k = k.toUpperCase();
                var m = [true,
                    "您输入的" + n + "身份证号码位数不对!",
                    "您输入的" + n + "身份证号码错误",
                    "您输入的" + n + "身份证号码错误",
                    "您输入的" + n + "身份证号码错误",
                    "您输入的" + n + "身份证号码错误"];
                var c = {
                    11: "\u5317\u4eac",
                    12: "\u5929\u6d25",
                    13: "\u6cb3\u5317",
                    14: "\u5c71\u897f",
                    15: "\u5185\u8499\u53e4",
                    21: "\u8fbd\u5b81",
                    22: "\u5409\u6797",
                    23: "\u9ed1\u9f99\u6c5f",
                    31: "\u4e0a\u6d77",
                    32: "\u6c5f\u82cf",
                    33: "\u6d59\u6c5f",
                    34: "\u5b89\u5fbd",
                    35: "\u798f\u5efa",
                    36: "\u6c5f\u897f",
                    37: "\u5c71\u4e1c",
                    41: "\u6cb3\u5357",
                    42: "\u6e56\u5317",
                    43: "\u6e56\u5357",
                    44: "\u5e7f\u4e1c",
                    45: "\u5e7f\u897f",
                    46: "\u6d77\u5357",
                    50: "\u91cd\u5e86",
                    51: "\u56db\u5ddd",
                    52: "\u8d35\u5dde",
                    53: "\u4e91\u5357",
                    54: "\u897f\u85cf",
                    61: "\u9655\u897f",
                    62: "\u7518\u8083",
                    63: "\u9752\u6d77",
                    64: "\u5b81\u590f",
                    65: "\u65b0\u7586",
                    71: "\u53f0\u6e7e",
                    81: "\u9999\u6e2f",
                    82: "\u6fb3\u95e8",
                    91: "\u56fd\u5916"
                };
                var b, l;
                var e, j;
                var a = new Array();
                a = k.split("");
                if (k == "") {
                    return true;
                }
                if (c[parseInt(k.substr(0, 2))] == null) {
                    return m[4];
                }
                switch (k.length) {
                    case 15:
                        if ((parseInt(k.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(k.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(k.substr(6, 2)) + 1900) % 4 == 0)) {
                            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
                        } else {
                            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
                        }
                        if (ereg.test(k)) {
                            var o = k.substr(6, 2);
                            var f = k.substr(8, 2);
                            var n = k.substr(10, 2);
                            if (pa && pa.oServerDate) {
                                var g = pa.oServerDate;
                            } else {
                                var h = new Date();
                                var g = new Date(h.getFullYear(), h.getMonth(), h.getDate());
                            }
                            var d = new Date(o, parseInt(f, 10) - 1, n);
                            if ((Date.parse(d) - Date.parse(g)) >= 0) {
                                return m[5];
                            }
                            return m[0];
                        } else {
                            return m[2];
                        }
                        break;
                    case 18:
                        if (parseInt(k.substr(6, 4)) % 4 == 0 || (parseInt(k.substr(6, 4)) % 100 == 0 && parseInt(k.substr(6, 4)) % 4 == 0)) {
                            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
                        } else {
                            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
                        }
                        if (ereg.test(k)) {
                            e = (parseInt(a[0]) + parseInt(a[10])) * 7 + (parseInt(a[1]) + parseInt(a[11])) * 9 + (parseInt(a[2]) + parseInt(a[12])) * 10 + (parseInt(a[3]) + parseInt(a[13])) * 5 + (parseInt(a[4]) + parseInt(a[14])) * 8 + (parseInt(a[5]) + parseInt(a[15])) * 4 + (parseInt(a[6]) + parseInt(a[16])) * 2 + parseInt(a[7]) * 1 + parseInt(a[8]) * 6 + parseInt(a[9]) * 3;
                            b = e % 11;
                            j = "F";
                            l = "10X98765432";
                            j = l.substr(b, 1);
                            if (j == a[17]) {
                                var o = k.substr(6, 4);
                                var f = k.substr(10, 2);
                                var n = k.substr(12, 2);
                                if (pa && pa.oServerDate) {
                                    var g = pa.oServerDate;
                                } else {
                                    var h = new Date();
                                    var g = new Date(h.getFullYear(), h.getMonth(), h.getDate());
                                }
                                var d = new Date(o, parseInt(f, 10) - 1, n);
                                if ((Date.parse(d) - Date.parse(g)) >= 0) {
                                    return m[5];
                                }
                                return m[0];
                            } else {
                                return m[3];
                            }
                        } else {
                            return m[2];
                        }
                        break;
                    default:
                        return m[1];
                        break;
                }
                return true;
            }

        },
            // 全局工具
        Vue.prototype.GTools= {
            /*动态加载的图片引入*/
            imagesUri:(url,type)=>{
                return require('../../assets/images/'+url);
            },
            /*保险公司logo引入*/
            logoImg:(name,prefix,suffix,type)=>{
                if(type == "piccTelSales"){//河南人保电销要不一样的logo
                    name = name.replace("picc_tscenter","picc_telSales");
                }
                if(EW && EW.logoUrl){
                    return EW.logoUrl(name,prefix,suffix);
                }else{
                    return "";
                }
            },
            "formatDate":{
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
            "getQueryStringByName": function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                var context = "";
                if (r != null)
                    context = r[2];
                reg = null;
                r = null;
                return context == null || context == "" || context == "undefined" ? "" : context;
            },
            "initSelectData": function(data,defaultText){
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
            "showView": function(matchedPath,route,isSubView){
                let currentPath = route.matched[route.matched.length-1].path;
                var exp = RegExp(matchedPath+'$');
                if(isSubView) {
                    return !exp.test(currentPath);
                }else{
                    return exp.test(currentPath);
                }

            },
            "listToTree": function(myId,pId,list){
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
            "removeEmpty":function(data){
                var result={};
                for(var key in data){
                    if(data[key]!=''){
                        result[key]=data[key]
                    }
                }
                return result;
            },
            "getCookie":function(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return (arr[2]);
                else
                    return null;
            },
            "setCookie":function (c_name, value, expiredays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + expiredays);
                document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
            },
            "delCookie":function (name) {
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
