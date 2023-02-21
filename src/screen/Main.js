import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    useWindowDimensions,
} from 'react-native';
import { userdata } from '../data';
import { TalentCard, SearchSetting } from '../component';
import { fontStyles, palette } from "../styles";
import { useDataContext } from '../context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Main = (props) => {
    const { navigation } = props;
    const { talentList, sort, search } = useDataContext();
    const { width } = useWindowDimensions();
    const bottomSheetModalRef = useRef(null);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        //requestLocationPermission();
        //return () =>  Geolocation.clearWatch(watchID);
    }, [])

    const handleSearchSetting = (value) => {
        if (value.sortBy == 'Nearest') {
            sort('nearest', value.sortType)
        } else if (value.sortBy == 'Name') {
            sort('name', value.sortType);
        } else if (value.sortBy == 'Age') {
            sort('age', value.sortType)
        } else if (value.sortBy == 'Rate') {
            sort('rating', value.sortType)
        }
        bottomSheetModalRef.current?.close();
    }

    const onChangeSearchText = (text) => {
        setSearchText(text);
        search(text);
    }

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
            padding: width * 3 /100,
            backgroundColor: palette.accent2,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            width: '85%'
        },
        searchContainer: { 
          flexDirection: 'row', 
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 15
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
            <View style={styles.searchContainer}>
              <View style={styles.searchbar}> 
                <View style={{ flexDirection: 'row' }}>
                  <AntDesign
                      name='search1'
                      size={20}
                      color={palette.neutral}
                      style={{ marginRight: 8 }}
                  />
                  <TextInput
                      placeholder='Search talents ...'
                      style={fontStyles.detailDesc}
                      onChangeText={(text) => onChangeSearchText(text)}
                      value={searchText}
                  />
                </View>
                <AntDesign
                    name='scan1'
                    size={20}
                    color={palette.neutral}
                />
              </View>
              <View style={{ width: '17%', alignItems: 'center'}}>
                <Ionicons
                    name='filter'
                    size={25}
                    color={palette.neutral}
                    onPress={handlePresentModalPress}
                />
              </View>
            </View>
            {/* List Talent */}
            <View style={{ flex: 1 }}>
                <FlatList
                    data={talentList}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => {
                        // console.log('re-render flatlist', item)
                        return(
                            <TalentCard
                                item={item}
                                onPress={() => navigation.navigate(
                                    'Detail',item
                                )}
                            />
                        )
                    }}
                />
            </View>
            {/* Search Setting */}
            <SearchSetting 
                ref={bottomSheetModalRef}
                onApply={(val) => handleSearchSetting(val)}
            />
        </SafeAreaView>
    )
}

export default Main;