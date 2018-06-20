// 全屏切换类
class wheel {
  constructor(page, ind) {
    this.ele = document.getElementById(page)
    this.inds = document.querySelector(ind).children // 挂载页面指示器
    this.length = this.ele.children.length
    this.curIndex = 0 // 标识当前页
    this.bindEvents()
    this.bindInd()
    let str = '您好，我叫郭鑫，来自南昌航空大学，网络工程专业，目前大三。从大二开始就一直在着重往前端方向进行学习，在学习过程中越来越觉得前端很有意思。在学习完基础知识，jquery, bootstrap后，大三开始学习了vue.js，node.js，mongodb。其中vue的话学习的是比较完整的，vue-router，vuex，nuxt.js，包括最先的vue-resource到现在的axios都已经基本掌握其使用，对于vue的源码，也陆续学习过一些(响应式原理，指令的绑定...)。我的个人博客应该算一个比较完整的个人项目，整站的开发，调试，部署，上线陆续用了一个多月时间，期间客户端从spa，到后来重构成ssr。还有一个就是学校的图书馆项目，项目中我只负责前端开发，目前该项目还在测试阶段。'
    this.$type = new type('type', str, 200) // 切屏触发type效果，所以在这里进行初始化
    this.progress = new progress('.progress') // 获取进度条
  }
  
  // 绑定切屏（鼠标滚轮）事件
  bindEvents() {
    this.ele.addEventListener('wheel', e => {
      let nextIndex = this.curIndex + (e.deltaY > 0 ? 1 : -1)
      if (nextIndex < 0 || nextIndex > 3) {
        return
      } else {
        let that = this
        // 这里不采用定时器进行控制切换频率，而是通过移除“transitionend”来达到效果
        this.ele.addEventListener('transitionend', function callback() {
          this.removeEventListener('transitionend', callback)
          that.inds[that.curIndex].className = ''
          that.curIndex = nextIndex
          that.inds[that.curIndex].className = 'active'
        })
        this.ele.style.transform = `translateY(-${100 / this.length * nextIndex}%)` //  切屏
        this.$type.curIndex = nextIndex // 将当前的页面id传入type,
        if (nextIndex === 1) {
          setTimeout(() => {
            that.$type.init()
          }, 1500) // 启动type效果,设定1500的延时
        }
        if (nextIndex === 2) {
          this.progress.init()
        }  
      }
    })
  }

  bindInd() {
    let that = this //保存this,让箭头函数内部能访问到外部的this
    for (let i = 0; i < this.inds.length; i++) {
      this.inds[i].addEventListener('click', e => {
        that.curIndex = i
        that.ele.style.transform = `translateY(-${100 / this.length * this.curIndex}%)`
      }) 
    }
  }
}

// 动态type
class type {
  constructor(ele, content, speed) {
    this.ele = document.getElementById(ele) // 设置挂载点
    this.content = content // 设置自我介绍的内容
    this.temp = ''
    this.speed = speed // 设置打字速度
    this.start = setInterval(this.startType.bind(this), this.speed) // 这里设置定时器主要是为了保存其返回值，让后面每次启动，取消的都是同一个定时器
    clearInterval(this.start) // 开启后马上取消，由init()启动
  }

  init() {
    // let timer = setTimeout(() => {}, 2000) // 设定延时启动打印
    // clearTimeout(timer)
    if (this.curIndex === 1) {
      clearInterval(this.start)
      this.start = setInterval(this.startType.bind(this), this.speed)
    } else {
      clearInterval(this.start)
      this.temp = ''
      this.ele.innerHTML = ''
    }
  }

  startType() {
    if (this.temp.length < this.content.length) {
      this.temp = this.content.substring(0, this.temp.length+1)
    } else {
      clearInterval(this.startType)
    }
    this.ele.innerHTML = this.temp;
  }
}

// 动态加载进度条
class progress {
  constructor(ele) {
    this.eles = document.querySelectorAll(ele)
  }

  init() {
    let that = this
    this.eles.forEach(ele => {
      ele.classList.add('start')
    })
    setTimeout(() => {
      that.eles.forEach(ele => {
        ele.classList.remove('start')
      })
    }, 3000)
  }
}

var page = new wheel('page', '.indicator')

console.log('本简历采用原生js(es6)开发，未用任何框架，ui库，纯手工打造，由于时间紧迫(花了不到一天时间），所以有很多地方可能考虑不周，兼容性可能也不是很好，想要更好的体验，推荐chrome，edge(其它浏览器未测试),暂不支持移动端适配。')