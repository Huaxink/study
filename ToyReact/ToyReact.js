// 真实DOM节点
class ElementWapper {
    constructor(type) {
        this.node = document.createElement(type)
    }
    setAttribute(name, value) {
        this.node.setAttribute(name, value)
    }
    appendChild(vchild) {
        vchild.mountTo(this.node)
    }
    mountTo(parent) {
        parent.appendChild(this.node)
    }
}

// 文本组件
class TextWapper {
    constructor(content) {
        this.node = document.createTextNode(content)
    }
    mountTo(parent) {
        parent.appendChild(this.node)
    }
}

// 虚拟组件
export class Component {
    constructor() {
        this.children = []
    }
    setAttribute(name, value) {
        this[name] = value
    }
    mountTo(parent) {
        const node = this.render()
        node.mountTo(parent)
    }
    appendChild(vchild) {
        this.children.push(vchild)
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
        vdom.mountTo(parentNode)
    }
}

export default ToyReact