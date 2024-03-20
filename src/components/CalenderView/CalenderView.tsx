import React, { useState } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import styles from './CalenderView.style'
import { format, isSameDay, parseISO } from 'date-fns'

interface CalendarViewProps {
	onDatesSelected: (dates: Date[]) => void
}

const CalendarView = ({ onDatesSelected }: CalendarViewProps) => {
	const [selectedDates, setSelectedDates] = useState<Date[]>([])

    const handleDayPress = (day: any) => {
        const selectedDate = parseISO(day.dateString);
        setSelectedDates((prevDates) => {
          const isSelected = prevDates.some((date) => isSameDay(date, selectedDate));
          return isSelected
            ? prevDates.filter((date) => !isSameDay(date, selectedDate))
            : [...prevDates, selectedDate];
        });
        onDatesSelected(selectedDates);
      }

	const getMarkedDates = (
		dates: Date[]
	): { [key: string]: { selected: true; selectedColor: string } } => {
		let markedDates: {
			[key: string]: { selected: true; selectedColor: string }
		} = {}
		dates.forEach((date) => {
			let dateString = format(date, 'yyyy-MM-dd');
			markedDates[dateString] = { selected: true, selectedColor: '#2FD0AF' }
		})
		return markedDates
	}

	return (
		<View style={styles.container}>
			<Calendar
				onDayPress={handleDayPress}
				markedDates={getMarkedDates(selectedDates)}
			/>
		</View>
	)
}

export default CalendarView
