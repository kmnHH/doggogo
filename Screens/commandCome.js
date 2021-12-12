import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, AppRegistry, ScrollView, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as firebase from 'firebase';
import { Button } from "react-native-paper";
import { getComePoints } from '../components/PointsAPI';


const Tab = createBottomTabNavigator();
AppRegistry.registerComponent('IosFonts', () => IosFonts);
const sitUri = {uri: 'https://cdn.pixabay.com/photo/2019/12/11/19/55/dog-4689169_1280.jpg'}; 

export default function commandCome({ navigation }) {
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
        const pointsData = await getComePoints();
        if (pointsData != null) {
            setPoints(pointsData);
        }
    }

    const saveItem = () => {
        setPoints(points + 1)
        firebase.database().ref('users/dog/doginfo' + user.uid + '/come').set(points + 1);
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
                        <Image style={styles.image} source={sitUri}/>
                    </View>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'cadetblue', marginBottom: 5, opacity: .7  }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', fontFamily: 'Thonburi', color: 'white'  }}>
                            TÄNNE
                        </Text>
                    </View>
                    <View style={{ backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={styles.textBlue}>
                            Luokse tuleminen on tärkeimpiä käskyjä mitä koiralle voi opettaa. Käskyn avulla sinun tulisi saada 
                            koirasi huomio paikassa, jossa on tärkeää, että koirasi pysyy lähelläsi.</Text>
                    </View>
                    <Text style={styles.textHoney}>
                        1. Pyydä koiraasi istumaan edessäsi, ja ota muutama askel taakse päin.
                    </Text>
                    <Text style={styles.textWhite}>
                        2. Houkuttele koira luoksesi herkun avulla. Kun tämä on lähellä, klikkaa ja palkitse.
                    </Text>
                    <Text style={styles.textHoney}>
                        3. Kun olet toistanut kohdat 1 ja 2 muutaman kerran, anna "Tänne" käsky koirallesi aina, 
                        kun se on juuri lähdössä luoksesi. Klikkaa ja aplkitse koira heti sen saavuttua luoksesi.
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
        marginTop: -35,
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        padding: 30
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
        marginBottom: -45
    }

});
