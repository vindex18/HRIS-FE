import axios from 'axios';


export const api_url = () => {
    return 'http://localhost/hris-api/public';
}

// let uploadProgress = {
//     onUploadProgress: progressEvent => {
//       let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
//       // do whatever you like with the percentage complete
//       // maybe dispatch an action that will update a progress bar or something
//     }
// }

export const validateCredentials = (bodyFormData) => {
   return new Promise( function(resolve) {
    axios({
        method: 'post',
        url: api_url() +'/authorization/validatecredentials',
        data: bodyFormData,
        headers: {'Content-Type': 'application/json' }
    })
    .then((response) => {
        //handle success
        //console.log(response);
        if(response.data.status){ // if valid
            console.log("Sending Log...");
            return resolve(response);
        }else if(!response.data.status){ // if invalid   
            return resolve(response);
        }
    })
    .catch(function(response) {
        //handle error
        console.log(resolve(response));
    });
});

}

export const getUserDataByToken = (props) => {
    let bodyFormData = new FormData();
    bodyFormData.set('token', localStorage.getItem('token'));
    axios({
        method: 'post',
        url: api_url() +'/authorization/token',
        data: bodyFormData,
        // config: { headers: {'Content-Type': 'multipart/form-data' }}
        config: { headers: {'Content-Type': 'application/json' }}
    }).then((response) => {
        //handle success
        console.log(response);
        console.log(response.data.tk);
    }).catch(function (response) {
        //handle error
        console.log(response);
    });
}

export const getTimeCardConfig = (props) => {
    let bodyFormData = new FormData();
    let token = localStorage.getItem('token');
    return new Promise( function(resolve) {
        axios({
            method: 'get',
            url: api_url() +'/attendance/timelogstatus',
            data: bodyFormData,
            headers: {'Content-Type': 'application/json', 'Authorization': token }
        })
        .then((response) => {
            //handle success
            if(response.data.status){ // if valid
                return resolve(response.data.log);
            }else if(!response.data.status){ // if invalid   
                console.log("Error Time Card");
            }
        })
        .catch(function(response) {
            //handle error
            console.log(response);
        });
    });
}

export const getTimeKeepingTable = () => { //For Admin Timekeeping Table 1
    let bodyFormData = new FormData();
    let token = localStorage.getItem('token');

    return new Promise( function(resolve) {
        axios({
            method: 'get',
            url: api_url() +'/attendance/allemployee/+/+/', //Default Config
            headers: {'Content-Type': 'application/json', 'Authorization': token }
        }) 
        .then((response) => {
            //handle success
            console.log("FOR CHECKING");
            console.log(response.data.status);
            console.log("FOR CHECKING");

            if(response.data.status){ // if valid
                return resolve(response);
            }else if(!response.data.status){ // if invalid   
                console.log("Error Encountered on Fetching Data");
                return resolve(response);
                
            }
        })
        .catch(function(response) {
            //handle error
            console.log(response);
        });
    });
}

export const getTimeKeepingTable1 = (id) => {
    let bodyFormData = new FormData();
    let token = localStorage.getItem('token');
    console.log("THIS IS THE EMP _ID : " +id);
    return new Promise( function(resolve) {
       axios({
            method: 'get',
            url: api_url() +'/attendance/employee/+/+/' + id, //Default Config
            headers: {'Content-Type': 'application/json', 'Authorization': token }
        })
        .then((response) => {
            //handle success
            console.log(response);
            if(response.data.status){ // if valid
                return resolve(response.data.data);
            }else if(!response.data.status){ // if invalid   
                console.log("Error Encountered on Fetching Data");
                return resolve(response);
            }
        })
        .catch(function(response) {
            //handle error
            console.log(response);
        });
    });
}

export const getEmployeeTable = () => {
    let bodyFormData = new FormData();
    let token = localStorage.getItem('token');

    return new Promise( function(resolve) {
        axios({
            method: 'get',
            url: api_url() +'/employees', //Default Config
            headers: {'Content-Type': 'application/json', 'Authorization': token }
        })
        .then((response) => {
            //handle success
            console.log(response);
            if(response.data.status){ // if valid
                return resolve(response);
            }else if(!response.data.status){ // if invalid   
                console.log("Error Time Card");
                return resolve(response);
            }
        })
        .catch(function(response) {
            //handle error
            console.log(response);
        });
    });
}

export const getTimeLog = () => {
    let bodyFormData = new FormData();
    let token = localStorage.getItem('token');
    
    return new Promise( function(resolve) {
        axios({
            method: 'get',
            url: api_url() +'/attendance/employee/+/+/', //Default Config
            data: bodyFormData,
            headers: {'Content-Type': 'application/json', 'Authorization': token }
        })
        .then((response) => {
            //handle success
            if(response.data.status){ // if valid
                return resolve(response.data.data);
            }else if(!response.data.status){ // if invalid   
                console.log("Error Time Card");
            }
        })
        .catch(function(response) {
            //handle error
            console.log(response);
        });
    });
}

export const sendLog = (tag) => {
    let bodyFormData = new FormData();
    let token = localStorage.getItem('token');
    bodyFormData.set('tag', tag);
    console.log("THIS IS THE TAG: "+tag);
    
    return new Promise( function(resolve) {
        axios({
            method: 'post',
            url: api_url() +'/attendance/employee',
            data: bodyFormData,
            headers: {'Content-Type': 'application/json', 'Authorization': token }
        })
        .then((response) => {
            //handle success
            console.log(response);
            if(response.data.status){ // if valid
                console.log("Sending Log...");
                return resolve(response.data);
            }else if(!response.data.status){ // if invalid   
                return resolve(response.data);
            }
        })
        .catch(function(response) {
            //handle error
            console.log(resolve(response));
        });
    });
}