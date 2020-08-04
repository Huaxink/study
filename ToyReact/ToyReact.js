// 真实DOM节点
class ElementWapper {
    constructor(type) {
        this.node = document.createElement(type)
    }
    setAttribute(name, value) {
        if (name.match(/^on([\s\S]+)$/)) {
            const eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase())
            this.node.addEventListener(eventName, value)
        }
        if (name === 'className') {
            name = 'class'
        }
        this.node.setAttribute(name, value)
    }
    appendChild(vchild) {
        // 实dom，用range 来获取dom范围，或者设置dom范围
        const range = document.createRange();
        if (this.node.children && this.node.children.length) {
            range.setStartAfter(this.node.lastChild)
            range.setEndAfter(this.node.lastChild)
        } else {
            range.setStart(this.node, 0)
            range.setEnd(this.node, 0)
        }

        vchild.mountTo(range)
    }
    mountTo(range) {
        range.deleteContents();
        range.insertNode(this.node)
    }
}

// 文本组件
class TextWapper {
    constructor(content) {
        this.node = document.createTextNode(content)
    }
    mountTo(range) {
        range.deleteContents();
        range.insertNode(this.node)
    }
}

// 虚拟组件
export class Component {
    constructor() {
        this.children = []
        this.props = Object.create(null)
    }
    setAttribute(name, value) {
        this[name] = value
        this.props[name] = value
    }
    mountTo(range) {
        this.range = range
        this.update()
    }
    update() {
        const wapper = document.createComment('');
        const range = document.createRange();
        range.setStart(this.range.endContainer, this.range.endOffset)
        range.setEnd(this.range.endContainer, this.range.endOffset)
        range.insertNode(wapper)
        this.range.deleteContents()
        const vnode = this.render()
        vnode.mountTo(this.range)
    }
    appendChild(vchild) {
        this.children.push(vchild)
    }
    setState(state) {
        const merge = (oldState, newState) => {
            for (const p in newState) {
                if (typeof newState[p] === 'object' && newState[p] !== null) {
                    if (typeof oldState[p] === 'object') {
                        oldState[p] = {}
                    }
                    merge(oldState[p], newState[p])
                } else {
                    oldState[p] = newState[p]
                }
            }
        }
        if (!this.state && state) {
            this.state = {}
        }
        merge(this.state, state)
        this.update()
    }
}

export let ToyReact = {
    createElement(type, attr, ...children) {
        let element;
        if (typeof type === 'string') {
            element = new ElementWapper(type)
        } else {
            element = new type
        }
        for (const key in attr) {
            element.setAttribute(key, attr[key])
        }
        const insertChild = (children) => {
            for (let child of children) {
                if (typeof child === 'object' && child instanceof Array) {
                    insertChild(child)
                } else {
                    if (!(child instanceof ElementWapper)
                        && !(child instanceof TextWapper)
                        && !(child instanceof Component)) {
                        child = String(child)
                    }
                    if (typeof child === 'string') {
                        child = new TextWapper(child)
                    }
                    element.appendChild(child)
                }
            }
        }
        insertChild(children)
        return element
    },
    reander(vdom, parentNode) {
        const range = document.createRange();
        if (parentNode.children && parentNode.children.length) {
            range.setStartAfter(parentNode.lastChild)
            range.setEndAfter(parentNode.lastChild)
        } else {
            range.setStar(parentNode, 0)
            range.setEnd(parentNode, 0)
        }
        vdom.mountTo(range)
    }
}

export default ToyReact