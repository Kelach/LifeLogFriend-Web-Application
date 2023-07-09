import "./UsersPage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiClient from "../../../services/apiClient";
import { getTimeFromTimestamp } from "../../utils/timeUtils.js";

function UserTableRow({ user, isFollowing, handleUserFollowClick }) {
    
    return (
        <div className="user-row">
            <div className="user-details">
                <span>{user.firstName} {user.lastName}</span>
                <span>{getTimeFromTimestamp(user.createdAt)}</span>
            </div>
            <button onClick={(event) => handleUserFollowClick(event, user.email)} className={"follow-btn btn-outline-small" + (isFollowing ? " following" : "")} >
                <span className="material-icons">person_add</span>
            </button>
        </div>
    )

}

export default function UsersPage({ user }) {

    const [users, setUsers] = useState([]);
    const [userFollowing, setUserFollowing] = useState({});
    const [inputValue, setInputValue] = useState("");

    const handleUserFollowClick = async (event, otherUserId) => {
        event.preventDefault();
        // function toggles between unfollowing and folowing users  
        console.log("other id on button press: ", otherUserId), event;
        // if (otherUserId in userFollowing){
        //     // unfollows user
        //     const payload = {
        //         key : "follows_id",
        //         value : otherUserId
        //     }
        //     const {data, success, statusCode} = await ApiClient.deleteEntry("following", payload)
        //     if (success){
        //         console.log("successfully unfollowed user: ", user.id)
        //     }else{
        //         console.log("unable to unfollow user: ", user.firstName, " ", user.lastName)
        //     }
        // }else{
        //     // follows user
        //     const payload = {
        //         user_id: user.email,
        //         follows_id : otherUserId
        //     }
        //     const {data, success, statusCode} = await ApiClient.postEntry("following", payload)
        //     if (success){
        //         console.log("successfully folowed user: ", user.id)
        //     }else{
        //         console.log("unable to follow user: ", user.firstName, " ", user.lastName)
        //     }

        // }

    }

    useEffect(() => {
        ApiClient.fetchAllUsers().then((response) => {
            console.log("users fetched: ", response)
            setUsers(response.data.users)
        })
        // console.log("get users here");
    }, []);

    return (
        <>
            <div className="users-container">

                <div className="users-table">
                    <h1 className="light-text-hover">Users<i className="material-icons-outlined">emoji_emotions</i></h1>
                    <div className="user-table-header-row">
                        <span>Name: </span>
                        <span>Joined: </span>
                    </div>
                    { users.length ? users.map((user) => {

                        // const isFollowing = @TODO
                        return (
                            <UserTableRow handleUserFollowClick={handleUserFollowClick} user={user} isFollowing={false} />
                        )
                    }) : (
                        <h1>No Users Found...</h1>
                    )}
                </div>
            </div>
        </>
    )
}