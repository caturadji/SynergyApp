import React, {
    useState,
    createContext,
    useContext,
    useEffect,
}
from 'react';
import {
    NativeModules,
    Platform
} from 'react-native';
import { listTalent } from '../data';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

const DataContext = createContext({
    talentList: [],
    updateLastVisitedTalent: () => {},
});

export const useDataContext = () => {
    return useContext(DataContext);
}

const group = 'group.talents';
const SharedStorage = NativeModules.SharedStorage;

const DataContextProvider = (props) => {
    const [listData, setlistData] = useState(listTalent);
    const emptyData = {
        id: 0,
        name: 'Not available',
        image: ''
    };

    const shareData = async (allTalent, lastVisit) => {
        let widgetData = allTalent.slice(0, 4).map(e => { return {
            id: e.id,
            name: e.name,
            image: e.image
        }})

        let data = {
            renderData: widgetData,
            LastVisited: lastVisit
        }

        if (Platform.OS == 'ios') {
            try {
                await SharedGroupPreferences.setItem('Data', data, group);
            } catch (err) {
                console.log(err);
            }
        } else if (Platform.OS == 'android') {
            let jsonString = JSON.stringify(data);
            SharedStorage.set(jsonString);
        }
    }

    const onUpdateLastVisitedTalent = (item) => {
        shareData(listTalent, item);
    }

    useEffect(() => {
        shareData(listTalent, emptyData);
    }, [])

    const value = {
        talentList: listData, 
        updateLastVisitedTalent: (item) => onUpdateLastVisitedTalent(item)
    }


    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>

    )
}

const LikeContext = createContext({
    updateLike: () => {},
    likedTalent: []
});

export const useLikeContext = () => {
    return useContext(LikeContext);
}

const LikeContextProvider = (props) => {
    const [likedTalent, setLikedTalent] = useState([]);

    const updateLikeByID = (id) => {
        let _listLiked = likedTalent;
        if(_listLiked.includes(id)) {
            let index = _listLiked.findIndex(e => e.id == id);
            _listLiked.splice(index);
        } else {
            _listLiked.push(id)
        }
        setLikedTalent([..._listLiked]);
    }

    const value = {
        updateLike: (id) => updateLikeByID(id),
        likedTalent: likedTalent
    }

    return (
        <LikeContext.Provider value={value}>
            {props.children}
        </LikeContext.Provider>

    )
}

export const ContextProvider = (props) => {
    return (
        <DataContextProvider>
            <LikeContextProvider>
                {props.children}
            </LikeContextProvider>
        </DataContextProvider>
    )
}
