import React from 'react'
class TextInput extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="field ">
            <label className="ui left aligned">{this.props.label || "label"}</label>
            <input ref={this.props.setRef&&this.props.setRef}
                type="text"
                name={this.props.name || "name"}
                placeholder={this.props.placeholder || "Text"}
                disabled={this.props.disabled || false}
                readOnly={this.props.readOnly || false}
                value={this.props.value || ""}
                onChange={this.props.onChange && this.props.onChange}
                onBlur={this.props.onBlur && this.props.onBlur }
            />
        </div>
    }
}
export default TextInput;