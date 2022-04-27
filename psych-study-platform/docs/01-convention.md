# Code Organization


Code is organized by features. You are likely to find code related to a particular feature together.

## Features
You can think of features as being the abstraction to discuss what the 
software does. Ideally this is a shared vocabulary between the 
developers, managers and users of the software.

1. `index.js` : This file is the interface for your express server. It does the job of automatically parsing the folders within the features directory and initializing and connecting the various modules.
2. `controller.js` : Features contain controllers to coordinate user request, accessing 
database or external APIs and returning the response.
3. `routes.js` : the endpoint path and request handler are defined and linked here.

## Data Loading and Syncing with backend
We have abstracted out repeating patterns of getting data from the server or posting data to server. The convention we use is :
1. Within the component we use a custom hook `useApi(requestConfig)`

requestConfig's structure is as follows : 
```javascript
 {
    "type": "POST",
    "endpoint": "/login",
    "authenticated" : true || false
    "bodyParams": payload,
    "queryParams" : payload
  }
```

2. We create convinient factory functions to create requestConfig for every api endpoint. These are present in `requests.js` file of each api entity.

eg : 
```javascript
function PostRequestLoginMaker(payload) {
  return {
    type: "POST",
    endpoint: "/login",
    bodyParams: payload,
  };
}
```