import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, AppRegistry, ScrollView, SafeAreaView } from 'react-native';
import * as firebase from 'firebase';
import { Button } from "react-native-paper";
import { Button as IosButton} from 'react-native-ios-kit';
import { getCommandPoints } from '../components/PointsAPI';

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
        const pointsData = await getCommandPoints('leave');
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
                            J??T??
                        </Text>
                    </View>
                    <View style={{ backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={styles.textBlue}>
                            Irti p????st??minen on hy??dyllinen k??sky opetettavaksi sek?? kanssa el??jien kuin my??s koiran itsens?? kannalta.
                            Mik??li koira tarttuu esimermiksi vieraaseen tai kadulla tuntemattomaan esineeseen,
                            on t??rke???? saada koira p????st??m????n irti k??skyst??.
                            </Text>
                    </View>
                    <Text style={styles.textHoney}>
                        1. Pyyd?? koiraasi istumaan edess??si.
                    </Text>
                    <Text style={styles.textWhite}>
                        2. N??yt?? koiralle, ett?? k??dess??si on herkkuja ja sulje nyrkkisi, jos koira yritt???? ottaa niit??.
                        Jatka t??t?? ????neti niin kauan kun koira yritt???? saada herkut k??dest??si. Kun koira j??tt???? herkut
                        huomiotta ja siirt???? katseensa sinuun, klikkaa ja palkitse koira herkuilla, jotka ovat toisessa
                        k??dess??si.
                    </Text>
                    <Text style={styles.textHoney}>
                        3. Kun olet toistanut kohdat 1 ja 2 useamman kerran, vaikeuta teht??v???? pit??m??ll?? k??tesi pidemp????n 
                        auki herkkujen ollessa k??dell??si. Klikkaa ja palkitse herkkujen j????dess?? huomiotta ja katsekontaktin
                        pysyess?? sinussa.
                    </Text>
                    <Text style={styles.textWhite2}>
                        4. Kun koirasi on j??tt??nyt herkut rauhaan 9/10 kerrasta k??tesi ollessa auki, anna koiralle 
                        k??sky "J??t??" ja palkitse koirasi toisen k??den herkuilla. N??in k??ydess?? voit lis??t?? itsellesi 
                        onnistuneen "J??t??" pisteen + napista.
                    </Text>
                    
                </ScrollView>
                <View style={{flex: 1, position: 'absolute', bottom: 0, alignItems:'center', justifyContent: 'flex-start', marginBottom: 10 }}>
                    <View style={styles.footerButton}>
                    <Button style={{marginTop: -10, paddingRight: 10}}
                        onPress={() => saveItem()}> <Text style={{fontSize: 45}}> + </Text>
                        </Button>
                    </View>    
                    <View style={styles.footer}>
                        <Text style={{fontSize: 20}}> Pisteit??: {points} </Text>
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
