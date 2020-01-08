import React from 'react'
import Button from './Button'
import TextInput from './TextInput'
class OptionsElement extends React.Component {
    state = {

    }
    constructor(props) {
        super(props)
    }

    render() {
        const { option } = this.props
        return this.props.fields.type == "select" && <div>
            <div style={{ margin: "20px 0" }}>{option && option.length > 0 && option.map((e, index) => {
                return <div className="ui column stackable grid" style={{alignItems: "center"}}>
                    <TextInput label="Name" value={e.name} onChange={e => this.props.changeOptionValue(e.target.value, index, "name")} />
                    <TextInput label="Value" value={e.value} onChange={e => this.props.changeOptionValue(e.target.value, index, "value")} />
                    <div>
                        <Button onClick={e => this.props.deleteOption(index)} className="icon" label={<i className="ui icon trash alternate outline" />}></Button>
                    </div>
                </div>
            })}</div>
            <div>
                <Button onClick={e => this.props.addOption()} label="Add Option" />
            </div>
        </div>
    }
}
export default OptionsElement;