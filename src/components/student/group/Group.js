import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import GroupCard from "../../shared-components/GroupCard";
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import GroupCardSkeleton from "../../shared-components/GroupCardSkeleton";

const Group = () => {

    const axiosPrivate = useAxiosPrivate();

    const {isLoading, data, error, refetch} = useQuery({
        queryKey: ['userGroups'],
        queryFn: async () => {
            console.log('ok');
            const res = await axiosPrivate.get('/user/group/user/enrolled');
            return res?.data;
        }
    });

    const handleRefetch = () => {
        refetch();
    }

    return (
        <>
        <div className="page-title-box">
            <div className="row align-items-center">
                <div className="col-sm-12">
                    <ol className="breadcrumb float-right">
                        <li className="breadcrumb-item active">Groups</li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-lg-12">
                <button className="btn btn-sm btn-primary float-right mb-2" onClick={() => handleRefetch()}><FontAwesomeIcon icon={faCirclePlus} className={'mr-1'} /> Create New Group</button>
            </div>
            
            {
                isLoading ? (
                    <div className="col-lg-3">
                        <GroupCardSkeleton/>
                    </div>
                ): (
                    Object.keys(data).length < 1 ? (
                        <>
                            <h1>No media</h1>
                        </>
                    ):(
                        data.map((grp) => {
                            return <GroupCard group={grp}/> 
                        })
                    )
                )
                // data.map((grp) => {
                //     return (
                //         <div className="col-lg-3">
                //             <GroupCard/>
                //         </div>
                //     )
                // })
            }
        </div>
        </>
    )
}

export default Group;