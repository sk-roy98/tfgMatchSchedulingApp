import { StyleSheet } from 'react-native'
import { teal } from '../../utils/color'

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	actionContainer: {
		paddingVertical: 20,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems:'center',
	},
	calenderContainer: {
		flex: 1,
	},
	actionButton: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: teal,
	},
	timeContainer: {
		width: '100%',
		alignItems: 'center',
		flex: 1,
		paddingVertical: 20,
	},
})

export default styles
