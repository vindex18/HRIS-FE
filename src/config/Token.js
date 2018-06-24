import axios from 'axios';
import { api_url } from "./Api";


export const decodeToken = (props) => {
    if(localStorage && localStorage.getItem('token') && localStorage.getItem('firstname') && localStorage.getItem('middlename') && localStorage.getItem('lastname') && localStorage.getItem('position')){
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

export const verifyToken = () => { //Always First
    //return false;
    // if(localStorage && localStorage.getItem('token') && localStorage.getItem('token') !== undefined){
    //     return true;
    // }else{
    //     return false;
    // }
     if(localStorage && localStorage.getItem('token') && localStorage.getItem('token') !== undefined){
        console.log("VERIFY TOKEN: true");
        //return true;
        //     console.log("HAS TOKEN!");        
        let bodyFormData = new FormData(); 
        let token = localStorage.getItem('token');
        bodyFormData.set('authentication', token);
        console.log("SUBMITTING: " + token);

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
            console.log('THIS IS THE RESPONSE!');
            console.log(response);  
            if(response.data.status){
                console.log("XXXXTrue " );  
                localStorage.setItem('firstname', response.data.message.firstname);
                localStorage.setItem('middlename', response.data.message.middlename);
                localStorage.setItem('lastname', response.data.message.lastname);
                localStorage.setItem('email', response.data.message.email);
                localStorage.setItem('position', response.data.message.position);
                return resolve(true);
            }
            else{
                console.log("XXXXX FALSE");
                localStorage.clear();
                return resolve(false);
            }
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    });

     }else{
         console.log("NO TOKEN IN VERIFY TOKEN!");
         return false;
     }
}

