import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";
export default function ExercisePage({ isAuthenticated, check }) {
    return (
        isAuthenticated ?
            (<>
            <h1>Exercise</h1>
            <h1>Exercise</h1>
            <h1>Exercise</h1>
            <h1>Exercise</h1>
            </>) :
            (<ForbiddenPage />)
    )
}