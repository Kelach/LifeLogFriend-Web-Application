import { useParams, Link } from "react-router-dom"
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";
import { useEffect, useState } from "react";
import ApiClient from "../../../services/apiClient";
import "./ResourceDetailsPage.css";
export default function ResourceDetailsPage({ resourceType, isAuthenticated }) {
    const params = useParams();
    const [resourceEntry, setResourceEntry] = useState({});

    // useEffect(() => {
    //     const fetchResourceById = async () => {
    //         // fetch data
    //         const {data, success, statusCode, error }  = 
    //             await ApiClient.fetchEntryById(resourceType, params[`${resourceType}Id`]);
    //         if (success){
    //             const {name, createdAt, id, userId, ...props} = data
    //             // update entry with name, timestamp
    //             // and remaining properties (e.g. category, quantity)
    //             setResourceEntry({
    //                 name: name,
    //                 createdAt: createdAt,
    //                 entryProperties: props
    //             })
    //         } else{
    //             console.log("unable to set resource, ", resourceType,"by id. error ", error)
    //         }
    //     }
    //     fetchResourceById();
    // }, [])
    return (
        <div className="resource-entry-container">
            <div className="resource-entry-content box-shadow">

                <div className="entry-header-container">
                    <h1>Name here</h1>
                    <p>timestamp here</p>
                </div>
                <div className="entry-details-container">
                    <div className="entry-details-row">
                        <p>Key</p>
                        <p>Value</p>
                    </div>

                    {/* USE MAPPING INSTEAD */}
                    <div className="entry-details-row">
                        <p>Key</p>
                        <p>Value</p>
                    </div>
                    <div className="entry-details-row">
                        <p>Key</p>
                        <p>Value</p>
                    </div>
                    {/* {Object.keys(resourceEntry.entryProperties).map((entry, index) => {
                    
                })} */}
                </div>
            </div>
            <Link to={`/${resourceType}`}>
            <button className="btn-outline-large go-back-btn">Go Back</button>
            </Link>
        </div>
    )
    /**
     * @TODO 
     * - get product if user is verified, otherwise show unauth display
     * - display product
     * - 
     */
    return (
        <>
        </>
    )
}