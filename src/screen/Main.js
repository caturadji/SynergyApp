import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    NativeModules,
    Platform
} from 'react-native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import { listTalent, userdata } from '../data';
import { TalentCard } from '../component';
import { fontStyles, palette } from "../styles";
import { useDataContext } from '../context';
import AntDesign from 'react-native-vector-icons/AntDesign';

const group = 'group.talents';

const SharedStorage = NativeModules.SharedStorage;

const Main = (props) => {
    const { navigation } = props;
    const { talentList, updateLike } = useDataContext();

    const [searchText, setSearchText] = useState('');
    const [filteredTalent, setFilteredTalent] = useState([]);

    const onChangeSearchText = (text) => {
        setSearchText(text);
        let _listAllTalent = talentList;
        let filtered = _listAllTalent.filter(e => JSON.stringify(e).match(text));
        setFilteredTalent([...filtered]);
    }

    const shareData = async () => {
        let widgetData = listTalent.slice(0, 4).map(e => { return {
            id: e.id,
            name: e.name,
            image: e.image
        }})

        if (Platform.OS == 'ios') {
            try {
                await SharedGroupPreferences.setItem('Data', widgetData, group);
            } catch (err) {
                console.log(err);
            }
        } else if (Platform.OS == 'android') {
            let jsonString = JSON.stringify(String(widgetData));
            SharedStorage.set(jsonString);
        }

    }

    useEffect(() => {
        shareData()
    },[])

    const styles = StyleSheet.create({
        container: { 
            flex: 1, 
            backgroundColor: palette.primary,
        },
        titleContainer: {
            paddingHorizontal: 15,
            paddingTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        center: {
            justifyContent: 'center', 
            alignItems: 'center',
        },
        imageContainer: {
            height: 50,
            width: 50, 
            borderRadius: 100
        },
        searchbar: {
            borderRadius: 10,
            padding: 15,
            margin: 15,
            backgroundColor: palette.accent2,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            {/* Screen Title */}
            <View style={[styles.titleContainer]}>
                <View>
                    <Text style={fontStyles.appTitile}>Talents</Text>
                    <Text style={fontStyles.detailDesc}>7.234 available</Text>
                </View>
                <Image
                    style={styles.imageContainer}
                    source={{ uri: userdata.image }}
                    resizeMode='cover'
                />
            </View>
            {/* Searchbar */}
            <View style={styles.searchbar}> 
                <TextInput
                    placeholder='Search talents ...'
                    style={fontStyles.detailDesc}
                    onChangeText={(text) => onChangeSearchText(text)}
                    value={searchText}
                />
                <AntDesign
                    name='search1'
                    size={20}
                    color={palette.neutral}
                />
            </View>
            {/* List Talent */}
            <View style={{ flex: 1 }}>
                <FlatList
                    data={searchText == '' ? talentList : filteredTalent}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => 
                        <TalentCard
                            onLiked={(id) => updateLike(id)}
                            item={item}
                            onPress={() => navigation.navigate(
                                'Detail',item
                            )}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default Main;