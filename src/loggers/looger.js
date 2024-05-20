// // logger.js
// import axios from 'axios';

// const SPLUNK_HEC_URL = 'http://localhost:8088/services/collector/event';
// const SPLUNK_HEC_TOKEN = 'e9cff9fd-3f35-49a6-9a75-557cf53aa3c6';
// const SPLUNK_INDEX = 'main'; // Replace with your specific index name

// const logToSplunk = async (message, level = 'info') => {
//     const event = {
//         event: {
//             message,
//             level,
//         },
//         sourcetype: '_json',
//         index: SPLUNK_INDEX, // Specify the index here
//     };

//     try {
//         console.log('Sending log to Splunk:', event);
//         const response = await axios.post(SPLUNK_HEC_URL, event, {
//             headers: {
//                 'Authorization': `Splunk ${SPLUNK_HEC_TOKEN}`,
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
//                 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
//             },
//         });
//         console.log('Log sent to Splunk:', response.data);
//     } catch (error) {
//         console.error('Error sending log to Splunk:', error);
//         if (error.response) {
//             console.error('Response error data:', error.response.data);
//         }
//     }
// };

// export default logToSplunk;


// logger.js
import axios from 'axios';

const PROXY_URL = 'http://localhost:3006/log';

const logToSplunk = async (message, level = 'info') => {
    const event = {
        event: {
            message,
            level,
        },
        sourcetype: '_json',
    };

    try {
        console.log('Sending log to proxy server:', event);
        const response = await axios.post(PROXY_URL, event, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Log sent via proxy server:', response.data);
    } catch (error) {
        console.error('Error sending log via proxy server:', error);
        if (error.response) {
            console.error('Response error data:', error.response.data);
        }
    }
};

export default logToSplunk;
