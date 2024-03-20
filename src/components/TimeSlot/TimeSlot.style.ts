import { StyleSheet } from 'react-native'
import { teal } from '../../utils/color'

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		padding: 10,
		backgroundColor: '#fff',
		borderRadius: 5,
		width: '100%',
	},
	dateStr: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	timePickerContainer: {
		marginVertical: 5,
	},
  timeActionButton:{
    width: 160,
    alignItems:'center',
    paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: teal,
  }

})

export default styles
