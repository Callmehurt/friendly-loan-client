import { useState } from "react";
import Fuse from 'fuse.js'
import FilteredMember from "../../shared-components/FilteredMember";
import { Modal } from "react-bootstrap";
import MemberListCard from "./MemberListCard";


const GuarantorModal = ({groupMembers, show, setShow, updateGuarantor, guarantors}) => {

    //search text state
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {        
        setSearchText(e.target.value);
    };

    //search functionality
    const fuse = new Fuse(groupMembers, { keys: ['user.fullname'] });
    const filteredData = searchText ? fuse.search(searchText).map((result) => result.item) : groupMembers;

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
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>
                </form>

                <div style={{ maxHeight: '70vh'}}>
                {
                    filteredData ? (
                        filteredData.map((member) => {
                            return (
                                <div key={member.user.id}>
                                    {member.user.fullname}
                                    <MemberListCard details={member.user} updateGuarantor={updateGuarantor} guarantors={guarantors} />
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

export default GuarantorModal;