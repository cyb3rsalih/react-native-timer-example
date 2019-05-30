/* HomeScreen Functions */
export const DURATION = 1000 // For ios, not changeable
// Wait times between vibrates.
// If passed with true it will be a loop -> 1,2,3,1,2,3
export const PATTERN = [1000,2000,3000] 

// Take number add 0 into, 3 > 03 , 10 > 010 and by slice get last 2 digits
export const formatNumber = (number) => `0${number}`.slice(-2)

export const getRemaining = (time) => {
	const minutes = Math.floor( time/60 )
	const seconds = Math.floor( time - minutes * 60 )
	return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
}

export const createArray = length => {
	const arr = []
	let i = 0;

	while(i < length){
		arr.push(i.toString())
		i += 1
	}

	return arr
}

export const AVAILABLE_MINUTES = createArray(10)
export const AVAILABLE_SECONDS = createArray(60)
/* End of HomeScreen Functions */