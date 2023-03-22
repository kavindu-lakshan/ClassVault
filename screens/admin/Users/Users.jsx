import React, {useState} from 'react';
import {View, StyleSheet} from "react-native";
import {DataTable} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import { SearchBar } from '@rneui/themed';
import { Searchbar } from 'react-native-paper';


export default function Users() {
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    const [search, setSearch] = useState("");
    const updateSearch = (search) => {
        setSearch(search);
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

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                    <DataTable.Title numeric>Age</DataTable.Title>
                    <DataTable.Title numeric>Actions</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell>John</DataTable.Cell>
                    <DataTable.Cell>john@kindacode.com</DataTable.Cell>
                    <DataTable.Cell numeric>25</DataTable.Cell>
                    <DataTable.Cell numeric>more</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Bob</DataTable.Cell>
                    <DataTable.Cell>test@test.com</DataTable.Cell>
                    <DataTable.Cell numeric>25</DataTable.Cell>
                    <DataTable.Cell numeric>more</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex            : 1,
        backgroundColor : "#fff",
        alignItems      : "center",
        justifyContent  : "center",
    },
    view: {
        margin: 10,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginTop:'30px',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});
