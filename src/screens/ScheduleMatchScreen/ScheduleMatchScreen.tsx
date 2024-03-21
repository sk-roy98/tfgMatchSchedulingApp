import React, { useState } from 'react'
import { Text, Touchable, TouchableOpacity, View } from 'react-native'
import styles from './ScheduleMatchScreen.style'
import CalendarView from '../../components/CalenderView/CalenderView'
import { FlatList } from 'react-native-gesture-handler'
import TimeSlotInput from '../../components/TimeSlot/TimeSlot'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MatchSlot } from '../../utils/types'
import { addMatchSlot } from '../../store/slices/MatchSlice'
import { isSameDay } from 'date-fns'

interface ScheduleMatchScreenProps {
	navigation: any
}

const ScheduleMatchScreen = ({ navigation }: ScheduleMatchScreenProps) => {
	const dispatch = useDispatch()
	const schedule = useSelector((state: RootState) => state.match.schedule)
	const [action, setAction] = useState<string>('selectDate')
	const [selectedDates, setSelectedDates] = useState<Date[]>([])

	const handleActionSelected = (newAction: string) => {
		setAction(newAction)
		retrieveData()
	}

	const retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem('matchSchedule')
			if (value !== null) {
				console.log(value, 'async')
			}
		} catch (error) {
			console.error(error)
		}
	}

	

	console.log(selectedDates, 'main component')

	const handleDatesSelected = (dates: Date[]) => {
		setSelectedDates(dates)
	}

	const saveSchedule = async (schedule: MatchSlot[]) => {
		try {
			await AsyncStorage.setItem('matchSchedule', JSON.stringify(schedule))
		} catch (error) {
			console.error('Failed to save schedule:', error)
		}
	}

	const handleTimeSlotAdded = async (timeSlot: MatchSlot) => {
		const newSchedule = [...schedule, timeSlot]
		dispatch(addMatchSlot(timeSlot))
		await saveSchedule(newSchedule)
	}

	return (
		<View style={styles.container}>
			<View style={styles.actionContainer}>
				{action === 'selectDate' && (
					<View>
						<Text style={{ fontSize: 17 }}>Select Dates</Text>
					</View>
				)}
				{action !== 'selectDate' && (
					<TouchableOpacity
						style={styles.actionButton}
						onPress={() => handleActionSelected('selectDate')}
					>
						<Text style={{ fontSize: 16, fontWeight: '500' }}>
							Select Dates
						</Text>
					</TouchableOpacity>
				)}
				{action !== 'dateDone' && (
					<TouchableOpacity
						style={styles.actionButton}
						onPress={() => handleActionSelected('dateDone')}
					>
						<Text style={{ fontSize: 16, fontWeight: '500' }}>Done</Text>
					</TouchableOpacity>
				)}
			</View>
			{action === 'selectDate' && (
				<View style={styles.calenderContainer}>
					<CalendarView onDatesSelected={handleDatesSelected} />
				</View>
			)}

			{action === 'dateDone' && (
				<View style={styles.timeContainer}>
					<FlatList
						style={{ width: '90%' }}
						contentContainerStyle={{ alignItems: 'stretch', width: '100%' }}
						data={selectedDates}
						renderItem={({ item }) => (
							<TimeSlotInput
								date={item}
								onTimeSlotAdded={handleTimeSlotAdded}
								existingSlots={schedule.filter((slot: MatchSlot) => {
									console.log(slot, 'slot')
									slot.date.toDateString() === item.toDateString()
								})}
								// onTimeSlotComplete={(date) => {
								// 	setSelectedDates((prevDates) =>
								// 		prevDates.filter((d) => !isSameDay(d, date))
								// 	)
								// }}
							/>
						)}
						keyExtractor={(item) => item.toDateString()}
					/>
				</View>
			)}
		</View>
	)
}

export default ScheduleMatchScreen
