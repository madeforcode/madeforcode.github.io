import React from 'react'
class Select extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div className="field ">
            <label className="ui left aligned">{this.props.label || "label"}</label>
            <select value={this.props.value||""} onChange={this.props.onChange && this.props.onChange }>
                {this.props.values && this.props.values.length > 0 && this.props.values.map( option => {
                    return <option key={option.value} value={option.value}>{option.label||option.value}</option>
                })} 
            </select>
        </div>
    }
}
export default Select;