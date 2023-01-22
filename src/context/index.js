import React, {
    useState,
    createContext,
    useContext,
    useEffect
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
    setTalentList: () => {},
    updateLike: () => {},
    updateLastVisitedTalent: () => {}
});

export const useDataContext = () => {
    return useContext(DataContext);
}

const group = 'group.talents';
const SharedStorage = NativeModules.SharedStorage;

export const ContextProvider = (props) => {
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
            let jsonString = JSON.stringify(String(widgetData));
            SharedStorage.set(jsonString);
        }
    }

    const updateLikeByID = (id) => {
        let _listData = listData;
        let index = _listData.findIndex(e => e.id == id);
        _listData[index].liked = !_listData[index].liked;
        setlistData([..._listData]);
    }

    const onUpdateLastVisitedTalent = (item) => {
        shareData(listTalent, item);
    }

    useEffect(() => {
        shareData(listTalent, emptyData);
    }, [])


    return (
        <DataContext.Provider value={{ 
            talentList: listData, 
            setTalentList: (data) => setlistData(data),
            updateLike: (id) => updateLikeByID(id),
            updateLastVisitedTalent: (item) => onUpdateLastVisitedTalent(item)
        }}>
            {props.children}
        </DataContext.Provider>

    )
}

