import React, {useState, useEffect} from'react';
import{  View, Text, Image, StyleSheet, Button, Alert, TextInput } from'react-native';   
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';  
import * as firebase from 'firebase' 
import DropDownPicker from 'react-native-dropdown-picker';  
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";
import {getDogInfo} from '../components/DogInfoApi'


export default function EditProfileScreen( {navigation }) {
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    const [dog, setDog] = useState({
        name: '', 
        birthdate: '', 
        breed: ''
    })
    
    useEffect(() => {
        getDoggis();
        return () => {
            setDog({}); // This worked for me
        };
      }, []);
    
      function getDoggis(){
        var dogRef = firebase.database().ref('users/dog/doginfo' + user.uid + '/doginfo');
        dogRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data != null) {
          setDog({...dog, birthdate: data.birthdate, 
            breed: data.breed,
            name: data.name}); 
          }
        });
        
    } 
   
    const saveItem = () =>{ 
        firebase.database().ref('users/dog/doginfo' + user.uid + '/doginfo').update(dog);
        navigation.navigate('Profiili');
    } 

    return(
        <View>
         {dog.name != undefined && dog.birthdate != undefined && dog.breed != undefined &&   
        <View style={{alignItems: 'center', justifyContent: 'center'}} > 
        <Image style={{  width:200, height:255, alignItems: 'center',
                justifyContent: 'center', borderRadius: 150}}
                source={{  uri: 'https://cdn.pixabay.com/photo/2021/05/09/10/54/dalmatian-6240488_1280.jpg'}}  />
        <Text style={{padding: 20}}>Muuta koirasi tietoja </Text>    
        <Text>Koiran nimi</Text>
        <TextInput style={{padding: 10}}
            placeholder = {dog.name}
            label = 'Nimi'  
            onChangeText={(text) => setDog({ ...dog, name: text})} 
            value={dog.name} 
            autoCapitalize="none"
        />  
        <Text>Syntymäpäivä</Text>
        <TextInput style={{padding: 10}}
            placeholder = {dog.birthdate}
            label = 'Syntymäpäivä'  
            onChangeText={(text) => setDog({...dog, birthdate: text})}
            value={dog.birthdate} 
        />   
        <Text>Rotu</Text>
        <TextInput style={{padding: 10}}
            placeholder = {dog.breed}
            label = 'Sukupuoli'  
            onChangeText={(text) => setDog({...dog, breed: text})}
            value={dog.breed} 
        />   
        <Button title='Tallenna'
        onPress={() => saveItem()}> 
        </Button>
        <Button title='Takaisin'
            onPress={() => navigation.navigate('Profiili')}>
        </Button>   
        </View> 
        }
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  /*<DropDownPicker
            label='Sukupuoli'
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        /> 
        
        <TextInput style={{padding: 10}}
            placeholder = 'Anna koiran nimi'
            label = 'Nimi'  
            onChangeText={(text) => setDog({ ...dog, name: text})} 
            value={dog.name} 
            autoCapitalize="none"
        />  






        <Text>Syntymäpäivä</Text>
        <TextInput style={{padding: 10}}
            placeholder = 'Anna koiran syntymäpäivä'
            label = 'Syntymäpäivä'  
            onChangeText={(text) => setEditedDog({...editedDog, birthdate: text})}
            value={editedDog.birthdate} 
        />   
        <Text>Rotu</Text>
        <TextInput style={{padding: 10}}
            placeholder = 'Anna koiran rotu'
            label = 'Sukupuoli'  
            onChangeText={(text) => seteditedDog({...editedDog, breed: text})}
            value={editedDog.breed} 
        />   
        */