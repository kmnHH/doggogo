import React, {useState, useEffect} from'react';
import{  View, Text, Image, StyleSheet, Button, TextInput } from'react-native';   
import * as firebase from 'firebase' 
import DropDownPicker from 'react-native-dropdown-picker';  


const imageUri = {uri: 'https://cdn.pixabay.com/photo/2021/05/09/10/54/dalmatian-6240488_1280.jpg'}; 

export default function EditProfileScreen( {navigation }) {
    const auth = firebase.default.auth()
    const user = auth.currentUser;
    const [dog, setDog] = useState({
        name: '', 
        birthdate: '', 
        breed: ''
    })
    
    useEffect(() => {
        getDog();
        return () => {
            setDog({}); 
        };
      }, []);
    
      function getDog(){
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
        <View style={{paddingTop: 30}}>
         {dog.name != undefined && dog.birthdate != undefined && dog.breed != undefined &&   
        <View style={{alignItems: 'center', justifyContent: 'center'}} > 
        <Image style={{  width:200, height:255, alignItems: 'center',
                justifyContent: 'center', borderRadius: 150}}
                source={imageUri}  />
        <Text style={{padding: 10, fontWeight: 'bold'}}>Muuta koirasi tietoja </Text>    
        <Text style={{padding: 10, fontWeight: 'bold'}}>Koiran nimi</Text>
        <TextInput style={{padding: 10}}
            placeholder = {dog.name}
            label = 'Nimi'  
            onChangeText={(text) => setDog({ ...dog, name: text})} 
            value={dog.name} 
            autoCapitalize="none"
        />  
        <Text style={{padding: 10, fontWeight: 'bold'}}>Syntymäpäivä</Text>
        <TextInput style={{padding: 10}}
            placeholder = {dog.birthdate}
            label = 'Syntymäpäivä'  
            onChangeText={(text) => setDog({...dog, birthdate: text})}
            value={dog.birthdate} 
        />   
        <Text style={{padding: 10, fontWeight: 'bold'}}>Rotu</Text>
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
        
        */