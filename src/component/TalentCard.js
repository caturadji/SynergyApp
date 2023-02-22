import React, { useEffect, useState, memo } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View, 
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import { TalentHobby, TalentInformation } from '../component';
import { palette } from '../styles';
import { listTalent, fallbackData } from '../data';

const TalentCard = (props) => {
    const { item, onPress } = props;
    const [talent, setTalent] = useState(fallbackData);

    // console.log('re-rendered item ', item);

    useEffect(() => {
        setTalent(listTalent.find(e => e.id == item))
    }, [item])

    const styles = StyleSheet.create({
        cardContainer: { 
            paddingHorizontal: 15
        },
        divider: { 
            height: 1, 
            width: '100%', 
            backgroundColor: palette.accent2,
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
            onPress={onPress}
        >
            {/* Divider */}
            <View style={styles.divider}/>
            {/* Talent Container*/}
            <View style={styles.talentContainer}>
                {/* Talent Photos Container*/}
                <View style={styles.photoContainer}>
                    <Image
                        style={styles.photo}
                        source={{ uri: talent?.image }}
                        resizeMode='cover'
                    />
                </View>
                {/* Talent Information Container*/}
                <View style={styles.informationContainer}>
                    <TalentInformation item={talent}/>
                    <TalentHobby item={talent?.hobby}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

TalentCard.propTypes = {
    item: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
}

export default memo(TalentCard);