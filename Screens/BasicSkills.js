import React, {useEffect, useState} from 'react';
import{  ImageBackground, View, Text, StyleSheet, Alert, AppRegistry } from'react-native';   
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';    
import { Ionicons} from '@expo/vector-icons';   
import DropDownPicker from 'react-native-dropdown-picker'; 
import { Button } from "react-native-paper";
import * as firebase from 'firebase';
import { getSitPoints } from '../components/PointsAPI';
import { getComePoints } from '../components/PointsAPI';
import { getLeavePoints } from '../components/PointsAPI';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import  {useDataFetch }  from '../components/UseDataFetch';


const Tab = createBottomTabNavigator(); 

AppRegistry.registerComponent('IosFonts', () => IosFonts);

const sitUri = {uri: 'https://cdn.pixabay.com/photo/2016/11/22/23/13/dog-1851107_1280.jpg'}; 
const comeUri = {uri: 'https://cdn.pixabay.com/photo/2015/03/28/23/31/border-collie-696673_1280.jpg'};
const leaveUri = {uri: 'https://cdn.pixabay.com/photo/2017/03/08/01/19/chihuahua-2125691_1280.jpg'};

export default function BasicSkills( {navigation} ) {
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    //const [points, setPoints] = useState(0); 
    const [group, setGroup] = useState(0);
    const [sit, setSit] = useState('');
    const [come, setCome] = useState('');
    const [leave, setLeave] = useState('');
    const [alert, setAlert] = useState(false);

    function mi() {
    const sitPoints = useDataFetch('sit');
    console.log('kissapisteet ' + sitPoints);
    }

    useEffect(() => {
        getPoints();
        //cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        return () => {
            //setPoints(''); 
            setGroup('');
        };
      }, []);

    function checkUndefined() {
        console.log('menin funkkariin');
        const x = getComePoints();
        return x;
    }  

   const getPoints = async () => {
        const sitPoints = await getSitPoints();
        /*if(!sitPoints) {
          const sitP = checkUndefined();
            console.log('iffissa pointsit: ' + sitP);
        }*/
        const comePoints = await getComePoints();
        /*if(!comePoints) {
            const sitP = checkUndefined();
              console.log('iffissa pointsit: ' + sitP);
          }*/
        const leavePoints = await getLeavePoints(); 

        console.log('tas sit ' + sitPoints);
        console.log('tas come ' + comePoints);
        if(sitPoints < 10 || sitPoints == null) {
            setGroup(1);
            setAlert(true);
            setSit(sitPoints);
        } else if (sitPoints >= 10 && comePoints < 10) {
            setGroup(2);
            setAlert(true);
            setSit(sitPoints);
        } else if (sitPoints >= 10 && comePoints >= 10 && leavePoints < 10){
            setGroup(3);  
            setAlert(true);
            setSit(sitPoints);
            setCome(comePoints);
        } 
        else if (sitPoints >= 10 && comePoints >= 10 && leavePoints >= 10){
            setGroup(4);  
            setAlert(true);
            setSit(sitPoints);
            setCome(comePoints);
            setLeave(leavePoints);
        } 
    } 



      switch(group) {  
        case 1: 
        return (
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
                <View style={{width: '100%', padding: 10, backgroundColor: 'white'}}>
                    <Button  icon='chevron-left' style={{paddingRight: 250}}
                        onPress={() => navigation.navigate('Home')}>
                        Takaisin
                    </Button>    
                </View>
                <View style={{marginBottom: 10}}>
                  <ImageBackground source={sitUri} resizeMode="cover" style={styles.image}>
                        <Button style={{borderColor: 'black'}}
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
                        subtitle="Harjoittele Istu-käskyä"
                        useNativeDriver= {true}>
                            <Text style={{paddingLeft: '30%', fontWeight: 'bold', marginBottom: 20}}> Istu-pisteesi: {sit}</Text> 
                            <Text style={{paddingLeft: '10%', paddingRight: '10%'}}> Valitse osio Istu ja tee toistot niin
                             monta kertaa että saat kerrytettyä itsellesi vähintään 10 Istu-pistettä</Text>
                        <SCLAlertButton theme="info" onPress={() => setAlert(false)}>Selvä</SCLAlertButton>
                    </SCLAlert>
                </View>
            </View>
        ) 
        case 2:
        return (
            
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
                <View style={{width: '100%', padding: 10, paddingTop: 20, backgroundColor: 'white'}}>
                    <Button  icon='chevron-left' style={{paddingRight: 250}}
                        onPress={() => navigation.navigate('Home')}>
                        Takaisin
                    </Button>    
                </View>
                <View style={{marginBottom: 10}}>
                  <ImageBackground source={sitUri} resizeMode="cover" style={styles.image}>
                        <Button style={{borderColor: 'black'}}
                            onPress={() => navigation.navigate('Sit')}>
                            <Text style={styles.commandText}>
                                 Istu </Text>
                        </Button>  
                   </ImageBackground>    
                </View>    
                <View style={{marginBottom: 10}}>
                  <ImageBackground source={comeUri} resizeMode="cover" style={styles.image}>
                        <Button style={{borderColor: 'black'}}
                            onPress={() => navigation.navigate('Come')}>
                           <Text style={styles.commandText}>
                                 Tänne </Text>
                        </Button>  
                   </ImageBackground>    
                </View>    
                <View style={styles.container}>
                    <SCLAlert
                        theme="success"
                        show={alert}
                        title="Onnittelut!"
                        subtitle="Sait tarvittavan määrän Istu-pisteitä!"
                        useNativeDriver= {true}>
                            <Text style={{paddingLeft: '30%', fontWeight: 'bold', marginBottom: 20}}> Istu-pisteesi: {sit}</Text> 
                            <Text style={{paddingLeft: '10%', paddingRight: '10%'}}> 
                            Harjoittele seuraavaksi luokse tuloa kerryttämällä Tänne-pisteitäsi osiossa Tänne</Text>
                        <SCLAlertButton theme="success" onPress={() => setAlert(false)}>Selvä</SCLAlertButton>
                    </SCLAlert>
                </View>
            </View>
        )    
        case 3:
        return (
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
                <View style={{width: '100%', padding: 10, backgroundColor: 'white'}}>
                    <Button  icon='chevron-left' style={{paddingRight: 250}}
                        onPress={() => navigation.navigate('Home')}>
                        Takaisin
                    </Button>    
                </View>
                <View style={{marginBottom: 10}}>
                  <ImageBackground source={sitUri} resizeMode="cover" style={styles.image}>
                        <Button style={{borderColor: 'black'}}
                            onPress={() => navigation.navigate('Sit')}>
                            <Text style={styles.commandText}>
                                 Istu </Text>
                        </Button>  
                   </ImageBackground>    
                </View>    
                <View style={{marginBottom: 10}}>
                  <ImageBackground source={comeUri} resizeMode="cover" style={styles.image}>
                        <Button style={{borderColor: 'black'}}
                            onPress={() => navigation.navigate('Come')}>
                           <Text style={styles.commandText}>
                                 Tänne </Text>
                        </Button>  
                   </ImageBackground>    
                </View>    
                <View style={{marginBottom: 10}}>
                  <ImageBackground source={leaveUri} resizeMode="cover" style={styles.image}>
                        <Button style={{borderColor: 'black'}}
                            onPress={() => navigation.navigate('Leave')}>
                            <Text style={styles.commandText}>
                                 Jätä </Text>
                        </Button>  
                   </ImageBackground>    
                </View>   
                <View style={styles.container}>
                    <SCLAlert
                        theme="success"
                        show={alert}
                        title="Onnittelut!"
                        subtitle="Sait tarvittavan määrän Tänne-pisteitä!"
                        useNativeDriver= {true}>
                            <Text style={{paddingLeft: '30%', fontWeight: 'bold', marginBottom: 20}}> Istu-pisteesi: {sit}</Text> 
                            <Text style={{paddingLeft: '30%', fontWeight: 'bold', marginBottom: 20}}> Tänne-pisteesi: {come}</Text> 
                            <Text style={{paddingLeft: '10%', paddingRight: '10%'}}> 
                            Harjoittele seuraavaksi irti päästämistä kerryttämällä Jätä-pisteitäsi osiossa Jätä</Text>
                        <SCLAlertButton theme="success" onPress={() => setAlert(false)}>Selvä</SCLAlertButton>
                    </SCLAlert>
                </View> 
            </View>
        )
        case 4:
        return (
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
                <View style={{width: '100%', padding: 10, backgroundColor: 'white'}}>
                    <Button  icon='chevron-left' style={{paddingRight: 250}}
                        onPress={() => navigation.navigate('Home')}>
                        Takaisin
                    </Button>    
                </View>
                <View style={{marginBottom: 10}}>
                  <ImageBackground source={sitUri} resizeMode="cover" style={styles.image}>
                        <Button style={{borderColor: 'black'}}
                            onPress={() => navigation.navigate('Sit')}>
                            <Text style={styles.commandText}>
                                 Istu </Text>
                        </Button>  
                   </ImageBackground>    
                </View>    
                <View style={{marginBottom: 10}}>
                  <ImageBackground source={comeUri} resizeMode="cover" style={styles.image}>
                        <Button style={{borderColor: 'black'}}
                            onPress={() => navigation.navigate('Come')}>
                           <Text style={styles.commandText}>
                                 Tänne </Text>
                        </Button>  
                   </ImageBackground>    
                </View>    
                <View style={{marginBottom: 10}}>
                  <ImageBackground source={leaveUri} resizeMode="cover" style={styles.image}>
                        <Button style={{borderColor: 'black'}}
                            onPress={() => navigation.navigate('Leave')}>
                            <Text style={styles.commandText}>
                                 Jätä </Text>
                        </Button>  
                   </ImageBackground>    
                </View>   
                <View style={styles.container}>
                    <SCLAlert
                        theme="success"
                        show={alert}
                        title="Onnittelut!"
                        subtitle="Sait tarvittavan määrän pisteitä kaikkiin harjoituksiin!"
                        useNativeDriver= {true}>
                            <Text style={{paddingLeft: '30%', fontWeight: 'bold', marginBottom: 20}}> Istu-pisteesi: {sit}</Text> 
                            <Text style={{paddingLeft: '30%', fontWeight: 'bold', marginBottom: 20}}> Tänne-pisteesi: {come}</Text>  
                            <Text style={{paddingLeft: '30%', fontWeight: 'bold', marginBottom: 20}}> Jätä-pisteesi: {leave}</Text> 
                            <Text style={{paddingLeft: '10%', paddingRight: '10%'}}> 
                            Jatka harjoittelua aktiivisesti koirasi kanssa, etteivät taidot pääse ruostumaan!</Text>
                        <SCLAlertButton theme="success" onPress={() => setAlert(false)}>Selvä</SCLAlertButton>
                    </SCLAlert>
                </View> 
            </View>
        )                
        default:
            return (
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'pink', flex: 1 }}>
                    <View style={{width: '100%', padding: 10, backgroundColor: 'white'}}>
                    <Button  icon='chevron-left' style={{paddingRight: 250}}
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
      }
  });

  