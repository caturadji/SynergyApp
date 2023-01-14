import React from 'react';
import {
    Text,
    StyleSheet,
    View, 
} from 'react-native';
import { fontStyles } from '../styles';
import PropTypes from 'prop-types';

const TalentHobby = (props) => {
    const { item } = props;

    const styles = StyleSheet.create({
        container: { 
            flexDirection: 'row',
            flexWrap: 'wrap', 
            marginVertical: 10 
        },
        chips: {
            borderWidth: 1,
            borderColor: 'grey',
            padding: 5,
            marginRight: 5,
            marginBottom: 5,
            borderRadius: 10
        }
    })
    return (
        <View style={styles.container}>
            {item.map((e, index) => {
                return(
                    <View 
                        key={index}
                        style={styles.chips}
                    >
                        <Text style={fontStyles.mainDesc}>{e}</Text>
                    </View>
                )
            })}
        </View>
    )
}

TalentHobby.propTypes = {
    item: PropTypes.array.isRequired
}

export default TalentHobby;