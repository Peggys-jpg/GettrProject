import axios from 'axios';
const config = require('../config/config.js');
// import { messagesContext } from '../components/MessagesContext.js';
// import React, {useContext} from 'react';

//var stompClient = null;

const instance = axios.create({
    baseUrl: config.dev.url.API_BASE_URL
})

function getUserMessages(){
    console.log(JSON.parse(localStorage.getItem('user')).id);
    // const config = {
    //     method: 'get',
    //     url: 'http://localhost:8080/user/getUserMessages/'+(JSON.parse(localStorage.getItem('user')).id),
    //     //headers:{'Authorization': `Bearer ${localStorage.getItem('user').token}`}
    // }
    // const json = JSON.parse(await axios.get(config));
    let json = null;
    //console.log('http://localhost:8080/user/getUserMessages/'+(JSON.parse(localStorage.getItem('user')).id));
    axios.get('http://localhost:8080/user/getUserMessages/'+(JSON.parse(localStorage.getItem('user')).id))
    .then((response)=>{
        if(response.data.length>0){
            json = JSON.parse(response.data);
        }
    });
    if(json === null || Object.keys(json).length === 0) {return new Map();}
    else{
        let tempMap = new Map();
        for(let i = 0; i < json.length; i++) {
            tempMap.set(json[i].messagesMapId.username_to,[]);
            for(let j = 0; j < json[i].messages.length; j++){
                tempMap.get(json[i].messagesMapId.username_to).push(json[i].messages[j]);
            }
        }
        return tempMap;
    }
}

// const registerUser =()=>{
//     let Sock = new SockJS('http://localhost:8080/ws');
//     stompClient = over(Sock);
//     stompClient.connect({},onConnected,onError) // the {} can contain headers if need be
// }

//     const onConnected =()=>{
//         setUserData({...userData,"connected":true});
//         stompClient.subscribe('/chatroom/public',onPublicMessageRecieved);  // "subscribing"/listens to /public
//         stompClient.subscribe('/user/'+userData.username+'/private',onPrivateMessageRecieved);
//         userJoin();
//     }

//     const userJoin =()=>{
//         let chatMessage={
//             senderName:userData.username,
//             senderId:localStorage.get('user').id,
//             status:'JOIN'
//         };
//         stompClient.send('/app/message',{},JSON.stringify(chatMessage));
//     }

export{getUserMessages}