import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import ButtonO from '../components/ButtonO';
import firebase from 'firebase/app';
import 'firebase/auth';


export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [readyUser, setReadyUser] = useState();

  const onPressSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(() => {
      navigation.navigate('HomeScreen', {
        info: readyUser
      });
    })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      })
  }

  const onPressRegister = () => {
    console.log('rekisteroidaan');
    const user = firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
    console.log('yritan');
    Alert.alert('Rekisteröinti onnistui! Voit nyt kirjautua sisään.')
    return setReadyUser(user);

  }

  return (
    <View style={styles.container}>
      <ImageBackground style={{ alignItems: 'center', justifyContent: 'center', width: '95%', height: '95%', marginLeft: '5%' }}
        source={{ uri: 'https://cdn.pixabay.com/photo/2017/02/16/19/47/bokeh-2072271_1280.jpg' }}>
        <View style={styles.inputView}>
          <Text style={{ margin: 20, fontWeight: 'bold', color: 'white' }}>Sähköposti</Text>
          <TextInput style={styles.TextInput}
            placeholder='Anna sähköposti'
            label='Sposti'
            returnKeyType="next"
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            value={email.value}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <Text style={{ margin: 20, fontWeight: 'bold', color: 'white' }}>Salasana</Text>
          <TextInput style={styles.TextInput}
            placeholder='Anna salasana'
            label='Salasana'
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            value={password.value}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
        </View>
        <ButtonO onPress={() => onPressSignIn()}> Kirjaudu </ButtonO>
        <ButtonO onPress={() => onPressRegister()}> Rekisteröidy </ButtonO>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 20,
    width: "70%",
    height: '50%',
    marginBottom: 30,
    alignItems: "center",
    margin: 5,
    padding: 5,
    marginRight: '5%'
  },

  TextInput: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderColor: 'gray',
    borderTopColor: 'gray',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    marginBottom: 20,
    width: '90%',
    padding: 20
  },
});