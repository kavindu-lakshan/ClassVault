import * as React from 'react';
import {View, } from "react-native";
import {DataTable} from 'react-native-paper';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

export default function Users() {
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
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
