import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddChatScreen from '../screens/AddChatScreen';
import LeaveRequest from '../screens/LeaveRequest';

const Tab = createBottomTabNavigator();

function BottomTabNav() {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: "#e91e63",
            
        }}
    
    >
      <Tab.Screen name="Meet Me" component={HomeScreen} />
      <Tab.Screen name="AddChat" component={AddChatScreen} />
      <Tab.Screen name="LeaveRequest" component={LeaveRequest} />
    </Tab.Navigator>
  );
}

export default BottomTabNav;