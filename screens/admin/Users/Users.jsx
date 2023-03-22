import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
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
                <Card containerStyle={{marginTop: 15}}>
                    <Dialog.Title title="Dialog Title"/>
                    <Card.Divider/>
                    <Text h1>
                        h1 Heading
                    </Text>
                    <Text h2>
                        h2 Heading
                    </Text>
                    <Text h3>
                        h3 Heading
                    </Text>
                    <Text h4>
                        h4 Heading
                    </Text>
                    <Text>Normal Text</Text>
                </Card>

                <Card containerStyle={{marginTop: 15}}>
                    <Dialog.Title title="Dialog Title"/>
                    <Button icon="camera" onPress={toggleDialog1}>
                        Press me
                    </Button>
                    <Card.Divider/>
                    <Text h1>
                        h1 Heading
                    </Text>
                    <Text h2>
                        h2 Heading
                    </Text>
                    <Text h3>
                        h3 Heading
                    </Text>
                    <Text h4>
                        h4 Heading
                    </Text>
                    <Text>Normal Text</Text>
                </Card>
                <Card containerStyle={{marginTop: 15}}>
                    <Dialog.Title title="Dialog Title"/>
                    <Button icon="camera" onPress={toggleDialog1}>
                        Press me
                    </Button>
                    <Card.Divider/>
                    <Text h1>
                        h1 Heading
                    </Text>
                    <Text h2>
                        h2 Heading
                    </Text>
                    <Text h3>
                        h3 Heading
                    </Text>
                    <Text h4>
                        h4 Heading
                    </Text>
                    <Text>Normal Text</Text>
                </Card>
            </ScrollView>


            <Dialog
                isVisible={visible1}
                onBackdropPress={toggleDialog1}
            >

                <Card containerStyle={{ marginTop: 15 }}>

                    <Button icon="camera" onPress={toggleDialog1}>
                        Press me
                    </Button>

                    <Card.Divider />
                    <Text h1>
                        h1 Heading
                    </Text>
                    <Text h2>
                        h2 Heading
                    </Text>
                    <Text h3>
                        h3 Heading
                    </Text>
                    <Text h4>
                        h4 Heading
                    </Text>
                    <Text>Normal Text</Text>
                </Card>
            </Dialog>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    view: {
        margin: 10,
    },
});

