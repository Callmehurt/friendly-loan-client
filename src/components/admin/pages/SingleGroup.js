import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroup, setGroupMembers } from "../../../redux/actions/groupActions";
import '../../../styles/member-card.css'
import MemberCard from "../../shared-components/MemberCard";
import { useEffect, useState } from "react";
import MemberSearchModal from "../../shared-components/MemberSearchModal";
import Payment from '../../shared-components/Payment';
import CountUp from 'react-countup';
import Fuse from "fuse.js";
import moment from "moment";

import hero1 from '../../../images/hero1.png'
import hero2 from '../../../images/hero2.png'
import hero3 from '../../../images/hero3.png'

const SingleGroup = () => {

    const {groupId} = useParams();

    const [search, setSearch] = useState('');

    //search result for contributors
    const [searchResult, setSearchResult] = useState([]);

    const groupStates = useSelector((state) => state.group);

    // document.title = "Friendly Loan || " + groupStates?.currentGroup?.name.toString()

    //axios private
    const axiosPrivate = useAxiosPrivate();

    const {refetch} = useQuery({
        queryKey: ['groupMembers'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/user/group/${groupId}/members`);
            const list = await res.data;  
            dispatch(setCurrentGroup(list.group));
            dispatch(setGroupMembers(list.members));  
            return list;
        }
    });


    const {data: currentMonthContribution, refetch: currentContributionRefetech} = useQuery({
        queryKey: ['currentContribution'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/contribution/user/month/contribution/${groupId}`);
            return await res.data;
        }
    })

    //contributions with members total contribution
    let memberContributions = 0;

    //for group member search modal
    const [show, setShow] = useState(false);

    useEffect(() => {

        const clearPage = () => {
            dispatch(setCurrentGroup({}));
            dispatch(setGroupMembers([]));        
        }
        return clearPage;
    }, [dispatch])

    useEffect(() =>{
        const options = {
          includeScore: true,
          // Search in `author` and in `tags` array
          keys: ['user.fullname']
        }
        const fuse = new Fuse(searchResult, options)
        const result = fuse.search(search);
        search ? setSearchResult(result.map((data) => data.item)) : setSearchResult(calculateTotalAmountPerUser(groupStates?.currentGroup?.contributions?.length > 0 ? groupStates?.currentGroup?.contributions : []));
    }, [search, groupStates?.currentGroup?.contributions]);

    function calculateTotalAmountPerUser(contributions) {
        const userTotals = [];
      
        for (const contribution of contributions) {
          const userId = contribution.userId;
          const amount = parseFloat(contribution.amount); // Parse amount to a number
      
          const existingUserIndex = userTotals.findIndex(userTotal => userTotal.user.id === userId);

            if (existingUserIndex === -1) {
                // User not found yet, add new object with details and total
                userTotals.push({ user: contribution.user, totalAmount: amount });
            } else {
                // User already exists, update total amount
                userTotals[existingUserIndex].totalAmount += amount;
            }
        }
        return userTotals;
    }

    const returnContributorList = (contributors) => {
        return contributors.map((cntrb) => {
            return (
                <div className="sm_contributor_info_li" key={cntrb.user.id}>
                    <div className="sm_contributor_info">
                        <div className="avatar_wrapper">
                            <img src={cntrb.user.profile} alt="" />
                        </div>
                        <div className="con_info">
                            <p>{cntrb.user.fullname}</p>
                            <p><CountUp start={0} end={cntrb.totalAmount} decimals={2} prefix="£ "/></p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    if(groupStates?.currentGroup && groupStates?.currentGroup.contributions?.length > 0){ 
        memberContributions = groupStates?.currentGroup?.contributions.reduce((total, contribution) => {
            return total+parseFloat(contribution.amount);
        }, 0);
    }

    useEffect(() => {
        if(groupStates?.currentGroup && groupStates?.currentGroup.contributions?.length > 0){ 
            setSearchResult(calculateTotalAmountPerUser(groupStates?.currentGroup.contributions));
        }
        currentContributionRefetech();
    }, [groupStates.currentGroup, currentContributionRefetech])

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
           <div className="col-lg-4">
            <div className="card">
                <div className="card-body">
                    <div className="single_group_section">
                        <div className="top_section">
                            <div className="group_logo_holder">
                                <img src={groupStates?.currentGroup?.thumbnail} className="rounded-circle" alt="group logo" />
                            </div>
                            <div className="info_holder">
                                <h6>{groupStates?.currentGroup?.id}</h6>
                                <h5>{groupStates?.currentGroup?.name}</h5>
                                <button onClick={() => setShow(true)}>Add Member</button>
                            </div>
                        </div>
                        <div className="group_desc">
                            <p>{groupStates?.currentGroup?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h6 style={{ fontSize: '17px', fontWeight: '600', marginLeft: '10px' }}>Contributions</h6>
                    <div className="p-2">
                    <input type="search"
                               className={'form-control form-control-sm'}
                               placeholder={'Search..'}
                               value={search}
                               onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div class="bg-white p-2">
                    <ul class="list-group">
                        {
                            searchResult.length > 0 ? (
                            returnContributorList(searchResult)
                            ): <span className="text-danger">No Contributions made yet !</span>
                        }
                        </ul>
                    </div>
                </div>
            </div>
           </div>
           <div className="col-lg-8">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card_wrapper d-flex justify-content-between">
                                <div className="card_info">
                                    <p><CountUp start={0} end={groupStates?.groupMembers.length} decimals={0}/></p>
                                    <p>Active Members</p>
                                </div>
                                <div className="card_icon">
                                    <img src={hero1} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card_wrapper d-flex justify-content-between">
                                <div className="card_info">
                                    <p><CountUp start={0} end={memberContributions} decimals={2} prefix="£ "/></p>
                                    <p>Contributions</p>
                                </div>
                                <div className="card_icon">
                                    <img src={hero2} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card_wrapper d-flex justify-content-between">
                                <div className="card_info">
                                    <p><CountUp start={0} end={memberContributions} decimals={2} prefix="£ "/></p>
                                    <p>Interests</p>
                                </div>
                                <div className="card_icon">
                                    <img src={hero3} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h6 style={{ fontSize: '17px', fontWeight: '600', marginLeft: '15px' }}>Contribution</h6>
                            <div className="student_contribution">
                                {
                                    currentMonthContribution ? (
                                        <div className="p-2 m-2">
                                            <span>Contributed Amount: <strong className="text-success"><CountUp start={0} end={currentMonthContribution.amount} decimals={2} prefix="£ "/></strong></span><br/>
                                            <span>Contributed Date: <strong>{moment(currentMonthContribution.createdAt).format('LLL')}</strong></span>
                                        </div>
                                    ): (
                                        <div>
                                            <Payment refetch={refetch}/>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                        <h6 style={{ fontSize: '17px', fontWeight: '600', marginLeft: '15px' }}>Loan Information</h6>

                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <h6 style={{ fontSize: '17px', fontWeight: '600', marginLeft: '15px', marginBottom: '15px' }}>Group Members</h6>
                    <div className="member_list_section">
                    {
                        Object.keys(groupStates?.groupMembers).length < 1 ? (
                            <>
                                <h1>No Group Members</h1>
                            </>
                        ):(
                            groupStates?.groupMembers.map((member) => {
                                return (
                                    <div key={member.id}>
                                        <MemberCard member={member?.user}/>
                                    </div>
                                ) 
                            })
                        )
                    }
                    </div>
                </div>
            </div>
           </div>
        </div>
        </>
    )
}

export default SingleGroup;