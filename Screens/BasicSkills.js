import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, Alert, AppRegistry } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from "react-native-paper";
import * as firebase from 'firebase';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import { getCommandPoints } from '../components/PointsAPI';


AppRegistry.registerComponent('IosFonts', () => IosFonts);

const sitUri = { uri: 'https://cdn.pixabay.com/photo/2016/11/22/23/13/dog-1851107_1280.jpg' };
const comeUri = { uri: 'https://cdn.pixabay.com/photo/2015/03/28/23/31/border-collie-696673_1280.jpg' };
const leaveUri = { uri: 'https://cdn.pixabay.com/photo/2017/03/08/01/19/chihuahua-2125691_1280.jpg' };

export default function BasicSkills({ navigation }) {
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    //const [points, setPoints] = useState(0); 
    const [group, setGroup] = useState(0);
    const [sit, setSit] = useState(0);
    const [come, setCome] = useState(0);
    const [leave, setLeave] = useState(0);
    const [alert, setAlert] = useState(false);


    useEffect(() => {
        getPoints();
        //cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        return () => {
            //setPoints(''); 
            setGroup('');
        };
    }, []);


    const getPoints = async () => {
        const sitPoints = await getCommandPoints('sit');
        const comePoints = await getCommandPoints('come');
        const leavePoints = await getCommandPoints('leave');

        //select which view case to use
        if (sitPoints < 10 || sitPoints == null) {
            setGroup(1);
            setAlert(true);
            setSit(sitPoints);
        } else if (sitPoints >= 10 && comePoints < 10) {
            setGroup(2);
            setAlert(true);
            setSit(sitPoints);
        } else if (sitPoints >= 10 && comePoints >= 10 && leavePoints < 10) {
            setGroup(3);
            setAlert(true);
            setSit(sitPoints);
            setCome(comePoints);
        }
        else if (leavePoints >= 10) {
            setGroup(4);
            setAlert(true);
            setSit(sitPoints);
            setCome(comePoints);
            setLeave(leavePoints);
        }
    }

    switch (group) {
        case 1:
            return (
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
                    <View style={{ width: '100%', padding: 10, backgroundColor: 'white' }}>
                        <Button icon='chevron-left' style={{ paddingRight: 250 }}
                            onPress={() => navigation.navigate('Home')}>
                            Takaisin
                        </Button>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ImageBackground source={sitUri} resizeMode="cover" style={styles.image}>
                            <Button style={{ borderColor: 'black' }}
                                onPress={() => navigation.navigate('Sit')}>
                                <Text style={styles.commandText}>
                                    Istu </Text>
                            </Button>
                        </ImageBackground>
                    </View>
                    <View style={styles.container}>
                        <SCLAlert
                            theme="info"
                            show={alert}
                            title="Tervetuloa!"
                            subtitle="Harjoittele Istu-k??sky??"
                            >
                            { !sit ?   
                            <Text style={{ paddingLeft: '30%', fontWeight: 'bold', marginBottom: 20 }}> Istu-pisteesi: Ei viel?? pisteit??!</Text>
                            : <Text style={{ paddingLeft: '30%', fontWeight: 'bold', marginBottom: 20 }}> Istu-pisteesi: {sit}</Text>
                            }
                            <Text style={{ paddingLeft: '10%', paddingRight: '10%' }}> Valitse osio Istu ja tee toistot niin
                                monta kertaa ett?? saat kerrytetty?? itsellesi v??hint????n 10 Istu-pistett??</Text>
                            <SCLAlertButton theme="info" onPress={() => setAlert(false)}>Selv??</SCLAlertButton>
                        </SCLAlert>
                    </View>
                </View>
            )
        case 2:
            return (

                <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'linen', flex: 1 }}>
                    <View style={{ width: '100%', padding: 10, paddingTop: 20, backgroundColor: 'white' }}>
                        <Button icon='chevron-left' style={{ paddingRight: 250 }}
                            onPress={() => navigation.navigate('Home')}>
                            Takaisin
                        </Button>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ImageBackground source={sitUri} resizeMode="cover" style={styles.image}>
                            <Button style={{ borderColor: 'black' }}
                                onPress={() => navigation.navigate('Sit')}>
                                <Text style={styles.commandText}>
                                    Istu </Text>
                            </Button>
                        </ImageBackground>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ImageBackground source={comeUri} resizeMode="cover" style={styles.image}>
                            <Button style={{ borderColor: 'black' }}
                                onPress={() => navigation.navigate('Come')}>
                                <Text style={styles.commandText}>
                                    T??nne </Text>
                            </Button>
                        </ImageBackground>
                    </View>
                    <View style={styles.container}>
                        <SCLAlert
                            theme="success"
                            show={alert}
                            title="Onnittelut!"
                            subtitle="Sait tarvittavan m????r??n Istu-pisteit??!"
                            useNativeDriver={true}>
                            <Text style={styles.points}> Istu-pisteesi: {sit}</Text>
                            <Text style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                                Harjoittele seuraavaksi luokse tuloa kerrytt??m??ll?? T??nne-pisteit??si osiossa T??nne</Text>
                            <SCLAlertButton theme="success" onPress={() => setAlert(false)}>Selv??</SCLAlertButton>
                        </SCLAlert>
                    </View>
                </View>
            )
        case 3:
            return (
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
                    <View style={{ width: '100%', padding: 10, backgroundColor: 'white' }}>
                        <Button icon='chevron-left' style={{ paddingRight: 250 }}
                            onPress={() => navigation.navigate('Home')}>
                            Takaisin
                        </Button>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ImageBackground source={sitUri} resizeMode="cover" style={styles.image}>
                            <Button style={{ borderColor: 'black' }}
                                onPress={() => navigation.navigate('Sit')}>
                                <Text style={styles.commandText}>
                                    Istu </Text>
                            </Button>
                        </ImageBackground>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ImageBackground source={comeUri} resizeMode="cover" style={styles.image}>
                            <Button style={{ borderColor: 'black' }}
                                onPress={() => navigation.navigate('Come')}>
                                <Text style={styles.commandText}>
                                    T??nne </Text>
                            </Button>
                        </ImageBackground>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ImageBackground source={leaveUri} resizeMode="cover" style={styles.image}>
                            <Button style={{ borderColor: 'black' }}
                                onPress={() => navigation.navigate('Leave')}>
                                <Text style={styles.commandText}>
                                    J??t?? </Text>
                            </Button>
                        </ImageBackground>
                    </View>
                    <View style={styles.container}>
                        <SCLAlert
                            theme="success"
                            show={alert}
                            title="Onnittelut!"
                            subtitle="Sait tarvittavan m????r??n T??nne-pisteit??!"
                            useNativeDriver={true}>
                            <Text style={styles.points}> Istu-pisteesi: {sit}</Text>
                            <Text style={styles.points}> T??nne-pisteesi: {come}</Text>
                            <Text style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                                Harjoittele seuraavaksi irti p????st??mist?? kerrytt??m??ll?? J??t??-pisteit??si osiossa J??t??</Text>
                            <SCLAlertButton theme="success" onPress={() => setAlert(false)}>Selv??</SCLAlertButton>
                        </SCLAlert>
                    </View>
                </View>
            )
        case 4:
            return (
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
                    <View style={{ width: '100%', padding: 10, backgroundColor: 'white' }}>
                        <Button icon='chevron-left' style={{ paddingRight: 250 }}
                            onPress={() => navigation.navigate('Home')}>
                            Takaisin
                        </Button>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ImageBackground source={sitUri} resizeMode="cover" style={styles.image}>
                            <Button style={{ borderColor: 'black' }}
                                onPress={() => navigation.navigate('Sit')}>
                                <Text style={styles.commandText}>
                                    Istu </Text>
                            </Button>
                        </ImageBackground>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ImageBackground source={comeUri} resizeMode="cover" style={styles.image}>
                            <Button style={{ borderColor: 'black' }}
                                onPress={() => navigation.navigate('Come')}>
                                <Text style={styles.commandText}>
                                    T??nne </Text>
                            </Button>
                        </ImageBackground>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ImageBackground source={leaveUri} resizeMode="cover" style={styles.image}>
                            <Button 
                                onPress={() => navigation.navigate('Leave')}>
                                <Text style={styles.commandText}>
                                    J??t?? </Text>
                            </Button>
                        </ImageBackground>
                    </View>
                    <View style={styles.container}>
                        <SCLAlert
                            theme="success"
                            show={alert}
                            title="Onnittelut!"
                            subtitle="Sait tarvittavan m????r??n pisteit?? kaikkiin harjoituksiin!"
                            >
                            <Text style={styles.points}> Istu-pisteesi: {sit}</Text>
                            <Text style={styles.points}> T??nne-pisteesi: {come}</Text>
                            <Text style={styles.points}> J??t??-pisteesi: {leave}</Text>
                            <Text style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                                Jatka harjoittelua aktiivisesti koirasi kanssa, etteiv??t taidot p????se ruostumaan!</Text>
                            <SCLAlertButton theme="success" onPress={() => setAlert(false)}>Selv??</SCLAlertButton>
                        </SCLAlert>
                    </View>
                </View>
            )
        default:
            return (
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'linen', flex: 1 }}>
                    <View style={{ width: '100%', padding: 10, backgroundColor: 'white' }}>
                        <Button icon='chevron-left' style={{ paddingRight: 250 }}
                            onPress={() => navigation.navigate('Home')}>
                            Takaisin
                        </Button>
                    </View>
                </View>

            )
    }
}

const styles = StyleSheet.create({
    image: {
        justifyContent: "center",
        height: 140,
        width: 300,
        opacity: 0.7
    },
    commandText: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'Thonburi',
        color: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    points: {
        paddingLeft: '30%', 
        fontWeight: 'bold',
        marginBottom: 20
    }
});

/*onScroll={Animated.event(
                                { useNativeDriver: true } // <-- Add this
                              )}*/