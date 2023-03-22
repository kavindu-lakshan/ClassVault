import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, TextInput} from "react-native";
import {Button, Searchbar} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'

import {Card, Dialog} from '@rneui/themed';

import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

export default function Users() {
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const [visible1, setVisible1] = useState(false);

    const [search, setSearch] = useState("");
    const updateSearch = (search) => {
        setSearch(search);
    };

    const toggleDialog1 = () => {
        setVisible1(!visible1);
    };
    const toggleDialog2 = () => {
        alert("Hehe hari bn");
    };



    return (
        <View style={{flex: 1}}>
            <SelectDropdown
                data={countries}
                string="black"
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}

            />

            <View style={styles.view}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={updateSearch}
                    value={search}
                />
            </View>

            <ScrollView>
                <View style={styles.userDetailsCard}>
                    <Image source={require('../../../assets/download.jpg')} style={styles.avatar} />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name}>Name : Ishara</Text>
                        <Text style={styles.email}>Email: Ishara@gmail.com</Text>
                    </View>
                    <TouchableOpacity style={styles.viewMoreButton}>
                        <Text style={styles.viewMoreButtonText}>View More</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.userDetailsCard}>
                    <Image source={require('../../../assets/download.jpg')} style={styles.avatar} />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name}>Name : Ishara</Text>
                        <Text style={styles.email}>Email: Ishara@gmail.com</Text>
                    </View>
                    <TouchableOpacity style={styles.viewMoreButton} onPress={toggleDialog1} >
                        <Text style={styles.viewMoreButtonText}>View More</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>


            <Dialog
                isVisible={visible1}
                onBackdropPress={toggleDialog1}
            >

                <View>
                    <Image source={require('../../../assets/download.jpg')} style={styles.avatarShow} />
                    <Text style={styles.detailsTag}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        placeholder="Ishara Madusanka"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                   <Text style={styles.detailsTag}>Email</Text>
                    <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    placeholder="Ishara@gmail.com"
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 ,marginTop:20}}>
                    <TouchableOpacity style={styles.editButton} onPress={toggleDialog2} >
                        <Text style={styles.dialogButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={toggleDialog2} >
                        <Text style={styles.dialogButtonText} >Delete</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Dialog>

        </View>
    );
}

const styles = StyleSheet.create({
    userDetailsCard: {
        backgroundColor: '#f7f7f7',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontWeight: 'bold',
    },
    email: {
        color: '#666',
    },
    viewMoreButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    viewMoreButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: "white",
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
        marginTop:20
    },
    detailsTag:{
        marginTop:20,
        fontWeight: 'bold',
    },
    avatarShow:{
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    editButton :{
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 16,
        paddingTop:0,
        borderRadius: 8
    },
    dialogButtonText:{
        color: 'white',
        fontWeight: 'bold'
    },
    deleteButton:{
        backgroundColor: 'red',
        paddingVertical: 16,
        paddingHorizontal: 16,
        paddingTop:0,
        borderRadius: 8
    }


});

