# study
学习群

# 学习总结
## 1. jsx可以传入type, attr, 和children 三个属性来实例化虚拟dom
## 2. document.createRange 可以精准操作dom元素，和dom元素片段，并且是安全性
## 3. 需要一个创建虚拟dom类和创建实例dom类，虚拟dom类的update比对是否更新
## 4. 比对虚拟dom，基本比对的是type，props，和children
## 5. props里函数，对象，数组等复杂类型数据和基本类型数据的比对，不一致再更新，children可以先比对数量
## 6. 文本类dom比对的是content属性
## 7. 框架里，最基本的两个生命周期，update 和 mount ，update可以由setState触发
## 8. 挂载dom元素到doucument需要挂载的位置，就需要range，所以每次更新时，都会存储当前dom节点的挂载位置
## 9. 正则 name.match(/^on([\s\S]+)$/) 来获取监听方法，
