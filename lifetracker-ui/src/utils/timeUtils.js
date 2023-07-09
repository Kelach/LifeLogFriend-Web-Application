export const getTimeFromTimestamp = (timestamp) => {
    const dateString = new Date(timestamp).toLocaleString().split(",")
    const isToday = dateString[0] === (new Date()).toLocaleString().split(",")[0]
    const formattedTime = isToday ? "Today at " + dateString[1]: dateString[0]
    return formattedTime
}