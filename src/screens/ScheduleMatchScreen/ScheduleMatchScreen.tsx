import React, { useState } from 'react'
import { Text, View } from 'react-native'
import styles from './ScheduleMatchScreen.style'
import CalendarView from '../../components/CalenderView/CalenderView'

interface ScheduleMatchScreenProps {
	navigation: any
}

const ScheduleMatchScreen = ({ navigation }: ScheduleMatchScreenProps) => {
	const [selectedDates, setSelectedDates] = useState<Date[]>([])

	const handleDatesSelected = (dates: Date[]) => {
		setSelectedDates(dates)
	}
    
	return (
		<View style={styles.container}>
			<CalendarView onDatesSelected={handleDatesSelected} />
		</View>
	)
}

export default ScheduleMatchScreen
