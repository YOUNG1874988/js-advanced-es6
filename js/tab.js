window.addEventListener('load', function() {


    // 创建tab类
    var that
    class Tab {
        // 构造器
        constructor(id) {
                that = this
                    // 获取最外层盒子
                this.main = document.querySelector(id)
                    // 获取盒子中所有的小li
                this.lis = this.main.querySelectorAll('li')
                    // 获取盒子中所有的section
                this.sections = this.main.querySelectorAll('section')
                this.add = this.main.querySelector('.tabadd')
                this.ul = this.main.querySelector('ul')
                this.con = this.main.querySelector('.content')
                    // 在构造器中调用初始化函数
                this.init()
            }
            // 页面刚加载完成时执行初始化函数，即让相关元素默认绑定事件
        init() {
                // console.log(this.sections)
                // console.log(this.main)
                // console.log('hello jjjjj')
                // console.log(this.lis)
                this.updateNode()

                // * click each tab function
                for (var i = 0; i < this.lis.length; i++) {
                    // 给每个小li一个index值
                    this.lis[i].index = i
                        // 这里定义点击事件为toggleTab，会对toggle方法产生影响
                    this.lis[i].onclick = this.toggleTab
                }
                // * click add button function
                console.log(this.add)
                    // 在点击添加按钮时要重新获取所有已经存在的元素
                this.add.onclick = this.addTab
            }
            // 获取当前所有的小li和section
        updateNode() {
                this.lis = this.main.querySelectorAll('li')
                    // 获取盒子中所有的section
                this.sections = this.main.querySelectorAll('section')
            }
            // 一.switch function
        toggleTab() {
                // console.log(this.index)
                that.clear()
                    // 1.点击按钮切换当前样式
                this.className = 'li-active'
                    // 这里的this指的是this.lis[i],直接使用的话用的是this.lis[i].sections,是错误的
                    // this.sections[this.index].style.display = 'block'
                    // 要用某种方法使用构造器中的this
                    // 2.点击按钮显示当前按钮对应内容
                that.sections[this.index].style.display = 'block'
            }
            // 二.add function
        addTab() {
                // 点击添加按钮增加一个小li，并添加到ul中；
                // 同时创建一个section，并添加到content中
                // var newli = document.createElement('li')
                // that.ul.appendChild(newli)
                // 创建新的tab前清除所有其他tab的当前样式
                that.clear()
                var li = '<li class="li-active" ><span>new tab</span><span class="iconfont icon-guanbi"></span></li>'

                that.ul.insertAdjacentHTML('beforeend', li)

                // 定义一个随机数放到新增加的选项卡内容中
                var random = Math.random()

                var section = '<section>new content:' + random + '</section>'
                that.con.insertAdjacentHTML('beforeend', section)
                    // 每点击一次添加按钮会更新一次初始化程序，会重新获得一次全部元素


                // 即没点击一次添加tab按钮完成之后都会重新初始化页面，初始化里面
                // 的updateNode()会再次获取全部的节点，包括追加的新元素，这样就不会遗漏了
                that.init()
            }
            // 将所有的元素清除当前样式
        clear() {
                for (var m = 0; m < that.lis.length; m++) {
                    that.lis[m].className = ''
                }
                for (var j = 0; j < that.sections.length; j++) {
                    that.sections[j].style.display = 'none'
                }

            }
            // 3.delete functino
        removeTab() {

            }
            // 4.modify function
        editTab() {

        }
    }
    // new Tab,即实例化Tab,等于调用类里面的构造器
    new Tab('#tab');
})