import * as React from 'react';
import { View, Text, Button } from "react-native";
import { confirm } from "react-confirm-box";

export default function ProfileScreen() {
    const options = {
        labels: {
            confirmable: "Confirm",
            cancellable: "Cancel"
        }
    }

    const onClick = async () => {
        const result = await confirm("Are you sure?", options);
        if (result) {
            console.log("You click yes!");
            return;
        }
        console.log("You click No!");
    };
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>Profile Screen</Text>
            <Button title={'3-Button Alert'} onPress={onClick} />

        </View>
    );
}
