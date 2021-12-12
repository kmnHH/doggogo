import * as firebase from 'firebase';
import { useState } from 'react';



function getPoints(dogRef) {
    const [y, setY] = useState(0);
    dogRef.on('value', (snapshot) => {
        var data = snapshot.val();
        setY(data);
    });
    var result = y;
    return result;

}

function checkRef(command) {
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    const dogRef = firebase.database().ref('users/dog/doginfo' + user.uid + command);

    let fetchedData = getPoints(dogRef);
    console.log('tas fetched ' + fetchedData);

    return fetchedData;
}

export const getSitPoints = async () => {
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    var x = 0;

    const dogRef = firebase.database().ref('users/dog/doginfo' + user.uid + '/sit');
    dogRef.on('value', (snapshot) => {
        var data = snapshot.val();
        x = data;
    });
    return x;
}

export const getComePoints = async () => {
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    var x = 0;

    const dogRef = firebase.database().ref('users/dog/doginfo' + user.uid + '/come');
    dogRef.on('value', (snapshot) => {
        var data = snapshot.val();
        x = data;
    });
    return x;
}

export const getLeavePoints = async () => {
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    var x = 0;

    const dogRef = firebase.database().ref('users/dog/doginfo' + user.uid + '/leave');
    dogRef.on('value', (snapshot) => {
        var data = snapshot.val();
        x = data;
    });
    return x;
}