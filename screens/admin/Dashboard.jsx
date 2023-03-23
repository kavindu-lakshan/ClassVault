import * as React from 'react';
import {View, Text, StyleSheet} from "react-native";

export default function Dashboard() {
    return (
        <view>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.cardLeft}><Text style={styles.midNumberBig}>28</Text></View>
                <View style={styles.cardRight}><Text style={styles.midNumberBig}>28</Text></View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.cardLeft}><Text style={styles.midNumberSmall}>28</Text></View>
                <View style={styles.cardRight}><Text style={styles.midNumberSmall}>28</Text></View>
                <View style={styles.cardLeft}><Text style={styles.midNumberSmall}>28</Text></View>
                <View style={styles.cardRight}><Text style={styles.midNumberSmall}>28</Text></View>
            </View>
        </view>

    );



}
const styles = StyleSheet.create({
    cardLeft :{
        backgroundColor: 'red',
        flex: 1,
        width: 'auto',
        height: 150,
        marginTop:20,
        marginLeft:20,
        paddingHorizontal: 20,
        paddingVertical:20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    cardRight :{
        backgroundColor: 'blue',
        flex: 1,
        width:'auto',
        height:150,
        marginTop:20,
        marginLeft:20,
        borderRadius: 20,
        marginRight:20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    midNumberBig :{
        fontSize:72,
        fontWeight:"bold"
    },
    midNumberSmall:{
        fontSize:20,
        fontWeight:"bold"
    }
});
