import React, {
    useState,
    createContext,
    useContext,
}
from 'react';
import { listTalent } from '../data';

const DataContext = createContext({
    talentList: [],
    setTalentList: () => {},
    updateLike: () => {}
});

export const useDataContext = () => {
    return useContext(DataContext);
}

export const ContextProvider = (props) => {
    const [listData, setlistData] = useState(listTalent);

    const updateLikeByID = (id) => {
        let _listData = listData;
        let index = _listData.findIndex(e => e.id == id);
        _listData[index].liked = !_listData[index].liked;
        setlistData([..._listData]);
    }

    return (
        <DataContext.Provider value={{ 
            talentList: listData, 
            setTalentList: (data) => setlistData(data),
            updateLike: (id) => updateLikeByID(id)
        }}>
            {props.children}
        </DataContext.Provider>

    )
}

