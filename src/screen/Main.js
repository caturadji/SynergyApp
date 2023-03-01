import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    Platform,
    PermissionsAndroid,
    Alert,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { userdata } from '../data';
import { TalentCard, SearchSetting, Scanner } from '../component';
import { fontStyles, palette } from "../styles";
import { useDataContext } from '../context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Main = (props) => {
    const { navigation } = props;
    const { 
        talentList, 
        sort, 
        search,
        sortBy,
        sortType,
        searchText
    } = useDataContext();
    const bottomSheetModalRef = useRef(null);
    const bottomSheetModalRefScanner = useRef(null);
    const handlePresentModalPress = useCallback(() => {
        Keyboard.dismiss()
        bottomSheetModalRef.current?.present();
    }, []);

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
            padding: Platform.OS == 'android' ? 0 : 15,
            paddingHorizontal: 10,
            backgroundColor: palette.accent2,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 15
        },
        filterContainer: { 
          flexDirection: 'row', 
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 15,
          marginBottom: 5,

        },
        sortContainer: { 
          flexDirection: 'row', 
          alignItems: 'center',
        }
    })

    const onOpenScanner = () => {
        Keyboard.dismiss();
        // To Start Scanning
        if (Platform.OS === 'android') {
          async function requestCameraPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  title: 'Camera Permission',
                  message: 'App needs permission for camera access',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // If CAMERA Permission is granted
                bottomSheetModalRefScanner.current?.present();
              } else {
                Alert.alert('CAMERA permission denied');
              }
            } catch (err) {
                Alert.alert('Camera permission err', err);
                console.warn(err);
            }      
          }
          // Calling the camera permission function
          requestCameraPermission();
        } else {
            bottomSheetModalRefScanner.current?.present();
        }
    };

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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign
                    name='search1'
                    size={20}
                    color={palette.neutral}
                    style={{ width: '13%' }}
                />
                <TextInput
                    placeholder='Search talents ...'
                    style={[fontStyles.detailDesc, { width: '80%'}]}
                    onChangeText={(text) => search(text)}
                    value={searchText}
                />
            </View>
            <AntDesign
                name='scan1'
                size={20}
                color={palette.neutral}
                onPress={() => onOpenScanner()}
                style={{ width: '7%'}}
            />
            </View>
            {/* Sort Area */}
            <TouchableOpacity 
                onPress={handlePresentModalPress}
                activeOpacity={1}
            >
                <View style={styles.filterContainer}>
                    <View style={styles.sortContainer}>
                        <Text style={[fontStyles.mainBody, { color: palette.neutral}]}>
                            {String(sortBy).charAt(0).toUpperCase() + 
                            String(sortBy).slice(1)}
                        </Text>
                        <AntDesign
                            name={sortType == 'Descending' ? 'arrowdown' : 'arrowup'}
                            size={15}
                            color={palette.neutral}
                        />
                    </View>
                    <Ionicons
                        name='filter'
                        size={20}
                        color={palette.neutral}
                    />
                </View>
            </TouchableOpacity>
                
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
            {/* Scanner */}
            <Scanner ref={bottomSheetModalRefScanner} />
        </SafeAreaView>
    )
}

export default Main;