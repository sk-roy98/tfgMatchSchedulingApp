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
}

const TimeSlotInput = ({
	date,
	onTimeSlotAdded,
	existingSlots,
}: TimeSlotInputProps) => {
	const [showStartTimePicker, setShowStartTimePicker] = useState(false)
	const [showEndTimePicker, setShowEndTimePicker] = useState(false)
	const [startTime, setStartTime] = useState(new Date())
	const [endTime, setEndTime] = useState(new Date())

	const handleStartTimeChange = (
		event: any,
		selectedDate: Date | undefined
	) => {
    console.log()
		setShowStartTimePicker(false)
		if (selectedDate) {
			setStartTime(selectedDate)
		}
	}

	const handleEndTimeChange = (event: any, selectedDate: Date | undefined) => {
		setShowEndTimePicker(false)
		if (selectedDate) {
			setEndTime(selectedDate)
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
				(slot.startTime >= startTime && slot.startTime < endTime) ||
				(slot.endTime > startTime && slot.endTime <= endTime)
		)

		if (overlappingSlot) {
			alert('time slot overlaps with an existing slot')
		} else {
			onTimeSlotAdded(newSlot)
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
