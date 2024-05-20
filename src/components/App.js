import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import AddApiData from './AddApiData';
import ApiDataList from './ApiDataList';
import logToSplunk from '../loggers/looger';

function App() {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    const addUrlHandler = (url) => {
        logToSplunk(`URL added: ${url}`);
        setUrl(url);
    };

    useEffect(() => {
        if (url) {
            const fetchData = async () => {
                logToSplunk('Fetching data from API...');
                try {
                    logToSplunk(`Fetching data from: ${url}`);
                    const response = await axios.get(url);
                    logToSplunk('API response received:' + JSON.stringify(response));
                    setApiDataFromResponse(response.data);
                    logToSplunk('Updated apiData:' + JSON.stringify(response.data), 'info');
                    setLoading(false);
                } catch (error) {
                    logToSplunk('Error fetching data from API', 'error');
                    logToSplunk('Error fetching data from API' + JSON.stringify(error), 'error');
                    setError(error);
                    setLoading(false);
                }
            };

            const setApiDataFromResponse = (fetchedData) => {
                logToSplunk('Processing fetched data:' + JSON.stringify(fetchedData));
                const { login, created_at, updated_at } = fetchedData;
                const newDataObj = { login, created_at, updated_at };
                logToSplunk('New data object:', JSON.stringify(newDataObj));
                setApiData((prevApiData) => [...prevApiData, newDataObj]);
                logToSplunk('Updated apiData state:', [...apiData, newDataObj]);
            };

            fetchData();
        }
    }, [url]);

    return (
        <div className='ui container'>
            <Header />
            <AddApiData addUrlHandler={addUrlHandler} />
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error.message}</p>}
            <ApiDataList dataList={apiData} />
        </div>
    );
}

export default App;
