
import React from 'react'; 
import { Provider } from 'react-native-paper'
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';  
import { createStackNavigator} from'@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';  
import SignInScreen from './Screens/SignInScreen';
import { Ionicons} from '@expo/vector-icons';   
import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from './components/Config' 
import ProfileScreen from './Screens/ProfileScreen';
import BasicSkills from './Screens/BasicSkills';
import commandSit from './Screens/commandSit';
import EditProfileScreen from './Screens/EditProfileScreen';
import commandCome from './Screens/commandCome';
import commandLeave from './Screens/commandLeave';

const Stack = createStackNavigator(); 
const Tab = createBottomTabNavigator(); 
// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(FIREBASE_CONFIG) : firebase.app();  

function Home() {
  return (
    //Create tab navigation for HomeScreen and ProfileScreen
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName; 
        if (route.name === 'Profiili') {
          iconName= 'person-circle';
        } else if (route.name === 'Home') {
          iconName= 'md-home';
        }
        return <Ionicons name={iconName} size={size} color={color} />;   
      },
    })}>
      <Tab.Screen name="Profiili" component={ProfileScreen} /> 
      <Tab.Screen name="Home" component={HomeScreen} />
      
    </Tab.Navigator>
  );
}

export default function App( ) {

   return (
     //Create stack navigation
    <Provider >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignInScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
          />
          <Stack.Screen name="HomeScreen" component={Home} /> 
          <Stack.Screen name="Sit" component={commandSit}/> 
          <Stack.Screen name="Come" component={commandCome}/> 
          <Stack.Screen name="Leave" component={commandLeave}/> 
          <Stack.Screen name="Basic" component={BasicSkills}/>
          <Stack.Screen name="ProfileEdit" component={EditProfileScreen}/>
        </Stack.Navigator> 
      </NavigationContainer>   
    </Provider>

   )
 }
  
  
