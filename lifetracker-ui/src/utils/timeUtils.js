export const getTimeFromTimestamp = (timestamp) => {
    // converts date time string into prettier string
    const dateString = new Date(timestamp).toLocaleString().split(",")
    const isToday = dateString[0] === (new Date()).toLocaleString().split(",")[0]
    const formattedTime = isToday ? "Today at " + dateString[1]: dateString[0]
    return formattedTime
}
export const fetchMinutes = (stringTime) => {
    // converts "12:01" => time in seconds
    let [hours, minutes] = stringTime.split(":");
    return parseInt(hours)*parseInt(minutes)
}