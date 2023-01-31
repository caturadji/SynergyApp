import React from "react";
import { palette } from '../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import { useLikeContext } from '../context';

const HeartShape = (props) => {
    const { id, isDetail } = props;
    const { likedTalent, updateLike } = useLikeContext();

    return (
        <AntDesign 
            name={likedTalent.includes(id) ? 'heart' : 'hearto'}
            size={isDetail ? 25 : 20}
            color={likedTalent.includes(id) ? palette.accent : palette.neutral}
            onPress={() => updateLike(id)}
        />
    )
}

HeartShape.propTypes = {
    id: PropTypes.number.isRequired,
    isDetail: PropTypes.bool
}

export default HeartShape;