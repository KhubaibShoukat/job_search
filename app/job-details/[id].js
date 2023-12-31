import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	ActivityIndicatorBase,
	RefreshControl,
	ActivityIndicator,
} from 'react-native'

import { Stack, useRouter, useSearchParams } from 'expo-router'

import { useCallback, useState } from 'react'

import {
	Company,
	JobAbout,
	JobFooter,
	JobTabs,
	ScreenHeaderBtn,
	Specifics,
} from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '../../hook/useFetch'

const JobDetails = () => {
	const params = useSearchParams()
	const router = useRouter()

	const { data, isLoading, error, refetch } = useFetch('job-details', {
		job_id: params.id,
	})

	const tabs = ['About', 'Qualification', 'Responsibilities']
	const [refreshing, setRefreshing] = useState(false)
	const [activeTab, setActiveTab] = useState(tabs[0])

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		refetch()
		setRefreshing(false)
	})

	const displatTabContent = () => {
		switch (activeTab) {
			case 'Qualification':
				return (
					<Specifics
						title='Qualification'
						points={data[0].job_highlights?.Qualifications ?? ['N/A']}
					/>
				)
			case 'About':
				return <JobAbout info={data[0].job_description ?? 'No Data Provided'} />
			case 'Responsibilities':
				return (
					<Specifics
						title='Responsibilities'
						points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
					/>
				)

			default:
				break
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerBackVisible: false,
					headerTitle: '',
					headerLeft: () => (
						<ScreenHeaderBtn
							iconUrl={icons.left}
							dimension='60%'
							handlePress={() => router.back()}
						/>
					),
					headerRight: () => (
						<ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
					),
				}}
			/>
			<>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					{isLoading ? (
						<ActivityIndicator size='large' colors={COLORS.primary} />
					) : error ? (
						<Text>Something went Wrong</Text>
					) : data.length === 0 ? (
						<Text>No Data</Text>
					) : (
						<View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
							<Company
								companyLogo={data[0].employer_logo}
								jobTitle={data[0].job_title}
								companyName={data[0].employer_name}
								location={data[0].job_country}
							/>
							<JobTabs
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>
							{displatTabContent()}
						</View>
					)}
				</ScrollView>
				<JobFooter
					url={
						data[0]?.job_google_link ??
						'https://careers.google.com/jobs/results'
					}
				/>
			</>
		</SafeAreaView>
	)
}

export default JobDetails
