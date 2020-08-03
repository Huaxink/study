class ElementWapper {
    constructor(type) {
        this.node = document.createElement(type)
    }
    setAttribute(name, value) {
        this.node.setAttribute(name, value)
    }
    appendChild(vchild) {
        this.node.appendChild(vchild)
    }
    mountTo(parent) {
        parent.appendChild(this.node)
    }
}

class TextWapper {
    constructor(content) {
        this.node = document.createTextNode(content)
    }
    mountTo(parent) {
        parent.appendChild(this.node)
    }
}

export class Component {
    setAttribute(name, value) {
        this[name] = value
    }
    mountTo(parent) {
        const node = this.render()
        node.mountTo(parent)
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
        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWapper(child)
            }
            child.mountTo(element)
        }
        return element
    },
    reander(vdom, parentNode) {
        vdom.mountTo(parentNode)
    }
}

export default ToyReact