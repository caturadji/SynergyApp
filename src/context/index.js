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
import { sortDinstanceList } from '../function';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

const DataContext = createContext({
    talentList: [],
    updateLastVisitedTalent: () => {},
    sort: () => {},
    search: () => {},
    searchText: '',
    sortBy: '',
    sortType: ''
});

export const useDataContext = () => {
    return useContext(DataContext);
}

const group = 'group.talents';
const SharedStorage = NativeModules.SharedStorage;

const DataContextProvider = (props) => {
    const [listData, setlistData] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [searchText, setSearchText] = useState('');
    const [sortType, setSortType] = useState('Ascending');
    const emptyData = {
        id: 0,
        name: 'Not available',
        image: ''
    };

    console.log('Data Context Loading')

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

    const sortData = async (by, type) => {
        setSortBy(by);
        setSortType(type);
        let searchedData = searchFunction(listTalent, searchText)
        let data = [];
        if (by == 'nearest') {
            sortDinstanceList(searchedData, type).then((dataNearest) => {
                setlistData(dataNearest.map(e => e.id));
            });
        } else {
            data = sortFunction(searchedData, by, type);
            setlistData(data.map(e => e.id));
        }
    }

    const sortFunction = (data, by, type) => {
        let _listAllTalent = data;
        if (type == 'Ascending') {
            return _listAllTalent.sort((a,b) => (a[by] > b[by]) ? 1 : ((b[by] > a[by]) ? -1 : 0));
        } else if (type == 'Descending') {
            return _listAllTalent.sort((a,b) => (a[by] < b[by]) ? 1 : ((b[by] < a[by]) ? -1 : 0));
        }
        
    }

    const searchData = async (text) => {
        setSearchText(text);
        let _listAllTalent = [];
        if(sortBy == 'nearest') {
            await sortDinstanceList(listTalent, sortType).then((dataNearest) => {
                dataNearest.map(e => {
                    _listAllTalent.push(listTalent.find(item => item.id == e.id))
                })
            });
        } else {
            _listAllTalent = sortFunction(listTalent, sortBy, sortType);
        }
        let filtered = searchFunction(_listAllTalent, text)
        setlistData(filtered.map(e => e.id));
    }

    const searchFunction = (data, text) => {
        let lowerCaseText = String(text).toLocaleLowerCase();
        return data.filter(e => 
            JSON.stringify(e).toLocaleLowerCase().match(lowerCaseText)
        );
    }

    useEffect(() => {
        shareData(listTalent, emptyData);
        sortData('name', sortType);
    }, [])

    const value = React.useMemo(() => ({
        talentList: listData, 
        updateLastVisitedTalent: (item) => onUpdateLastVisitedTalent(item),
        sort: (by, type) => sortData(by, type),
        search: (text) => searchData(text),
        searchText: searchText,
        sortBy: sortBy,
        sortType: sortType
    }), [listData])

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

    console.log('Like Context Loading')


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

    console.log('Main Context Loading')

    return (
        <DataContextProvider>
            <LikeContextProvider>
                {props.children}
            </LikeContextProvider>
        </DataContextProvider>
    )
}
