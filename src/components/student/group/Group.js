import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import GroupCard from "../../shared-components/GroupCard";
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import GroupCardSkeleton from "../../shared-components/GroupCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserGroup } from "../../../redux/actions/groupActions";
import GroupAddModal from "./GroupAddModal";

const Group = () => {

    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const groupList = useSelector((state) => state.group.userGroups);
    const currentAuthState = useSelector((state) => state.authentication);

    const {isLoading, data, error} = useQuery({
        queryKey: ['userGroups'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/user/group/user/enrolled');
            const list = res?.data;
            dispatch(fetchUserGroup(list));
            return res?.data;
        }
    });

    //for add modal
    const [show, setShow] = useState(false);

    return (
        <>
        <GroupAddModal show={show} setShow={setShow} currentAuthState={currentAuthState}/>
        <div className="page-title-box">
            <div className="row align-items-center">
                <div className="col-sm-12">
                    <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item active">Groups</li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="row">
            {/* <div className="col-lg-12">
                <button className="btn btn-sm btn-primary float-right mb-2" onClick={() => setShow(true)}><FontAwesomeIcon icon={faCirclePlus} className={'mr-1'} /> Create New Group</button>
            </div> */}
            
            {
                isLoading ? (
                    Array.apply(null, { length: 6 }).map((e, i) => (
                        <div className="col-lg-3" key={i}>
                            <GroupCardSkeleton/>
                        </div>
                      ))
                ): (
                    Object.keys(groupList).length < 1 ? (
                        <>
                            {/* <div className="col-lg-4">
                                <div className="card m-b-30">
                                    <div className="card-body" style={{ padding: '0' }}>
                                        <div className="group_detail_wrapper">
                                            <div className="group_logo_holder">
                                                <img src={thumbnail} className="rounded-circle" alt="group logo" />
                                            </div>
                                            <div className="group_detail_holder">
                                                <h6>{id}</h6>
                                                <h5>{name}</h5>
                                                <p>{description}</p>

                                                <div className="view-detail-wrapper">
                                                    <Link to={`/${currentAuthState.user.role.toLowerCase()}/group/${id}`}>
                                                        <span className="view-detail-text">View Detail</span>
                                                    </Link>
                                                    <Link to={`/${currentAuthState.user.role.toLowerCase()}/group/${id}`}>
                                                        <button className="circular-button">
                                                            <FontAwesomeIcon icon={faArrowRight} size="xl" />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </>
                    ):(
                        <>
                        {
                            groupList.map((grp) => {
                                return (
                                    <div className="col-lg-4" key={grp.id}>
                                        <GroupCard group={grp} currentAuthState={currentAuthState}/>
                                    </div>
                                ) 
                            })
                        }
                            <div className="col-lg-4">
                                <div className="card m-b-30">
                                    <div className="card-body">
                                        <div className="group_add_section">

                                            <div className="group_add_button" onClick={() => setShow(true)}>
                                                <FontAwesomeIcon icon={faCirclePlus} size="5x"/>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                )
            }
        </div>
        </>
    )
}

export default Group;