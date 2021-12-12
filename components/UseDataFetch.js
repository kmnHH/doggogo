import { useEffect, useState } from 'react';
import * as firebase from 'firebase';

export const useDataFetch = ({ urls }) => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
        // Tähän firebase asetukset ja alustukset (create ref)

        const auth = firebase.default.auth()
        const user = auth.currentUser;


        const ref = firebase.database().ref('users/dog/doginfo' + user.uid + '/' + urls);
        let requests = null;
        ref.on('value', (snapshot) => {
             requests = snapshot.val();
        });

        (async () => {
            try {
                if(!requests) return;
                // Set CSRF token in the request headers
                console.log('kissa2 ' + requests);
                // Tähä firebasen datan käsittely ja asetus useStateen.
                const response = await Promise.all(requests);
                setData(response);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
 

    return { data, isLoading, error };
};

