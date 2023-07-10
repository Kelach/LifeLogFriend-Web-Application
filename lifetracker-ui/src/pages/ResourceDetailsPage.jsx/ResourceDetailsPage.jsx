import { useParams, Link } from "react-router-dom"
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";
import { useEffect, useState } from "react";
import ApiClient from "../../../services/apiClient";
import { getTimeFromTimestamp } from "../../utils/timeUtils.js"
import "./ResourceDetailsPage.css";
export default function ResourceDetailsPage({ resourceType, isAuthenticated }) {
    const params = useParams();
    const [hasPermission, setHasPermission] = useState(true)
    const [resourceEntry, setResourceEntry] = useState({
        name: "",
        createdAt: "0",
        entryProperties: {}
    });

    useEffect(() => {
        const fetchResourceById = async () => {
            // fetch data
            const {data, success, statusCode, error }  = 
                await ApiClient.fetchEntryById(resourceType, params[`${resourceType}Id`]);
                console.log("retrieved data: ", data)
            if (success){
                const {name, createdAt, id, userId, ...props} = data[resourceType] // destructuring id,userId to prevent it from being displayed
                // update entry with name, timestamp
                // and remaining properties (e.g. category, quantity)
                setResourceEntry({
                    name: name,
                    createdAt: createdAt,
                    entryProperties: props
                });
            } else{
                if (statusCode == 401){
                    setHasPermission(false);
                }else{
                    console.log("unable to set resource, ", resourceType," by id. error ", error)
                }
            }
        }
        fetchResourceById();
    }, [])

   return hasPermission ? (
        
        <div className="resource-entry-container">
            <div className="resource-entry-content box-shadow">

                <div className="entry-header-container">
                    <h1>{resourceEntry.name}</h1>
                    <p>Created: {getTimeFromTimestamp(resourceEntry.createdAt)}</p>
                </div>
                <div className="entry-details-container">
                    {Object.keys(resourceEntry.entryProperties).map((entryProp, index) => {
                        return (
                    <div key={entryProp} className="entry-details-row light-text-hover">
                        <p>{entryProp}:</p>
                        <p>{resourceEntry.entryProperties[entryProp]}</p>
                    </div>
                        ) 
                    })}
                </div>
            </div>
            <Link to={`/${resourceType}`}>
            <button className="btn-outline-large go-back-btn">Go Back</button>
            </Link>
        </div>
    ) : (
        <ForbiddenPage noPermission={true} />
    )
}