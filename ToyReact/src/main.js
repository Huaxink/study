import ToyReact, { Component } from '../ToyReact'

class Square extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: null
        }
    }
    changeValue() {
        this.setState({
            value: this.state.value ? null : 'X'
        })
    }
    render() {
        return <div className="square" id={this.props.value} onClick={() => this.changeValue()}>
            {this.state.value || ''}
        </div>
    }
}

class Board extends Component {
    renderSquare(i) {
        return <Square value={i} />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="pan">
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
            </div>
        );
    }
}

class Game extends Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

ToyReact.reander(<Game />, document.body)
