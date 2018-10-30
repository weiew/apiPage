<template>
  <div class="loginBg">
    <span class="versionSpan">V~0·0·9</span>
    <canvas id="bgCanvas"></canvas>
    <div class="login">
      <img class="loginLogo" src="http://e.weiew.net/images/logo500.png">
      <div class="title">
        <h3>登录</h3>
      </div>
      <el-form ref="loginForm" :model="loginForm" status-icon :rules="loginRules" label-width="0" class="loginForm">
        <el-form-item label="" prop="account">
          <el-input v-model="loginForm.account" prefix-icon="el-icon-message" placeholder="请输入用户名/邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-view" type="password" placeholder="请输入密码" @keyup.enter="login"></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-col :span="6" class="forget">
            <a class="linkText" href="#/forget"><i class="el-icon-question"></i>忘记密码？</a>
          </el-col>
          <el-col :span="18">
            <el-button type="primary" @click="login()" size="small" style="width: 180px">登录</el-button>
            <a class="linkBtn" href="#/register">注册</a>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="beian">
      © 2018-2020 weiew.net 版权所有
      <a href="http://www.miitbeian.gov.cn">粤ICP备18110117号-1</a>
    </div>
  </div>
</template>

<script>
import api from '../api/api';
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      loginForm:{
        account:"",
        password:""
      },
      loginRules: {
        account: [
          {required: true, message: '请输入用户名/邮箱地址', trigger: 'blur'},
          // { validator: this.VTools.checkMobile, messageText:'登录账号' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: this.VTools.checkPassword, messageText: '登录密码'}
        ]
      },
    }
  },
  methods:{
    initBg (){
      var canvas = document.getElementById('bgCanvas')
      var ctx = canvas.getContext('2d')
      var numParticles = 140
      var bg = [4, 4, 2]
      var cols = ['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff9900', '#ffffff', '#990000']
// var cols = ['#FF5722', '#FF9800', '#FF9800', '#FF9800', '#FF9800', '#B71C1C', '#00BCD4', '#00BCD4', '#009688']
      setup()
      window.addEventListener('resize', setup)

      function setup() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${1})`
        ctx.fill()
      }
      var step = 0

      var mouse = {
        x: canvas.width/2,
        y: canvas.height/2
      }
      document.onmousemove = function(e){
        mouse = {x:e.pageX, y:e.pageY}
      }
      setInterval(animate, 1000/30)
      function animate() {
        fade(0.34)
        draw()
      }

      function fade(amt) {
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${amt})`
        ctx.fill()
      }

      function Particle () {
        this.pos = {
          x: Math.random() * canvas.width * 0.1 + canvas.width * 0.45,
          y: Math.random() * canvas.height * 0.1 + canvas.height * 0.45
        }
        this.r = 1
        this.speed = 22
        this.hue = [44, 36, 36, 24, 14, 4, 24, 24][Math.floor(Math.random()*7)]
        this.step = Math.random() * 400
        this.vx = Math.random() * this.speed/4 - this.speed/8
        this.vy = Math.random() * this.speed/4 - this.speed/8
        this.colIndex = Math.floor(Math.random()*cols.length)
        this.history = []
        this.update = function () {
          this.step ++
          this.step %= 400
          if (this.history.length > 5){
            this.history.shift()
          }
          this.pos.x += this.vx
          this.pos.y += this.vy
          this.vx = this.vx * 0.8 + (Math.random() * this.speed * 2 - this.speed) * 0.2
          this.vy = this.vy * 0.8 + (Math.random() * this.speed * 2 - this.speed) * 0.2
          if(this.step > 325 || (this.step > 100 && this.step < 190) ) {
            var m = Math.min(canvas.height, canvas.width) * 0.3
            var p = Math.PI * 2 * (step + this.step * 0.01) / 180
            this.vx = (Math.cos(p) * m - this.pos.x + canvas.width/2) * 0.016 + this.vx * 0.97
            this.vy = (Math.sin(p) * m - this.pos.y + canvas.height/2) * 0.016 + this.vy * 0.97
          }


          var speed = Math.min(Math.abs(this.vx) + Math.abs(this.vy), 50) / 50
          if (this.history.length > 4){
            ctx.beginPath()
            ctx.moveTo(this.pos.x ,this.pos.y)
            for (var i = this.history.length-1; i >= 0;  i--){
              ctx.lineTo(this.history[i].x ,this.history[i].y)
            }
            ctx.fillStyle = `hsla(${this.hue},${99}%,${speed*70 + 30}%,${speed*0.3+0.7})`
            ctx.fill()
            ctx.lineWidth = 1
            ctx.lineJoin = "round"
          }
          if (this.pos.x > canvas.width || this.pos.x < 0 || this.pos.y > canvas.height || this.pos.y < 0) {
            delete this.pos
            delete this.history
            return false;
          }
          this.history.push({
            x: this.pos.x,
            y: this.pos.y
          })
          return true;
        }
      }
      var particles = [new Particle()]
      function draw() {
        step ++
        step %= 180

        if (particles.length < numParticles) {
          particles.push(new Particle())
        }
        particles = particles.filter(function (p){
          return p.update()
        })
      }
    },
    initBg2 (){
      var canvas = document.getElementById('bgCanvas')
      var ctx = canvas.getContext("2d");
      var cw = canvas.width = window.innerWidth,
        cx = cw / 2;
      var ch = canvas.height = window.innerHeight,
        cy = ch / 2;

      ctx.fillStyle = "#4f3540";
      var linesNum = 16;
      var linesRy = [];
      var requestId = null;
      function Line(flag) {
        this.flag = flag;
        this.a = {};
        this.b = {};
        if (flag == "v") {
          this.a.y = 0;
          this.b.y = ch;
          this.a.x = randomIntFromInterval(0, ch);
          this.b.x = randomIntFromInterval(0, ch);
        } else if (flag == "h") {
          this.a.x = 0;
          this.b.x = cw;
          this.a.y = randomIntFromInterval(0, cw);
          this.b.y = randomIntFromInterval(0, cw);
        }
        this.va = randomIntFromInterval(25, 100) / 100;
        this.vb = randomIntFromInterval(25, 100) / 100;

        this.draw = function() {
          ctx.strokeStyle = "#c7d9c1";
          ctx.beginPath();
          ctx.moveTo(this.a.x, this.a.y);
          ctx.lineTo(this.b.x, this.b.y);
          ctx.stroke();
        }
        this.update = function() {
          if (this.flag == "v") {
            this.a.x += this.va;
            this.b.x += this.vb;
          } else if (flag == "h") {
            this.a.y += this.va;
            this.b.y += this.vb;
          }
          this.edges();
        }

        this.edges = function() {
          if (this.flag == "v") {
            if (this.a.x < 0 || this.a.x > cw) {
              this.va *= -1;
            }
            if (this.b.x < 0 || this.b.x > cw) {
              this.vb *= -1;
            }
          } else if (flag == "h") {
            if (this.a.y < 0 || this.a.y > ch) {
              this.va *= -1;
            }
            if (this.b.y < 0 || this.b.y > ch) {
              this.vb *= -1;
            }
          }
        }

      }
      for (var i = 0; i < linesNum; i++) {
        var flag = i % 2 == 0 ? "h" : "v";
        var l = new Line(flag);
        linesRy.push(l);
      }
      function Draw() {
        requestId = window.requestAnimationFrame(Draw);
        ctx.clearRect(0, 0, cw, ch);

        for (var i = 0; i < linesRy.length; i++) {
          var l = linesRy[i];
          l.draw();
          l.update();
        }
        for (var i = 0; i < linesRy.length; i++) {
          var l = linesRy[i];
          for (var j = i + 1; j < linesRy.length; j++) {
            var l1 = linesRy[j]
            Intersect2lines(l, l1);
          }
        }
      }
      function Init() {
        linesRy.length = 0;
        for (var i = 0; i < linesNum; i++) {
          var flag = i % 2 == 0 ? "h" : "v";
          var l = new Line(flag);
          linesRy.push(l);
        }
        if (requestId) {
          window.cancelAnimationFrame(requestId);
          requestId = null;
        }

        cw = canvas.width = window.innerWidth,
          cx = cw / 2;
        ch = canvas.height = window.innerHeight,
          cy = ch / 2;

        Draw();
      };
      setTimeout(function() {
        Init();

        addEventListener('resize', Init, false);
      }, 15);

      function Intersect2lines(l1, l2) {
        var p1 = l1.a,
          p2 = l1.b,
          p3 = l2.a,
          p4 = l2.b;
        var denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
        var ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator;
        var ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator;
        var x = p1.x + ua * (p2.x - p1.x);
        var y = p1.y + ua * (p2.y - p1.y);
        if (ua > 0 && ub > 0) {
          markPoint({
            x: x,
            y: y
          })
        }
      }
      function markPoint(p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
      function randomIntFromInterval(mn, mx) {
        return ~~(Math.random() * (mx - mn + 1) + mn);
      }
    },
    login:function () {
      var _this = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let postData = {
            account:this.loginForm.account,
            password:this.loginForm.password,
            media:"mobile"
          }
          api.post('api/user/login')(postData).then((data) => {
            if(data.code == "200"){
              sessionStorage.setItem("token",data.dto.token);
              sessionStorage.setItem("account",this.loginForm.account);
              api.post('api/user/userInfoByToken')({loginId:data.dto.loginId}).then((dataA) => {
                if(dataA.code == "200"){
                  _this.setToken({token: data.dto.token});
                  _this.saveUserInfo(dataA.dto);
                  this.$message("登录成功");
                  this.$router.push({path: '/'});
                }else{
                  sessionStorage.removeItem("token");
                }
              })
            }else{
              this.$message({
                message: data.msg || '登录失败',
                type: 'error'
              });
            }
          })
        }else{
          console.log("录入内容格式错误")
        }
      })
    },
    register:function () {

    },
    ...mapActions([
      'saveUserInfo',
      'setToken'
    ])
  },
  mounted() {
    sessionStorage.removeItem("token");
    this.initBg2();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bgCanvas{

}
.loginBg{
  background: url(http://e.weiew.net/images/bg-ss.jpg) no-repeat 100% 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  display: block;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.linkBtn{
  border-radius: 3px;
  padding: 9px 10px;
  background: #dedede;
  color: #2f363c;
  text-decoration: none;
  font-size: 12px;
}
.linkText{
  color: #525252;
  text-decoration: none;
  font-size: 12px;
}
.login{
  position: absolute;
  top: 30%;
  left: 50%;
  width: 500px;
  margin-left: -250px;
  background: #ffffff;
  opacity: 0.95;
  border-radius: 20px;
}
.loginLogo{
  position: absolute;
  top: 0px;
  height: 60px;
  right: 0px;
}
.login .title{
  background: #24292e;
  height: 60px;
  margin-bottom: 60px;
  width: 100%;
}
.loginForm{
  margin: 60px auto 60px;
  width: 80%;
}
.login h2{
  position: absolute;
  height: 30px;
  top: -30px;
  margin: auto;
  width: 450px;
  text-align: center;
  background: #fafbfb;
  left: 0px;
  line-height: 30px;
  font-size: 24px;
  color: #fc6a47;
  border-radius: 10px 10px 0 0;
}
.login h3{
  color: #f96745;
  line-height: 60px;
  margin: 0;
  text-align: left;
  padding-left: 15px;
  font-weight: normal;
  font-size: 33px;
}
.versionSpan{
  color: #fff;
  background: #000;
  width: 10px;
  display: inline-block;
  height: 100px;
  position: absolute;
  right: 0px;
  text-align: center;
  padding: 12px 1px 10px;
  word-wrap: break-word;
  font-size: 12px;
  top: 50%;
  margin-top: -100px;
}
.forget{
  font-size: 12px;
  color: #5d6de2;
  text-align: left;
}
.beian{
  font-size: 12px;
  position: fixed;
  bottom: 30px;
  left: 50%;
  margin-left: -150px;
}
.beian a{
  color: #6149ff;
}
</style>
