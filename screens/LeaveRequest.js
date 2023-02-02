import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar, Button, Input } from 'react-native-elements';
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { BottomTabNav } from '../navigation/BottomTabNav';
import { LeaveForm } from '../components/LeaveForm';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import db


const LeaveRequest = ({navigation}) => {

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };

    const [leaveType, setLeaveType] = React.useState("");
    const [dayType, setDayType] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [comments, setComments] = React.useState("");

    const handleSubmit = async () => {
        try {
            const leaveRequest = await db.collection('leaveRequests').add({
                leaveType,
                dayType,
                startDate,
                comments,
            });
            console.log(leaveRequest);
            console.log("Leave Request Submitted");
        } catch (error) {
            console.log(error);
        }
    };

    const leaveTypes = [
        {key: 1, value: 'Annual Leave'},
        {key: 2, value: 'Sick Leave'},
        {key: 3, value: 'Maternity Leave'},
        {key: 4, value: 'Paternity Leave'},
        {key: 5, value: 'Study Leave'},
        {key: 6, value: 'Compassionate Leave'},
        {key: 7, value: 'Unpaid Leave'},
        {key: 8, value: 'Other'},
    ];
    const [isDatePickerVisible, setDatePickerVisibility] = useState(true);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      alert("A date has been picked: ", date);
      hideDatePicker();
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Leave Request",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 5 }}>
                    <TouchableOpacity>
                        <Avatar 
                            rounded 
                            source={{
                                uri: auth?.currentUser?.photoURL,
                            }}
                            
                        />
                    </TouchableOpacity>
                </View>
                
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity>
                        {/* a plus sign */}
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={signOutUser}>
                        <AntDesign name="logout" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),

        });
    }, [navigation]);

  return (
    <SafeAreaView style={styles.contentContainer}>
        <View style={styles.container}>
        <Text style={styles.title}>Leave Type</Text>
        <SelectList
            data={leaveTypes}
            value={leaveType}
            setSelected={setLeaveType}
            style={{marginBottom: 20}}
        />
        <Text style={styles.title}>Select the Days</Text>
        <SelectList
            data={
                [
                    {key: 1, value: 'Full Day'},
                    {key: 2, value: 'Half Day'},
                ]
            }
            value={leaveType}
            setSelected={setDayType}
            style={{marginBottom: 20}}
        />
        <Button title="Select Start Date" onPress={showDatePicker} />
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />

        <Input
            placeholder="Additional Comments"
            type="date"
            style={styles.input}
            value={comments}
            onChangeText={(text) => setComments(text)}
        />
        </View>

        <Button title="Submit" onPress={handleSubmit} />

    </SafeAreaView>
  )
}

export default LeaveRequest

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#fff',
    },
})