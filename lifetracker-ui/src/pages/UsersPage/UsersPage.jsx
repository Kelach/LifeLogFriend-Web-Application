import "./UsersPage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiClient from "../../../services/apiClient";
import { getTimeFromTimestamp } from "../../utils/timeUtils.js";

function UserTableRow({ user, isFollowing, handleUserFollowClick }) {
    
    return (
        <div className="user-row light-text-hover">
            <div className="user-details">
                <span>{user.firstName} {user.lastName}</span>
                <span>{getTimeFromTimestamp(user.createdAt)}</span>
            </div>
            <button title={"Follow " + user.firstName} onClick={(event) => handleUserFollowClick(event, user.email)} className={"follow-btn btn-outline-small" + (isFollowing ? " following" : "")} >
                <span className="material-icons">{isFollowing ? "how_to_reg" : "person_add"}</span>
            </button>
        </div>
    )

}

export default function UsersPage({ user }) {

    const [users, setUsers] = useState([]);
    const [userFollowing, setUserFollowing] = useState(new Set());
    const [inputValue, setInputValue] = useState("");

    const handleUserFollowClick = async (event, otherUserId) => {
        event.preventDefault();
        // function toggles between unfollowing and folowing users  
        console.log("other id on button press: ", otherUserId);
        console.log(userFollowing.has(otherUserId), userFollowing)
        if (userFollowing.has(otherUserId)){
            // update state first
            const prevFollowing = userFollowing
            userFollowing.delete(otherUserId);
            const newFollowing = new Set(userFollowing)
            setUserFollowing(newFollowing); 

            // then update following in db
            const {data, success, statusCode} = await ApiClient.unfollowUser(otherUserId);
            if (success){
                console.log("successfully unfollowed user: ", otherUserId);
                // removing user from set
            }else{
                console.log("unable to unfollow user with id: ", otherUserId);
                setUserFollowing(prevFollowing); 

            }
        }else{
            // update state first
            const prevFollowing = userFollowing
            userFollowing.add(otherUserId);
            const newFollowing = new Set(userFollowing)
            setUserFollowing(newFollowing); 

            // then update following in db
            const {data, success, statusCode} = await ApiClient.followUser(otherUserId)
            if (success){

                console.log("successfully folowed user with id: ", otherUserId)
            }else{
                console.log("unable to follow user with id: ", otherUserId);
                setUserFollowing(prevFollowing); 

            }

        }

    }

    useEffect(() => {
        // first fetch all users
        ApiClient.fetchAllUsers().then((response) => {
            if (response.success){
                console.log("users fetched: ", response);
                setUsers(response.data.users);
            } else{
                console.log("recieved error repsonse while trying to fetch all users: ", response);
            }
        }).catch((error) => {
            console.log("error caught while fetching for all users: ", error);
        })

        // then fetch following for given user
        ApiClient.fetchFollowing().then((response) => {
            if (response.success){
                console.log("user following fetched: ", response);
                setUserFollowing(new Set(response.data.following));
            } else{
                console.log("recieved error repsonse while trying to fetch user following: ", response);
            }
        }).catch((error) => {
            console.log("error caught while fetching user following: ", error);
        })
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
                            <UserTableRow handleUserFollowClick={handleUserFollowClick} user={user} isFollowing={userFollowing.has(user.email)} />
                        )
                    }) : (
                        <h1>No Users Found...</h1>
                    )}
                </div>
            </div>
        </>
    )
}