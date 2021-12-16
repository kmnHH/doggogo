import * as firebase from 'firebase';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

/*export const getCommandPoints = ({navigation}) => {
    //const navigation = useNavigation(); 
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    const dogRef = firebase.database().ref('users/dog/doginfo' + user.uid + '/sit');
    dogRef.on('value', (snapshot) => {
        var data = snapshot.val();
        console.log('tassa taa data nyt viel ' + data)
        navigation.navigate('Basic', {data})
    });
    
}*/ 
export const getCommandPoints = async (command) => {
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    var x = 0;

    const dogRef = firebase.database().ref('users/dog/doginfo' + user.uid + '/' + command);
    dogRef.on('value', (snapshot) => {
        var data = snapshot.val();
        x = data;
    });
    return x;
}







