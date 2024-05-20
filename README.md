
# React App with Splunk Logging
This is a simple React application that fetches data from an external API and logs important actions to Splunk. The app allows users to add URLs to fetch data from, displays the fetched data, and includes logging functionality using a proxy server to forward logs to Splunk.

## Features
Fetch Data from External API: The app can call an external API and display the data.
Add/Edit Comments: Users can add and edit comments on the displayed data.
Logging to Splunk: All important steps and actions are logged to Splunk using a proxy server.
## Components
#### App.js
The main component of the application that handles the state and rendering of other components.

#### AddApiData.js
A component that allows users to input a URL to fetch data from.

#### ApiDataList.js
A component that displays the fetched data and allows users to add comments.

#### logger.js
A logging module that sends logs to Splunk via a proxy server.

## Proxy Server Setup
To enable logging to Splunk, a proxy server is used to handle cross-origin requests and forward logs to the Splunk HTTP Event Collector (HEC). Below is the code for the proxy server.

### server.js

```
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const port = 3006;

const SPLUNK_HEC_URL = http://127.0.0.1:8088/services/collector/event;
const SPLUNK_HEC_TOKEN = '2113c8cf-a34f-4bc6-abd4-d90c37bbcd61';
const SPLUNK_INDEX = 'main';

app.use(cors());
app.use(express.json());

app.post('/log', async (req, res) => {
    const event = {
        ...req.body,
        index: SPLUNK_INDEX
    };

    console.log('Received event to log:', event);

    try {
        const response = await axios.post(SPLUNK_HEC_URL, event, {
            headers: {
                'Authorization': 'Splunk ${SPLUNK_HEC_TOKEN}',
                'Content-Type': 'application/json',
            },
        });
        console.log('Response from Splunk:', response.data);
        res.status(200).send(response.data);
    } catch (error) {
        console.error('Error sending event to Splunk:', error);
        if (error.response) {
            console.error('Splunk response error data:', error.response.data);
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send(error.toString());
        }
    }
});

app.listen(port, () => {
    console.log("Proxy server running at http://localhost:${port}");
});
```

## Configuring Splunk HEC
To configure Splunk HTTP Event Collector (HEC), follow these steps:

### Enable HEC:

- Log in to your Splunk instance.
- Go to Settings > Data Inputs.
- Click on HTTP Event Collector.
- Click on Global Settings.
- Enable the HEC and make sure Enable SSL is checked if you're using HTTPS.

### Create a New HEC Token: 
- In the HTTP Event Collector page, click on New Token.
- Give your token a name (e.g., ReactAppLogger).
- Set the source type to _json.
- Select an index (e.g., main).
- Click Next through the remaining steps and click Finish.
- Copy the token value; you'll need it for the proxy - server configuration.
### Update server.js with Your Splunk HEC Details:

- Replace the SPLUNK_HEC_URL with your Splunk HEC URL.
- Replace the SPLUNK_HEC_TOKEN with the token you created.
- Replace SPLUNK_INDEX with the index you selected for your HEC token.

## Running the Application
- Install Dependencies:


```npm install```
- Start the Proxy Server:
Ensure the proxy server is running on port 3006.

```node server.js```
- Start the React Application:

```npm start```

## Logging to Splunk
Logs are sent to Splunk through a proxy server that adds the necessary CORS headers. Ensure the proxy server is configured correctly and running.