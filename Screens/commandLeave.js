import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, AppRegistry, ScrollView, SafeAreaView } from 'react-native';
import * as firebase from 'firebase';
import { Button } from "react-native-paper";
import { Button as IosButton} from 'react-native-ios-kit';
import { getLeavePoints } from '../components/PointsAPI';

AppRegistry.registerComponent('IosFonts', () => IosFonts);
const leaveUri = {uri: 'https://cdn.pixabay.com/photo/2017/10/30/08/12/dog-2901704_1280.jpg'}; 

export default function commandLeave({ navigation }) {
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    const [points, setPoints] = useState(0);


    useEffect(() => {
        getPoints();
        return () => {
            setPoints('');
        };
    }, []);

    const getPoints = async () => {
        const pointsData = await getLeavePoints();
        if (pointsData != null) {
            setPoints(pointsData);
        }
    }

    const saveItem = () => {
        setPoints(points + 1)
        firebase.database().ref('users/dog/doginfo' + user.uid + '/leave').set(points + 1);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', padding: 10, backgroundColor: 'white' }}>
                <Button icon='chevron-left' style={{ paddingRight: 250 }}
                    onPress={() => navigation.navigate('Basic')}>
                    Takaisin
                </Button>
            </View>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image style={styles.image} source={leaveUri}/>
                    </View>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'cadetblue', marginBottom: 5, opacity: .7  }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', fontFamily: 'Thonburi', color: 'white'  }}>
                            JÄTÄ
                        </Text>
                    </View>
                    <View style={{ backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={styles.textBlue}>
                            Irti päästäminen on hyödyllinen käsky opetettavaksi sekä kanssa eläjien kuin myös koiran itsensä kannalta.
                            Mikäli koira tarttuu esimermiksi vieraaseen tai kadulla tuntemattomaan esineeseen,
                            on tärkeää saada koira päästämään irti käskystä.
                            </Text>
                    </View>
                    <Text style={styles.textHoney}>
                        1. Pyydä koiraasi istumaan edessäsi.
                    </Text>
                    <Text style={styles.textWhite}>
                        2. Näytä koiralle, että kädessäsi on herkkuja ja sulje nyrkkisi, jos koira yrittää ottaa niitä.
                        Jatka tätä ääneti niin kauan kun koira yrittää saada herkut kädestäsi. Kun koira jättää herkut
                        huomiotta ja siirtää katseensa sinuun, klikkaa ja palkitse koira herkuilla, jotka ovat toisessa
                        kädessäsi.
                    </Text>
                    <Text style={styles.textHoney}>
                        3. Kun olet toistanut kohdat 1 ja 2 useamman kerran, vaikeuta tehtävää pitämällä kätesi pidempään 
                        auki herkkujen ollessa kädelläsi. Klikkaa ja palkitse herkkujen jäädessä huomiotta ja katsekontaktin
                        pysyessä sinussa.
                    </Text>
                    <Text style={styles.textWhite2}>
                        4. Kun koirasi on jättänyt herkut rauhaan 9/10 kerrasta kätesi ollessa auki, anna koiralle 
                        käsky "Jätä" ja palkitse koirasi toisen käden herkuilla. Näin käydessä voit lisätä itsellesi 
                        onnistuneen "Jätä" pisteen + napista.
                    </Text>
                    
                </ScrollView>
                <View style={{flex: 1, position: 'absolute', bottom: 0, alignItems:'center', justifyContent: 'flex-start', marginBottom: 10 }}>
                    <View style={styles.footerButton}>
                    <Button style={{marginTop: -10, paddingRight: 10}}
                        onPress={() => saveItem()}> <Text style={{fontSize: 45}}> + </Text>
                        </Button>
                    </View>    
                    <View style={styles.footer}>
                        <Text style={{fontSize: 20}}> Pisteitä: {points} </Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        marginBottom: 40
    },
    textBlue: {
        backgroundColor: 'cadetblue', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        padding: 40, 
        color: 'white', 
        fontFamily: 'Arial-BoldMT', 
        fontSize: 15, 
        marginBottom: 10
    },
    image: {
        flex: 1, 
        width: 300, 
        height: 300, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    textHoney: {
        backgroundColor: 'linen', 
        marginBottom: 90, 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        padding: 40
    }, 
    textWhite: {
        backgroundColor: 'white', 
        marginBottom: 30, 
        marginTop: -50,
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        padding: 40
    }, 
    textWhite2: {
        backgroundColor: 'white', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        padding: 30, 
        marginBottom: 100,
        marginTop: -35
    }, 
    footer: {
        backgroundColor: 'lightblue', 
        paddingBottom: 30, 
        paddingTop: 20, 
        paddingLeft: 135, 
        paddingRight: 135, 
    },
    footerButton: {
        backgroundColor: 'lightblue', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        height: 90, 
        width: 90, 
        borderRadius: 90, 
        position: 'relative', 
        marginBottom: -45,

    }

});
