import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { listTalent } from '../data';
import { TalentCard } from '../component';

const Main = (props) => {
    const { navigation } = props;
    const [listAllTalent, setListAllTalent] = useState(listTalent);

    const styles = StyleSheet.create({
        container: { 
            flex: 1, 
            backgroundColor: 'white',
        },
        titleContainer: {
            padding: 15,
        },
        center: {
            justifyContent: 'center', 
            alignItems: 'center',
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            {/* Screen Title */}
            <View style={[styles.titleContainer]}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Talent</Text>
            </View>
            {/* List Talent */}
            <View style={{ flex: 1 }}>
                <FlatList
                    data={listAllTalent}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => 
                        <TalentCard
                            item={item}
                            onPress={(data) => navigation.navigate('Detail', data)}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default Main;