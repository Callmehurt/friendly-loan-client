import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDebounce } from "use-debounce";
import FilteredMember from "./FilteredMember";
import { useSelector, useDispatch } from "react-redux";
import { notifyError, notifySuccess } from "../../toast.notification";
import { setGroupMembers } from "../../redux/actions/groupActions";


const MemberSearchModal = ({show, setShow}) => {

    const axiosPrivate = useAxiosPrivate();
    const group = useSelector((state) => state.group);

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

    const { isLoading, error, data } = useQuery({
        queryKey: ['users', debouncedSearchTerm],
        queryFn: async () => {
          const response = await axiosPrivate.get(`/user/search/user?searchParams=${debouncedSearchTerm}`);
          return await response.data;
        },
        staleTime: 0,
    });

    const dispatch = useDispatch();

    const enrollMember = async (id) => {
        try{

            const res = await axiosPrivate.get(`/user/group/${group.currentGroup.id}/add/member/${id}`);
            if(res.status === 200){
                notifySuccess('Member added successfully');
                const newMemberList = [...group.groupMembers, res.data];
                dispatch(setGroupMembers(newMemberList));
            }else{
                notifyError('Something went wrong')
            }

        }catch(err){
            console.log(err);
            notifyError('Something went wrong')
        }
    }

    return (
        <>
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>Search User</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Name or unique identity"
                            autoComplete={'off'}
                            name={'name'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {
                            isLoading ? (
                                <ul className="parsley-errors-list filled">
                                    <li>Searching...</li>
                                </ul>
                            ): ''
                        }
                    </div>
                </form>

                <div style={{ maxHeight: '70vh'}}>
                {
                    data ? (
                        data.map((user) => {
                            return (
                                <div key={user.id}>
                                    <FilteredMember details={user} enrollMember={enrollMember}/>
                                </div>
                            )
                        })
                    ): ''
                }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className={'btn btn-sm btn-danger'} onClick={() => setShow(false)} style={{ fontSize: '14px' }}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default MemberSearchModal;