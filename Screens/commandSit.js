import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, AppRegistry, ScrollView, SafeAreaView } from 'react-native';
import * as firebase from 'firebase';
import { Button } from "react-native-paper";
import { getCommandPoints } from '../components/PointsAPI';
import { Button as IosButton} from 'react-native-ios-kit';
import { Icon } from 'react-native-ios-kit';


AppRegistry.registerComponent('IosFonts', () => IosFonts);
const sitUri = {uri: 'https://cdn.pixabay.com/photo/2017/08/18/16/13/dog-2655464_1280.jpg'}; 

export default function commandSit({ navigation }) {
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
        const pointsData = await getCommandPoints('sit');
        if (pointsData != null) {
            setPoints(pointsData);
        }
    }

    const saveItem = () => {
        setPoints(points + 1);
        firebase.database().ref('users/dog/doginfo' + user.uid + '/sit').set(points + 1);
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
                    <View style={styles.title}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', fontFamily: 'Thonburi', color: 'white' }}>
                            ISTU
                        </Text>
                    </View>
                    <View style={{ backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={styles.textBlue}>
                            Istuminen on useimmiten ensimäinen käsky, jonka omistajat koiralleen opettavat.
                            Tämä on erittäin hyvä peruskäsky, sillä se helpottaa monen muun haastavamman käskyn oppimista.</Text>
                    </View>
                    <Text style={styles.textHoney}>
                        1. Aloita pitämällä herkkua koirasi kuonon lähellä.
                    </Text>
                    <Text style={styles.textWhite}>
                        2. Siirrä herkkua taaemmas niin, että koirasi pää seuraa. Kun pää nousee, koiran takapuoli laskee.
                        Kun takapuoli on maassa, paina klikkeriä ja palkitse koira herkulla.
                    </Text>
                    <Text style={styles.textHoney}>
                        3. Kun koira on istunut onnistuneesti 9/10 kerrasta, anna verbaalinen käsky "Istu" juuri ennen kuin koiran takapuoli
                        osuu maahan. Klikkaa ja palkitse koira, kun tämä istuu kunnolla. Tämän jälkeen saat lisätä itsellesi + napista
                        onnistuneen suorituskerran.
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
    title: {
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        backgroundColor: 'cadetblue', 
        marginBottom: 5, 
        opacity: .7
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

