import { useState, useEffect } from 'react'
import axios from 'axios'
// import { RAPID_API_KEY } from '@env'

// const rapidApiKey = RAPID_API_KEY

const useFetch = (endpoint, query) => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true) // Set initial loading state to true
	const [error, setError] = useState(null)
	const options = {
		method: 'GET',
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		headers: {
			'X-RapidAPI-Key': 'b5e98a5237msh3d63cd4555911f7p1bd646jsn95ada7f1140c',
			'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
		},
		params: { ...query },
	}

	const fetchData = async () => {
		try {
			const response = await axios.request(options)
			setData(response.data.data)
			setError(null) // Clear previous errors
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false) // Set loading to false after request completion
		}
	}

	useEffect(() => {
		fetchData()
	}, []) // Include query as a dependency to re-fetch when it changes

	const refetch = () => {
		setIsLoading(true)
		fetchData()
	}

	return { data, isLoading, error, refetch }
}

export default useFetch
