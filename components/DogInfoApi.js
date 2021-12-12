
import * as firebase from 'firebase';
import { useState } from 'react';


export default async function getDogInfo() {
    
    try {
        const auth = firebase.default.auth()
        const user = auth.currentUser;
        
        
        if(user) {
            var dog = firebase.database().ref('users/dog/doginfo' + user.uid + '/doginfo');
            dog.on('value', (snapshot) => {
                const data = snapshot.val();
                console.log('taa on data ' + data);
                return data;
            });
        } else {
            console.log("RESPONSE NOT OK Couldn't load restaurants: " + result.message)
          }
    } catch (error) {
      console.log("ERROR Couldn't load restaurants: " + error.message)
    }
           
};

/* function getDog() {
    firebase.database().ref('users/dog' ).on('value', snapshot => {
        const data = snapshot.val();
        const prods = Object.values(data);
        setItems(prods);
      });
}    */