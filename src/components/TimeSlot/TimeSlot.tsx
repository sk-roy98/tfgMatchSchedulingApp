import React, { useState } from 'react'
import { View, Button, Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './TimeSlot.style'
import { MatchSlot } from '../../utils/types'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface TimeSlotInputProps {
	date: Date
	onTimeSlotAdded: (timeSlot: MatchSlot) => void
	existingSlots: MatchSlot[]
	// onTimeSlotComplete: (date: Date) => void
}

const TimeSlotInput = ({
	date,
	onTimeSlotAdded,
	existingSlots,
}: // onTimeSlotComplete,
TimeSlotInputProps) => {
	const [showStartTimePicker, setShowStartTimePicker] = useState(false)
	const [showEndTimePicker, setShowEndTimePicker] = useState(false)
	const [startTime, setStartTime] = useState(new Date())
	const [endTime, setEndTime] = useState(new Date())

	console.log(startTime, 'startTime', startTime.toISOString())
	const handleStartTimeChange = (
		event: any,
		selectedTime: Date | undefined
	) => {
		setShowStartTimePicker(false)
		if (selectedTime) {
			const newStartTime = new Date(date)
			newStartTime.setHours(selectedTime.getHours())
			newStartTime.setMinutes(selectedTime.getMinutes())
			setStartTime(newStartTime)
		}
	}

	const handleEndTimeChange = (event: any, selectedTime: Date | undefined) => {
		setShowEndTimePicker(false)
		if (selectedTime) {
			const newEndTime = new Date(date)
			newEndTime.setHours(selectedTime.getHours())
			newEndTime.setMinutes(selectedTime.getMinutes())
			setEndTime(newEndTime)
		}
	}

	const handleAddTimeSlot = () => {
		const newSlot: MatchSlot = {
			id: Date.now().toString(),
			date,
			startTime,
			endTime,
		}

		const overlappingSlot = existingSlots.find(
			(slot) =>
				(slot.startTime.getTime() >= startTime.getTime() &&
					slot.startTime.getTime() < endTime.getTime()) ||
				(slot.endTime.getTime() > startTime.getTime() &&
					slot.endTime.getTime() <= endTime.getTime())
		)
		console.log(newSlot.startTime.toISOString())
		if (overlappingSlot) {
			console.log(overlappingSlot, 'overlap')
			alert('time slot overlaps with an existing slot')
		} else {
			onTimeSlotAdded(newSlot)
			// onTimeSlotComplete(date)
			setStartTime(new Date())
			setEndTime(new Date())
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.dateStr}>{date.toDateString()}</Text>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<View style={styles.timePickerContainer}>
					<TouchableOpacity
						style={[styles.timeActionButton]}
						onPress={() => setShowStartTimePicker(true)}
					>
						<Text>Start Time</Text>
					</TouchableOpacity>
					{showStartTimePicker && (
						<DateTimePicker
							value={startTime}
							mode='time'
							is24Hour={true}
							display='default'
							onChange={handleStartTimeChange}
						/>
					)}
				</View>
				<View style={styles.timePickerContainer}>
					<TouchableOpacity
						style={[styles.timeActionButton]}
						onPress={() => setShowEndTimePicker(true)}
					>
						<Text>End Time</Text>
					</TouchableOpacity>
					{showEndTimePicker && (
						<DateTimePicker
							value={endTime}
							mode='time'
							is24Hour={true}
							display='default'
							onChange={handleEndTimeChange}
						/>
					)}
				</View>
			</View>

			<TouchableOpacity
				style={[styles.timeActionButton, { width: '100%' }]}
				onPress={handleAddTimeSlot}
			>
				<Text>Add Time Slot</Text>
			</TouchableOpacity>
		</View>
	)
}

export default TimeSlotInput
