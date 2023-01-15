import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
} from "react-native";
import { fontStyles, palette } from '../styles';
import PropTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TalentInformation = (props) => {
    const { item, isDetail, onLiked } = props;

    const styles = StyleSheet.create({
        infoContainer: {
            flexDirection: 'row',
            marginVertical: isDetail ? 22 : 15
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
        headContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        starContainer : {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: isDetail ? 3 : 1
        },
        verticalDivider: {
            height: 38,
            width: 2,
            backgroundColor: palette.neutral2,
            marginRight: 15
        }
    })

    return (
        <View>
            <View style={styles.headContainer}>
                <Text style={styles.headerText}>{item.name}</Text>
                <AntDesign 
                    name={item.liked ? 'heart' : 'hearto'}
                    size={isDetail ? 25 : 20}
                    color={item.liked ? palette.accent : palette.neutral}
                    onPress={onLiked}
                />
            </View>
            <View style={styles.starContainer}>
                {([1, 2, 3 ,4, 5]).map(e => {
                    return (
                        <AntDesign 
                            key={e}
                            name={e > item.rating ? 'staro' : 'star'}
                            size={isDetail ? 18 : 13}
                            color={e > item.rating ? palette.neutral : palette.accent}
                        />
                    )
                })}
                <Text 
                    style={[styles.descText, {left: 5 }]}
                >
                    {item.review}
                </Text>
            </View>
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
                <View style={styles.verticalDivider}/>
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
                    <View style={styles.verticalDivider}/>
                }
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
    isDetail: PropTypes.bool,
    onLiked: PropTypes.func
}

TalentInformation.defaultProps = {
    item: {},
    isDetail: false,
    onLiked: () => {}
}

export default TalentInformation;