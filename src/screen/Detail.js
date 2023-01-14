import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity
} from "react-native";
import { TalentInformation } from '../component';

const Detail = (props) => {
    const { navigation, route } = props;
    const params = route.params;

    const styles = StyleSheet.create({
        container: { 
            flex: 1, 
            backgroundColor: 'white'
        },
        imageContainer : { 
            flex: 0.75 
        },
        image: {
            width: '100%',
            height: '100%',
        },
        buttonCircle: {
            padding: 10,
            borderRadius: 100,
            backgroundColor: 'lightgrey',
            position: 'absolute',
            top: 25,
            left: 15,
            opacity: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        talentContainer: { 
            flex: 0.25, 
            padding: 15, 
        },
        buttonText: {
            fontSize: 18
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
                    <Text style={styles.buttonText}>{'< Back'}</Text>
                </TouchableOpacity>
            </View>
            {/* Talent Information */}
            <View style={styles.talentContainer}>
                {/* Talent Information */}
                <TalentInformation item={params} isDetail={true}/>
                {/* Button */}
                <View>
                    <Button title="Start Chatting"/>
                </View>
            </View>
        </View>
    )
}

export default Detail;