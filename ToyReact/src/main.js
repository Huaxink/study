import ToyReact, { Component } from '../ToyReact'

class Mycomponent extends Component {
    render() {
        return <div>
            <span>cool</span>
        </div>
    }
}

ToyReact.reander(<Mycomponent id="com" name="ppp" />, document.body)
