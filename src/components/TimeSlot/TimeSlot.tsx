import React, { useState } from 'react';
import { View} from 'react-native';
import styles from './TimeSlot.style';

interface TimeSlotProps {
  date: Date;
}
const TimeSlotInput = ({
  date,
}: TimeSlotProps) => {

  return (
    <View style={styles.container}>

    </View>
  );
};

export default TimeSlotInput;