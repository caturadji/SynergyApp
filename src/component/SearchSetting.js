import React, { useState, useMemo, useCallback  } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { fontStyles, palette } from "../styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomSheetModal } from '@gorhom/bottom-sheet/src';
import PropTypes from 'prop-types';

const SearchSetting = React.forwardRef((props, ref) => {
  // props
  const { onApply } = props;

  // state
  const [sortBy, setSortBy] = useState('Name');
  const [sortType, setSortType] = useState('Ascending');

  const optionList = [
    {
      name: 'Sort By',
      option: ['Name', 'Rate', 'Age', 'Nearest']
    },
    {
      name: 'Sort Type',
      option: ['Ascending', 'Descending']
    }
  ]

  // variables
  const snapPoints = useMemo(() => ['95%', '95%'], []);

  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const styles = StyleSheet.create({
    containerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10
    },
    divider: { 
      height: 1, 
      width: '100%', 
      backgroundColor: palette.accent2 
    },
    containerOption: {
      marginTop: 10,
      backgroundColor: 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderWidth: 1,
      borderColor: palette.accent2
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    }
  })

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.containerHeader}>
          <Text
            style={[fontStyles.mainBody, { color: '#007AFF' }]}
            onPress={() => ref.current?.close()}
          >
            Cancel
          </Text>
          <Text style={fontStyles.mainHeader}>Filter Settings</Text>
          <Text
            style={[fontStyles.mainBody, { color: '#007AFF' }]}
            onPress={() => onApply({ sortBy, sortType })}
          >
            Apply
          </Text>
        </View>
        <View style={styles.divider}/>
        {optionList.map((value, idx) => {
          return (
            <View key={idx} style={{ padding: 20 }}>
              <Text style={[fontStyles.mainBody, { color: palette.neutral }]}>{value.name}</Text>
              <View style={styles.containerOption}>
                {value.option.map((e, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={1}
                      onPress={() => {
                        idx == 0
                          ? setSortBy(e)
                          : setSortType(e)
                      }}
                    >
                      <View style={styles.option}>
                        <Text style={[fontStyles.mainBody, { fontWeight: 400 }]}>
                          {e}
                        </Text>
                        {((idx == 1 && sortType == e) ||
                          (idx == 0 && sortBy == e)) &&
                          <AntDesign
                            name='check'
                            size={18}
                            color={'#007AFF'}
                            style={{ marginRight: 8 }}
                          />
                        }
                      </View>
                      {index !== value.option.length - 1 &&
                        <View style={{
                          height: 1,
                          width: '100%',
                          backgroundColor: palette.accent2
                        }} />
                      }
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
          )
        })}

      </View>
    </BottomSheetModal>
  )
})

SearchSetting.propTypes = {
  onApply: PropTypes.func,
}

export default SearchSetting;