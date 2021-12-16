
import React, {useEffect} from 'react';
import { ImageBackground, View, Text, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase/app';
import { Button } from "react-native-paper";
import { getCommandPoints } from '../components/PointsAPI';

const Tab = createBottomTabNavigator();

const puppyUri = { uri: 'https://cdn.pixabay.com/photo/2016/02/18/18/37/puppy-1207816_1280.jpg' };
const trainingUri = { uri: 'https://cdn.pixabay.com/photo/2018/04/10/15/58/outdoors-3307889_1280.jpg' };
const rescueUri = { uri: 'https://cdn.pixabay.com/photo/2018/09/23/11/04/dog-3697190_1280.jpg' };
const logo = { uri: 'https://i.ibb.co/Xj7db5g/Doggogo-logo.png' };

export default function HomeScreen({ navigation }) {

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            navigation.navigate('SignInScreen');
        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            })
    }

    const getPoints = async () => {
        const sitPoints = await getCommandPoints('sit');
        const comePoints = await getCommandPoints('come');
        const leavePoints = await getCommandPoints('leave');
    }

    useEffect(() => {
        getPoints();
       
    }, []);


    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
            <View style={{ marginBottom: 30 }}>
                <ImageBackground source={logo} resizeMode="cover" style={{ justifyContent: "center", height: 100, width: 360, backgroundColor: 'white' }}>
                </ImageBackground>
            </View>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView>
                    <View style={{ marginBottom: 10 }}>
                        <ImageBackground source={puppyUri} resizeMode="cover" style={styles.image}>
                            <Text style={styles.commandText}> Pentu </Text>
                        </ImageBackground>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ImageBackground source={trainingUri} resizeMode="cover" style={styles.image}>
                            <Button style={{ borderColor: 'black' }}
                                onPress={() => navigation.navigate('Basic')}>
                                <Text style={styles.commandText}>
                                    Perustaidot </Text>
                            </Button>
                        </ImageBackground>
                    </View>
                    <View style={{ marginBottom: 40 }}>
                        <ImageBackground source={rescueUri} resizeMode="cover" style={styles.image}>
                            <Text style={styles.commandText}> Rescue</Text>
                        </ImageBackground>
                    </View>
                    <Button icon="logout" labelStyle={{ fontSize: 44 }}
                        onPress={() => signOut()}>
                    </Button>
                    <View style={{}}>
                        <Text style={{ fontSize: 15, paddingBottom: 120, paddingLeft: 90 }}> Kirjaudu ulos </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        marginBottom: 40
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 50,
        paddingRight: '48%',

    },
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
});

