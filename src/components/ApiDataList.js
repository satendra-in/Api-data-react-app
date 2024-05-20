import React from "react";
import logToSplunk from '../loggers/looger';


const ApiDataList = (props) => {
    logToSplunk("Rendering ApiDataList component");

    const renderApiData = props.dataList.map((data, index) => {
        logToSplunk(`Rendering data item at index ${index}:`, data);
        return (
            <div className="item" key={index}>
                <div className="content">
                    <div className="header">{data.login}</div>
                    <div>{data.created_at}</div>
                    <div>{data.updated_at}</div>
                    <div className="field">
                        <input
                            type="text"
                            name="comment"
                            placeholder="Write your comment..."
                            onChange={(e) => logToSplunk(`Comment changed for ${data.login}: ${e.target.value}`)}
                        />
                    </div>
                </div>
                <i className="trash alternate outline icon" onClick={() => logToSplunk(`Delete icon clicked for ${data.login}`)}></i>
            </div>
        );
    });

    return (
        <div className="ui celled list">
            {renderApiData}
        </div>
    );
}

export default ApiDataList;
