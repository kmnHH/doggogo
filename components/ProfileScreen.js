import React, {useState, useEffect} from'react';
import{  View, Text, Image, StyleSheet, Button, Alert, TextInput } from'react-native';   
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';  
import * as firebase from 'firebase' 
import DropDownPicker from 'react-native-dropdown-picker';  
import { getAuth } from "firebase/auth";
import commandSit from '../Screens/commandSit';
//import { getDatabase, ref, onValue} from "firebase/database";
import EditProfileScreen from '../Screens/EditProfileScreen';
import getDogInfo from './DogInfoApi';


export default function ProfileScreen( {navigation, route }) {
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    const [dog, setDog] = useState({
        birthdate: '',
        breed: '', 
        name: ''
    });
   /*const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Narttu', value: 'female'},
      {label: 'Uros', value: 'male'}
    ]);*/


    useEffect(() => {
        getDoggis();
        return () => {
          setDog({}); 
      };
      }, []);
    

     const getDoggis = async () => {
        var dogRef = await firebase.database().ref('users/dog/doginfo' + user.uid + '/doginfo');
        dogRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data != null) {
          setDog({...dog, birthdate: data.birthdate, 
            breed: data.breed,
            name: data.name});
          }
        });
        
    } 
    
    return(
      <View>
        {dog.name != undefined && dog.birthdate != undefined && dog.breed != undefined &&
        <View style={{alignItems: 'center', justifyContent: 'center'}} > 
        <Image style={{  width:200, height:255, alignItems: 'center',
                justifyContent: 'center', borderRadius: 150}}
                source={{  uri: 'https://cdn.pixabay.com/photo/2021/05/09/10/54/dalmatian-6240488_1280.jpg'}}  />
        <Text style={{padding: 20}}>Tervetuloa ja {user.email} </Text>    
        <Text>Koiran nimi</Text>
        <Text> {dog.name} </Text>
        <Text>Syntymäpäivä</Text>
        <Text> {dog.birthdate} </Text>
        <Text>Rotu</Text>
        <Text> {dog.breed} </Text>
        <Button title='Muuta tietoja'
            onPress={() => navigation.navigate('ProfileEdit')}> 
        </Button>
        </View> }
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
        */