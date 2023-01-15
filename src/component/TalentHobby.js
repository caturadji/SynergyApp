import React from 'react';
import {
    Text,
    StyleSheet,
    View, 
} from 'react-native';
import { fontStyles, palette } from '../styles';
import PropTypes from 'prop-types';

const TalentHobby = (props) => {
    const { item } = props;

    const styles = StyleSheet.create({
        container: { 
            flexDirection: 'row',
            flexWrap: 'wrap', 
            marginVertical: 5 
        },
        chips: {
            borderWidth: 0.4,
            borderColor: palette.neutral,
            padding: 5,
            marginRight: 5,
            marginBottom: 5,
            borderRadius: 10
        }
    })
    return (
        <View style={styles.container}>
            {item.map((e, index) => {
                if (index < 4) {
                    return(
                        <View 
                            key={index}
                            style={styles.chips}
                        >
                            <Text style={fontStyles.mainDesc}>{e}</Text>
                        </View>
                    )
                }
            })}
            {item.length > 4 && 
                <View style={styles.chips}>
                    <Text 
                        style={fontStyles.mainDesc}
                    >
                        +{item.length - 4}
                    </Text>
                </View>
            }
        </View>
    )
}

TalentHobby.propTypes = {
    item: PropTypes.array.isRequired
}

export default TalentHobby;