import ToyReact, { Component } from '../ToyReact'

class Mycomponent extends Component {
    render() {
        return <div>
            <span>cool</span>
            <div>
                {true}
                {this.children}
            </div>
        </div>
    }
}

const a = <Mycomponent id="com" name="ppp">
    <div>ul</div>
</Mycomponent>

ToyReact.reander(a, document.body)
