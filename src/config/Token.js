import axios from 'axios';
import { api_url } from "./Api";

export const decodeToken = (props) => {
    if(localStorage && localStorage.getItem('token') && localStorage !== undefined){
        console.log("HAS TOKEN!");            
        props.firstname = localStorage.getItem('firstname');
        props.middlename = localStorage.getItem('middlename');
        props.lastname = localStorage.getItem('lastname');
        props.email = localStorage.getItem('email');
        props.postitle = localStorage.getItem('position');
        return true;
    }else{
        console.log("NO TOKEN");
        return false;
    }
}

export const verifyToken = (props) => { //Always First
    let bodyFormData = new FormData();
    let token = localStorage.getItem('token');
    return new Promise( function(resolve) {
        axios({
            method: 'post',
            url: api_url() + '/authenticate/token',
            data: bodyFormData,
            //config: { headers: {'Content-Type': 'multipart/form-data' }}
            //config: { headers: {'Content-Type': 'application/json', 'Authorization': token}}
            headers: {
                "Content-Type" : "application/json", 'Authorization': token
            }
        })
        .then((response) => {
            //handle success
            console.log(response);
            if(response.data.status){ // if valid
                localStorage.setItem('firstname', response.data.message.firstname);
                localStorage.setItem('middlename', response.data.message.middlename);
                localStorage.setItem('lastname', response.data.message.lastname);
                localStorage.setItem('email', response.data.message.email);
                localStorage.setItem('position', response.data.message.position);
                return resolve(response.data);
            }else if(!response.data.status){ // if invalid   
                console.log("Error Time Card");
                return resolve(response.data);
            }
        })
        .catch(function(response) {
            //handle error
            console.log(response);
        });
    });
}

