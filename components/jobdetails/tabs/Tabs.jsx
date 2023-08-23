import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'

const TabButton = ({ onhandleSerchType, activeTab, name }) => (
	<TouchableOpacity
		style={styles.btn(name, activeTab)}
		onPress={onhandleSerchType}
	>
		<Text style={styles.btnText(name, activeTab)}>{name}</Text>
	</TouchableOpacity>
)

const Tabs = ({ setActiveTab, activeTab, tabs }) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={tabs}
				renderItem={({ item }) => (
					<TabButton
						name={item}
						activeTab={activeTab}
						onhandleSerchType={() => setActiveTab(item)}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item}
				contentContainerStyle={{ columnGap: SIZES.small / 2 }}
			/>
		</View>
	)
}

export default Tabs
