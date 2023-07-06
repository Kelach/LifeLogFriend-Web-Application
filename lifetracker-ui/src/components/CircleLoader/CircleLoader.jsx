import "./CircleLoader.css"
export default function CircleLoader({ showLoading, isFailure, isSuccess }) {
    // Shows circle loading by default, then error or success
    // load based on props but NOT BOTH.   
    const showFailureLoader = isFailure && !isSuccess; // renders true, if isFailure is true and isSuccess is false
    const showSuccessLoader = !isFailure && isSuccess;
    const showLoaderModal = showLoading || isFailure || isSuccess;
    console.log(showLoading)
    return (
        <div className={"circle-loader-container box-shadow" + ( showLoaderModal ? " show" : "")}>
            <div className={"circle-loader"
                + (showFailureLoader ? " show load-error" : "")
                + (showSuccessLoader ? " show load-complete" : "")}>
                <div className={"checkmark" + (showFailureLoader ? " error" : "") + (showSuccessLoader ? " draw" : "")}></div>
            </div>
        </div>
    )
}