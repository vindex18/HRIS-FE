import axios from 'axios';


export const api_url = () => {
    return 'http://localhost/hris-api/public';
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

export const validatecredentials = (props) => {
    let bodyFormData = new FormData();
    // return validatecredentials(this.state);
    bodyFormData.set('email', 'neil@invento.io');
    bodyFormData.set('password', 'qwerty');
    console.log(bodyFormData);
    // bodyFormData.set('email', this.state.email );
    // bodyFormData.set('password', this.state.password );
    axios({
        method: 'post',
        url: api_url() +'/authorization/validatecredentials',
        data: bodyFormData,
        // config: { headers: {'Content-Type': 'multipart/form-data' }}
        config: { headers: {'Content-Type': 'application/json' }}
    })
    .then((response) => {
        //handle success
        console.log(response);
        console.log(response.data.tk);
        localStorage.setItem('token', response.data.tk );
        
        if(response.data.status){ // if valid
            console.log ("OKKKKK");
            props.isLoggedIn = true;
            
        }else if(!response.data.status){ // if invalid
            console.log ("NOT OKKKKK");
            props.isLoggedIn = false;
        }
    })
    .catch(function (response) {
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
            //console.log(response);
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