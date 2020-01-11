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
                    // 在构造器中调用初始化函数
                this.init()
            }
            // 页面刚加载完成时执行初始化函数，即让相关元素默认绑定事件
        init() {
                // console.log(this.sections)
                // console.log(this.main)
                // console.log('hello jjjjj')
                // console.log(this.lis)
                for (var i = 0; i < this.lis.length; i++) {
                    // 给每个小li一个index值
                    this.lis[i].index = i
                        // 这里定义点击事件为toggleTab，会对toggle方法产生影响
                    this.lis[i].onclick = this.toggleTab

                }
            }
            // 1.switch function
        toggleTab() {
                // console.log(this.index)
                // 1.点击按钮切换当前样式
                for (var m = 0; m < that.lis.length; m++) {
                    that.lis[m].className = ''
                }
                this.className = 'li-active'
                    // 这里的this指的是this.lis[i],直接使用的话用的是this.lis[i].sections,是错误的
                    // this.sections[this.index].style.display = 'block'
                    // 要用某种方法使用构造器中的this
                    // 2.点击按钮显示当前按钮对应内容
                for (var j = 0; j < that.sections.length; j++) {
                    that.sections[j].style.display = 'none'
                }
                that.sections[this.index].style.display = 'block'
            }
            // 2.add function
        addTab() {

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