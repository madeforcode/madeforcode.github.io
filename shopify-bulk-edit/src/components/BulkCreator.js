import React from 'react'
import OptionsElement from './OptionsElement'
import TextInput from './TextInput'
import Select from './Select'
import Button from './Button'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class BulkCreator extends React.Component {
    state = {
        fields: {
            url: "",
            namespace: "",
            key: "",
            bulkUrl: "",
            metafieldTheme: "",
            owner: "product",
            type: "string"
        },
        option: []
    }
    childRef = {}
    constructor(props) {
        toast.configure()
        super(props)
    }
    addOption = () => {
        const { option } = this.state
        option.push({
            name: "",
            value: ""
        })
        this.setState({ option })
    }
    changeOptionValue = (value, index, field) => {
        const { option } = this.state
        option[index][field] = value
        this.setState({ option })
    }
    deleteOption = (index) => {
        let { option } = this.state
        console.log(index)
        option.splice(index, 1)
        this.setState({ option })

    }
    changeUrl = () => {
        const { fields, option } = this.state
        if (fields["url"] && fields["namespace"] && fields["key"]) {
            fields["bulkUrl"] = "https://" + fields["url"] + "/admin/bulk?resource_name=" + (fields['owner'] == "productVariant" ? "ProductVariant" : "Product") + "&edit=metafields." + fields["namespace"] + "." + fields["key"] + ":" + fields["type"]
            if (fields["type"] == "select") {
                let metafield_options = ""
                option.map(opt => {
                    metafield_options = metafield_options + 'metafield_options[metafields.' + fields["namespace"] + '.' + fields["key"] + '][' + opt.value + ']=' + opt.name + '&'
                })
                fields["bulkUrl"] = fields["bulkUrl"] + "&" + metafield_options
            }
            fields["metafieldTheme"] = '{{' + (fields['owner'] == "productVariant" ? "variant" : "product") + ".metafields." + fields["namespace"] + '.' + fields["key"] + '}}'
        } else {
            fields["bulkUrl"] = ""
        }
    }
    changeValue = (value, field) => {
        const { fields } = this.state;
        fields[field] = value
        if (field == "url") {
            fields[field] = this.shopName(value)
        }
        this.setState({ fields })
    }
    shopName = shopName => {
        shopName = shopName.replace(/^https?:\/\//, '')
        shopName = shopName.replace(/^http?:\/\//, '')
        if (shopName.indexOf('/') != -1) {
            shopName = shopName.substring(0, shopName.indexOf('/'))
        }
        return shopName;
    }
    setRef = (input) => {
        this.childRef = input;
    }
    setRefTheme = (input) => {
        this.childRefTheme = input;
    }
    copyText = (e, ref) => {
        if (this.state.fields.bulkUrl) {
            ref.select();
            document.execCommand('copy');
            toast.success("Copied !", { hideProgressBar: true })
        } else {
            toast.warn("Please Enter Valid Data", { hideProgressBar: true })
        }
        e.target.focus();
        this.setState({ copySuccess: 'Copied!' });
    }
    openUrl = () => {
        if (this.state.fields.bulkUrl) {
            window.open(this.state.fields.bulkUrl);
        } else {
            toast.warn("Please Enter Valid Data", { hideProgressBar: true })
        }
    }
    render() {
        return <div className="ui placeholder segment" style={{ padding: "5em 0", boxShadow: "0 0 13px 3px #0000002e" }}>
            <div className="ui two column stackable grid">
                <div className="ui vertical divider">URL</div>
                <div className="middle aligned row">
                    <div className="column">
                        <div>
                            <form className="ui form">
                                <TextInput label="Shop URL:" placeholder="demo.myshopify.com" value={this.state.fields.url} onChange={e => this.changeValue(e.target.value || "", "url")} onBlur={this.changeUrl()} />
                                <Select value={this.state.fields.owner} label="MetaField Resource" value={this.state.fields.owner} onChange={e => this.changeValue(e.target.value || "", "owner")} values={[
                                    {
                                        value: "product"
                                    }, {
                                        label: "variant",
                                        value: "productVariant"
                                    }
                                ]} />
                                <TextInput label="MetaField Namespace:" placeholder="Namespace" value={this.state.fields.namespace} onChange={e => this.changeValue(e.target.value || "", "namespace")} onBlur={this.changeUrl()} />
                                <TextInput label="MetaField Key:" placeholder="Key" value={this.state.fields.key} onChange={e => this.changeValue(e.target.value || "", "key")} onBlur={this.changeUrl()} />
                                <Select label="MetaField Type" value={this.state.fields.type} onChange={e => this.changeValue(e.target.value || "", "type")} values={[
                                    {
                                        value: "string"
                                    }, {
                                        value: "number"
                                    }, {
                                        value: "money"
                                    }, {
                                        value: "boolean"
                                    }, {
                                        value: "select"
                                    },
                                ]} />
                                <OptionsElement {...this.state} addOption={this.addOption} deleteOption={this.deleteOption} changeOptionValue={this.changeOptionValue} />
                            </form>
                        </div>
                    </div>
                    <div className="column">
                        <form className="ui form">
                            <TextInput setRef={this.setRef} label="Bulk Edit URL" value={this.state.fields.bulkUrl} readOnly />
                            <div className="ui grid">
                                <div className="four column centered row">
                                    <div className="column">
                                        <Button label={<span><i className="copy outline icon" />Copy</span>} onClick={e => this.copyText(e, this.childRef)} />
                                    </div>
                                    <div className="column">
                                        <Button label={<span><i className="external alternate icon" />Open</span>} onClick={e => this.openUrl()} />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-20"></div>
                            <TextInput setRef={this.setRefTheme} label="Metafield in Liquid" value={this.state.fields.metafieldTheme} readOnly />
                            <div className="ui grid">
                                <div className="four column centered row">
                                    <div className="column">
                                        <Button label={<span><i className="copy outline icon" />Copy</span>} onClick={e => this.copyText(e, this.childRefTheme)} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default BulkCreator;