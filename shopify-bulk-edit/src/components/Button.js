import React from 'react'
class Button extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <button
            type="button"
            className={"ui button " + (this.props.className || "")}
            onClick={this.props.onClick&&this.props.onClick}
        >
            {this.props.label}
        </button>
    }
}
export default Button;