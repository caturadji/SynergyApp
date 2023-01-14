import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View, 
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import { TalentHobby, TalentInformation } from '../component'

const TalentCard = (props) => {
    const { item, onPress } = props;

    const styles = StyleSheet.create({
        cardContainer: { 
            paddingHorizontal: 15
        },
        divider: { 
            height: 2, 
            width: '100%', 
            backgroundColor: 'lightgrey',
        },
        talentContainer: {
            flex: 1,
            flexDirection: 'row',
        },
        photoContainer: { 
            flex: 0.4, 
            paddingVertical: 15,
            marginRight: 10,
        },
        photo: {
            width: '100%',
            height: '100%',
            borderRadius: 10
        },
        informationContainer: { 
            flex: 0.6, 
            paddingVertical: 15,
        }
    })

    return (
        <TouchableOpacity 
            style={styles.cardContainer}
            onPress={() => onPress(item) }
        >
            {/* Divider */}
            <View style={styles.divider}/>
            {/* Talent Container*/}
            <View style={styles.talentContainer}>
                {/* Talent Photos Container*/}
                <View style={styles.photoContainer}>
                    <Image
                        style={styles.photo}
                        source={{ uri: item.image }}
                        resizeMode='cover'
                    />
                </View>
                {/* Talent Information Container*/}
                <View style={styles.informationContainer}>
                    <TalentInformation item={item}/>
                    <TalentHobby item={item.hobby}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

TalentCard.propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
}

export default TalentCard;