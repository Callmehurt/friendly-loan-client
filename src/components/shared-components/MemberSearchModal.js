import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDebounce } from "use-debounce";


const MemberSearchModal = ({show, setShow}) => {

    const axiosPrivate = useAxiosPrivate();

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

                {
                    data ? (
                        data.map((user) => {
                            return <h5>{user.fullname}</h5>
                        })
                    ): ''
                }
            </Modal.Body>
            <Modal.Footer>
                <button className={'btn btn-sm btn-danger'} onClick={() => setShow(false)}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default MemberSearchModal;