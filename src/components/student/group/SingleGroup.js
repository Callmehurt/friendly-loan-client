import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroup, setGroupMembers } from "../../../redux/actions/groupActions";
import '../../../styles/member-card.css'
import MemberCard from "../../shared-components/MemberCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCardClip, faTags, faUsersLine, faUserPlus, faSterlingSign } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MemberSearchModal from "../../shared-components/MemberSearchModal";
import Payment from '../../shared-components/Payment';
import CountUp from 'react-countup';
import Fuse from "fuse.js";
import moment from "moment";

const SingleGroup = () => {

    const {groupId} = useParams();
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');

    //search result for contributors
    const [searchResult, setSearchResult] = useState([]);

    const groupStates = useSelector((state) => state.group);

    //axios private
    const axiosPrivate = useAxiosPrivate();

    const {refetch} = useQuery({
        queryKey: ['groupMembers'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/user/group/${groupId}/members`);
            const list = await res.data;  
            document.title = "Friendly Loan || " + list.group.name.toString()  
            dispatch(setCurrentGroup(list.group));
            dispatch(setGroupMembers(list.members));  
            console.log('jkhk');      
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
                <li key={cntrb.user.id}
                    class="list-group-item d-flex justify-content-between border-bottom border-zinc-200 dark:border-zinc-700 py-2"
                >
                    <div class="d-flex align-items-center">
                    <div class="bg-zinc-200 dark:bg-zinc-700 w-8 h-8 rounded-circle overflow-hidden">
                        <img src="https://placehold.co/50" alt="Avatar" />
                    </div>
                    <span class="ms-2"><strong>{cntrb.user.fullname}</strong></span>
                    </div>
                    <span><strong><CountUp start={0} end={cntrb.totalAmount} decimals={2} prefix="£ "/></strong></span>
                </li>
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
            <div className="col-lg-8">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-heading p-4">
                                <div className="mini-stat-icon float-right">
                                    <i className="mdi mdi-account-multiple bg-primary text-white"></i>
                                </div>
                                <div>
                                    <h5 className="font-16">Active Members</h5>
                                </div>
                                <h3 className="mt-4"><CountUp start={0} end={groupStates?.groupMembers.length} decimals={0}/></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-heading p-4">
                                <div className="mini-stat-icon float-right">
                                    <i className="mdi mdi-currency-gbp bg-info text-white"></i>
                                </div>
                                <div>
                                    <h5 className="font-16">Contribution Amount</h5>
                                </div>
                                <h3 className="mt-4"><CountUp start={0} end={memberContributions} decimals={2} prefix="£ "/></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-heading p-4">
                                <div className="mini-stat-icon float-right">
                                    <i className="mdi mdi-cash-multiple bg-success text-white"></i>
                                </div>
                                <div>
                                    <h5 className="font-16">Interest Collected</h5>
                                </div>
                                <h3 className="mt-4"><CountUp start={0} end={memberContributions} decimals={2} prefix="£ "/></h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">

                        <div className="card">
                            <div className="card-header">
                                <h6>Contribution this Month</h6>
                            </div>
                            <div className="card-body">
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
                    <div className="col-6">
                        <div className="card">
                            <div className="card-header">
                                <h6>Loan Information</h6>
                            </div>
                            <div className="card-body">
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className="member-container">
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
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <div className="group-info">
                            <button className="btn btn-primary d-flex align-items-center float-right" title="Add New Member" onClick={() => setShow(true)}>
                            <FontAwesomeIcon icon={faUserPlus} className={'mr-1'} />
                            </button>
                            <h6><FontAwesomeIcon icon={faTags} className={'mr-1'} /> Group ID: {groupStates?.currentGroup?.id}</h6>
                            <h6><FontAwesomeIcon icon={faIdCardClip} className={'mr-1'} />Name: {groupStates?.currentGroup?.name}</h6>
                            {/* <h6><FontAwesomeIcon icon={faUsersLine} className={'mr-1'} />Members: {groupStates?.groupMembers.length}</h6>
                            <h6><FontAwesomeIcon icon={faSterlingSign} className={'mr-1'} />Total Contributions: <CountUp start={0} end={memberContributions} decimals={2} prefix="£ "/></h6> */}
                            <h6>{groupStates?.currentGroup?.description}</h6>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h6>Contributions</h6>
                    </div>
                    <div className="card-body">
                    <input type="search"
                               className={'form-control form-control-sm'}
                               placeholder={'Search..'}
                               value={search}
                               onChange={(e) => setSearch(e.target.value)}
                        />
                    <div class="bg-white dark:bg-zinc-800 shadow-lg rounded p-4">
                    <ul class="list-group">
                        {
                            searchResult.length > 0 ? (
                            returnContributorList(searchResult)
                            ): <span className="text-danger">No Contributions made yet !</span>
                        }
                        {/* {
                            groupStates.currentGroup && groupStates.currentGroup.contributions?.length > 0  ? (
                                returnContributorList(calculateTotalAmountPerUser(groupStates.currentGroup.contributions))
                            ): <span className="text-danger">No Contributions made yet !</span>
                        } */}
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SingleGroup;