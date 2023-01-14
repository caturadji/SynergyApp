import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
} from "react-native";
import { fontStyles } from '../styles';
import PropTypes from 'prop-types';

const TalentInformation = (props) => {
    const { item, isDetail } = props;

    const styles = StyleSheet.create({
        infoContainer: {
            flexDirection: 'row',
            // flex: 1,
            marginVertical: 15
        },
        infoFlex: { 
            flex: isDetail ? 1/3 : 1/2, 
            marginRight: 10 
        },
        headerText: 
            isDetail 
                ? fontStyles.detailHeader 
                : fontStyles.mainHeader
            ,
        bodyText: 
            isDetail 
                ? fontStyles.detailBody 
                : fontStyles.mainBody
            ,
        descText:
            isDetail 
                ? fontStyles.detailDesc
                : fontStyles.mainDesc
    ,
    })

    return (
        <View>
            <Text style={styles.headerText}>{item.name}</Text>
            <View style={styles.infoContainer}>
                <View style={styles.infoFlex}>
                    <Text style={styles.descText}>Location</Text>
                    <Text 
                        numberOfLines={1} 
                        style={styles.bodyText}
                    >
                        {item.location}
                    </Text>
                </View>
                <View style={styles.infoFlex}>
                    <Text style={styles.descText}>Age</Text>
                    <Text 
                        numberOfLines={1} 
                        style={styles.bodyText}
                    >
                        {item.age} years
                    </Text>
                </View>
                {isDetail &&
                    <View style={{ flex: isDetail ? 1/3 : 1/2 }}>
                        <Text style={styles.descText}>Gender</Text>
                        <Text 
                            numberOfLines={1} 
                            style={styles.bodyText}
                        >
                            {item.gender}
                        </Text>
                    </View>
                }
            </View>
        </View>
    )
}

TalentInformation.propTypes = {
    item: PropTypes.object.isRequired,
    isDetail: PropTypes.bool
}

TalentInformation.defaultProps = {
    item: {},
    isDetail: false
}

export default TalentInformation;