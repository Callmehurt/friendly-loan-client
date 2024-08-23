import React, {useCallback, useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import GroupCard from "../../shared-components/GroupCard";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import GroupCardSkeleton from "../../shared-components/GroupCardSkeleton";
import { useSelector } from "react-redux";
import GroupAddModal from "../../student/group/GroupAddModal";

const Group = () => {

    const axiosPrivate = useAxiosPrivate();

    const [groupList, setGroupList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentAuthState = useSelector((state) => state.authentication);

    const fetchGroups = useCallback(async () => {
        try{
            const res = await axiosPrivate.get('/user/all/groups');
            setGroupList(res?.data);
        }catch(err){
            console.log('Error fetching groups', err); 
        }finally{
            setIsLoading(false);
        }

    }, [axiosPrivate]);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);
    

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
            
            {
                isLoading ? (
                    Array.apply(null, { length: 6 }).map((e, i) => (
                        <div className="col-lg-4" key={i}>
                            <GroupCardSkeleton/>
                        </div>
                      ))
                ): (
                    Object.keys(groupList).length < 1 ? (
                        <>
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