import {
    PermissionsAndroid,
    Platform,
} from 'react-native';
import Geolocation from "@react-native-community/geolocation";

export const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
        (position) => {            
            return position;
        },
        (error) => {
            console.log('Error', error.message);
        },
        {
            enableHighAccuracy: false,
            maximumAge: 1000
        },
    );
};

export const getOneTimeLocation = () => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => {
                resolve(position);
            },
            (error) => {
                console.log('Error', error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    })
};


export const requestLocationPermission = async () => {
    return new Promise(async (resolve, reject) => {
        if (Platform.OS === 'ios') {
            getOneTimeLocation().then((item) => {
                resolve(item)
            });
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getOneTimeLocation().then((item) => {
                        resolve(item)
                    });
                } else {
                    console.log('Permission Denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    })
    
};

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

export const sortDinstanceList = async (data, sortType) => {
    return new Promise((resolve, reject) => {
        requestLocationPermission().then((userCoordinate) => {
            if (userCoordinate) {
                let unsortData = [];
                data.map((item, index) => {
                    let talentCoordinate = item.coordinate;
                    let distance = getDistanceFromLatLonInKm(
                        userCoordinate.coords.latitude, userCoordinate.coords.longitude,
                        talentCoordinate.lat, talentCoordinate.long 
                    )
                    unsortData.push({ id: item.id, distance: distance })
                })
                if (sortType == 'Ascending') {
                    let sortData = unsortData.sort((a,b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0));
                    resolve(sortData);
                } else if (sortType == 'Descending') {
                    let sortData = unsortData.sort((a,b) => (a.distance < b.distance) ? 1 : ((b.distance < a.distance) ? -1 : 0));
                    resolve(sortData);
                } 
            }
        });
    })
}