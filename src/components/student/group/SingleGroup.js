import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroup, setGroupMembers } from "../../../redux/actions/groupActions";
import '../../../styles/member-card.css'
import MemberCard from "../../shared-components/MemberCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCardClip, faTags, faUsersLine, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MemberSearchModal from "../../shared-components/MemberSearchModal";


const SingleGroup = () => {

    const {groupId} = useParams();
    const dispatch = useDispatch();

    const groupStates = useSelector((state) => state.group);

    //axios private
    const axiosPrivate = useAxiosPrivate();

    const {isLoading, data, error} = useQuery({
        queryKey: ['groupMembers'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/user/group/${groupId}/members`);
            const list = await res.data;  
            document.title = "Friendly Loan || " + list.group.name.toString()  
            dispatch(setCurrentGroup(list.group));
            dispatch(setGroupMembers(list.members));        
            return list;
        }
    });

    //for group member search modal
    const [show, setShow] = useState(false);



    useEffect(() => {

        const clearPage = () => {
            dispatch(setCurrentGroup({}));
            dispatch(setGroupMembers([]));        
        }
        return clearPage;
    }, [dispatch])

    return (
        <>
        <MemberSearchModal show={show} setShow={setShow}/>
        <div className="page-title-box">
            <div className="row align-items-center">
                <div className="col-sm-12">
                    <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item active">Group || <strong>{groupStates.currentGroup?.name}</strong></li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-8">
                <div className="member-container">
                    {
                        Object.keys(groupStates?.groupMembers).length < 1 ? (
                            <>
                                <h1>No Group Members</h1>
                            </>
                        ):(
                            groupStates?.groupMembers.map((member) => {
                                return (
                                    <MemberCard member={member?.user}/>
                                ) 
                            })
                        )
                    }
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <div className="group-info">
                            <button className="btn btn-primary d-flex align-items-center float-right" title="Add New Member" onClick={() => setShow(true)}>
                            <FontAwesomeIcon icon={faUserPlus} className={'mr-1'} />
                            </button>
                            <h6><FontAwesomeIcon icon={faTags} className={'mr-1'} /> Group ID: {groupStates?.currentGroup?.id}</h6>
                            <h6><FontAwesomeIcon icon={faIdCardClip} className={'mr-1'} />Name: {groupStates?.currentGroup?.name}</h6>
                            <h6><FontAwesomeIcon icon={faUsersLine} className={'mr-1'} />Members: {groupStates?.groupMembers.length}</h6>
                            <h6>{groupStates?.currentGroup?.description}</h6>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h5>Contributions</h5>
                    </div>
                    <div className="card-body">
                        <div className="">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SingleGroup;