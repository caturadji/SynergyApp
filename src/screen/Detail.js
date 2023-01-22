import React, { useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    useWindowDimensions
} from "react-native";
import { TalentInformation } from '../component';
import { useDataContext } from '../context';
import { fontStyles, palette } from "../styles";
import { fallbackData } from '../data';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Detail = (props) => {
    const { navigation, route } = props;
    const params = route.params ? route.params : fallbackData;
    const { height } = useWindowDimensions();
    const { updateLike, updateLastVisitedTalent } = useDataContext();

    useEffect(() => {
        updateLastVisitedTalent({
            id: params.id,
            name: params.name,
            image: params.image
        })
    },[params])

    const styles = StyleSheet.create({
        container: { 
            flex: 1, 
            backgroundColor: palette.primary
        },
        imageContainer : { 
            flex: 0.77
        },
        image: {
            width: '100%',
            height: '100%',
        },
        buttonCircle: {
            padding: 5,
            position: 'absolute',
            top: 25,
            left: 15,
            justifyContent: 'center',
            alignItems: 'center'
        },
        talentContainer: { 
            height: 0.25 * height, 
            padding: 15, 
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20, 
            backgroundColor: palette.primary, 
            position: 'absolute',
            width: '100%',
            bottom: 0
        },
        buttonText: {
            fontSize: 16
        },
        button: {
            width: '100%',
            backgroundColor: palette.accent,
            borderRadius: 40,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 5
        },
        buttonTransparent : { 
            backgroundColor: palette.neutral2, 
            height: 45, 
            width: 45,
            position: 'absolute',
            borderRadius: 100,
            opacity: 0.4
        }
    })

    return (
        <View style={styles.container}>
            {/* Image Container */}
            <View style={styles.imageContainer}>
                {/* Image */}
                <Image
                    style={styles.image}
                    source={{ uri: params.image }}
                    resizeMode='cover'
                />
                {/* Back Button */}
                <TouchableOpacity
                    onPress={navigation.goBack}
                    style={styles.buttonCircle}
                >
                    <View style={styles.buttonTransparent}/>
                    <AntDesign name={'arrowleft'} size={25}/>
                </TouchableOpacity>
            </View>
            {/* Talent Information */}
            <View style={styles.talentContainer}>
                {/* Talent Information */}
                <TalentInformation 
                    onLiked={() => updateLike(params.id)} 
                    item={params} 
                    isDetail={true}
                />
                {/* Button */}
                <TouchableOpacity style={styles.button}> 
                    <Text 
                        style={[
                            fontStyles.buttonText,
                            { color: palette.primary }
                        ]}
                    >
                        Invite to casting
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Detail;