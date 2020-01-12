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
                        // 点击叉号按钮删除当前小li
                    this.removes[i].onclick = this.removeTab
                        // 双击 标题盒子修改标题值
                    this.spans[i].ondblclick = this.editTab
                        // 双击改变内容
                        // this.sections[i].ondblclick = this.editTab
                    this.sections[i].ondblclick = this.editCon

                }
                // * click add button function
                // console.log(this.add)
                // 在点击添加按钮时要重新获取所有已经存在的元素
                this.add.onclick = this.addTab
            }
            // 获取当前所有的小li和section
        updateNode() {
                this.lis = this.main.querySelectorAll('li')
                    // 获取盒子中所有的section
                this.sections = this.main.querySelectorAll('section')
                    // 获取所有的关闭按钮
                this.removes = this.main.querySelectorAll('.iconfont')
                    // 获取所有的标题盒子
                this.spans = this.main.querySelectorAll('.navbar li span:first-child')
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
                var li = '<li class="li-active" ><span>new tab</span><span class="iconfont icon-guanbi">×</span></li>'

                that.ul.insertAdjacentHTML('beforeend', li)

                // 定义一个随机数放到新增加的选项卡内容中
                var random = Math.random()

                var section = '<section>new content:' + random + '</section>'
                that.con.insertAdjacentHTML('beforeend', section)
                    // 每点击一次添加按钮会更新一次初始化程序，会重新获得一次全部元素


                // 即每点击一次添加tab按钮完成之后都会重新初始化页面，初始化里面
                // 的updateNode()会再次获取全部的节点，包括追加的新元素，这样就不会遗漏了
                // 初始化程序中包括了给新追加的小li添加index属性
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
        removeTab(e) {
                // 阻止小li的冒泡点击事件发生
                e.stopPropagation()
                console.log('yyyyyyy')
                console.log(that.removes)
                    // 获取当前叉号按钮的父节点的index,即小li的index
                var index = this.parentNode.index
                    // console.log(index)
                    // 移除tab和对应内容
                that.lis[index].remove()
                that.sections[index].remove()
                that.init()
                    // 当删除完还存在选中状态的小li时，说明删除的不是选中状态的小li,此时停止函数执行即可
                if (document.querySelector('.li-active')) return;
                // 当删除完不存在选中状态的小li时，说明删除的就是选中状态的小li,此时继续执行后面函数

                // 删除一个tab后，让其前面的tab显示为当前样式并显示其内容
                index--
                // 这种小li必须存在才能执行自动点击事件
                that.lis[index] && that.lis[index].click()
            }
            // 4.modify function
        editTab() {
            var newthis = this
            console.log('ddddddddddd')
            var str = this.innerText
            console.log(str)
            this.innerText = ''
                // 双击标题按钮时生成一个文本框，并插入其中
            var textarea = document.createElement('input')
            textarea.className = 'editbox'
            textarea.value = str
            this.appendChild(textarea)
                // 让输入框中的值被双击后处于全选状态
            textarea.select()
                // 离开输入框时把文字给tab
            textarea.onblur = function() {
                newthis.innerText = this.value
                this.remove()
            }
            textarea.onkeyup = function(e) {
                if (e.keyCode === 13) {
                    this.onblur()

                }
            }

        }
        editCon() {
            // 内容区域编辑与tab编辑类似
            var thisonce = this
            console.log('what are you doing now')
            var str = this.innerText
            this.innerText = ''
            var newcon = document.createElement('input')
            newcon.className = 'editconbox'
            newcon.value = str
            this.appendChild(newcon)
            newcon.select()
            newcon.onblur = function() {
                thisonce.innerHTML = this.value
                this.remove()
            }
            newcon.onkeyup = function(e) {
                if (e.keyCode === 13) {
                    this.onblur()

                }
            }
        }
    }
    // new Tab,即实例化Tab,等于调用类里面的构造器
    new Tab('#tab');
})