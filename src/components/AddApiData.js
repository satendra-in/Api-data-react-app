import React from "react";
import logToSplunk from '../loggers/looger';


class AddApiData extends React.Component {

    state = {
        url: ""
    };

    add = (e) => {
        e.preventDefault();
        logToSplunk("Form submitted");
        if(this.state.url === "") {
            logToSplunk("URL is empty. Prompting user to enter URL.");
            alert("Enter URL");
            return;
        }
        logToSplunk(`Adding URL: ${this.state.url}`);
        this.props.addUrlHandler(this.state.url);
        this.setState({url:""});
        logToSplunk("URL state reset to empty.");
    }

    render() {
        logToSplunk("Rendering AddApiData component");
        return (
            <div className="ui main">
                <h3>Add API Data</h3>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>URL</label>
                        <input 
                            type="text" 
                            name="url" 
                            placeholder="enter URL" 
                            value={this.state.url} 
                            onChange={(e) => {
                                logToSplunk(`URL input changed to: ${e.target.value}`);
                                this.setState({url: e.target.value});
                            }}
                        />
                    </div>
                    <button className="ui button blue">Fetch Data</button>
                </form>
            </div>
        );
    }
}

export default AddApiData;
