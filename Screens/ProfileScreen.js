import React, {useState, useEffect} from'react';
import{  View, Text, Image, StyleSheet, Button, ImageBackground, ScrollView, SafeAreaView} from'react-native';   
import * as firebase from 'firebase' 
import DropDownPicker from 'react-native-dropdown-picker';  

const logo = { uri: 'https://i.ibb.co/Xj7db5g/Doggogo-logo.png' };
const imageUri = {uri: 'https://cdn.pixabay.com/photo/2021/05/09/10/54/dalmatian-6240488_1280.jpg'}; 

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
         <View style={{ marginBottom: 30 }}>
            <ImageBackground source={logo} resizeMode="cover" style={{ justifyContent: "center", height: 100, width: 375, backgroundColor: 'white' }}/>
          </View>
          <SafeAreaView style={styles.safeArea}>
            <ScrollView>
              {dog.name != undefined && dog.birthdate != undefined && dog.breed != undefined &&
              <View style={{alignItems: 'center', justifyContent: 'center'}} > 
                <Image style={styles.image} source={imageUri}/>
                <Text style={{padding: 20, fontWeight: 'bold'}}>Tervetuloa {user.email} </Text>    
                <View style={styles.doginfo}>
                  <Text style={{fontWeight: 'bold'}}>Koiran nimi</Text>
                  <Text> {dog.name} </Text> 
                </View>
                <View style={styles.doginfo}>
                  <Text style={{fontWeight: 'bold'}}>Syntymäpäivä</Text>
                  <Text> {dog.birthdate} </Text>
                </View>
                <View style={styles.doginfo}>
                  <Text style={{fontWeight: 'bold'}}>Rotu</Text>
                  <Text> {dog.breed} </Text>
                </View>
                <View style={{paddingBottom: 290}}>
                  <Button title='Muuta tietoja' 
                    onPress={() => navigation.navigate('ProfileEdit')}> 
                  </Button>
                </View>
              </View> } 
            </ScrollView>
          </SafeAreaView>
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
    image: {
      width:200, 
      height:255, 
      alignItems: 'center',
      justifyContent: 'center', 
      borderRadius: 150  
    }, 
    doginfo: {
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingBottom: 12
    }
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