import { useParams } from "react-router-dom"



const SingleGroup = () => {

    const {groupId} = useParams();

    return (
        <>
        <h5>{groupId}</h5>
        </>
    )
}

export default SingleGroup;