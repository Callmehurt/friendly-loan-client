import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Fuse from 'fuse.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { notifySuccess } from '../../../toast.notification';
import { Link } from 'react-router-dom';

const GuarantorRequest = ({guarantorRequests, fetchLoanGuarantorData}) => {

    console.log('Guarantor Requests', guarantorRequests);

    const axiosPrivate = useAxiosPrivate();


    const manageGuarantorRequest = async (id, decision) => {        
        try{
            const response = await axiosPrivate.post('/loan/manage/guarantor/request', {
                id,
                decision
            });
            if(response.status === 200){
                notifySuccess(response?.data.message);
                fetchLoanGuarantorData();
            }
        }catch(err){
            console.log('Error managing guarantor request', err);
        }
    }
    
    //search text state
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    //search functionality
    const fuse = new Fuse(guarantorRequests, { keys: ['loan.user.fullname', 'loan.reference', 'loan.group.name'] });
    const filteredData = searchText ? fuse.search(searchText).map((result) => result.item) : guarantorRequests;

    //datatable columns 
    const columns = [
        {
            name: 'Reference',
            selector: row => row.loan.reference,
            sortable: true,
        },
        {
            name: 'Group',
            selector: row => row.loan.group.name,
            sortable: true,
        },
        {
            name: 'Principle',
            cell: row => (
                <span>£ {row.loan.principalAmount}</span>
            ),
            sortable: true,
        },
        {
            name: 'Interest',
            cell: row => (
                <span>{row.loan.interestRate}%</span>
            ),
            sortable: true,
        },
        {
            name: 'Status',
            cell: row => (
                row.status
            ),
            sortable: true,
        },
        {
            name: 'Requested By',
            cell: row => (
                row.loan.user.fullname
            ),
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                row.status === 'requested' ? (
                    <>
                    <button className='submit_button' style={{ backgroundColor: 'green', width: '32rem', marginRight: '8px' }} onClick={() => manageGuarantorRequest(row.id, 'approved')}>Approve</button>
                    <button className='submit_button' style={{ backgroundColor: 'red', width: '25rem', marginRight: '8px' }} onClick={() => manageGuarantorRequest(row.id, 'rejected')}>Reject</button>
                    <Link to={`/student/loan/${row.loan.reference}`} style={{ width: '20rem' }}><button className='submit_button'>View</button></Link>
                    </>
                ): 
                (
                    <>
                    <button className='submit_button' style={{ backgroundColor: 'green', width: '32rem', marginRight: '8px' }}>{row.status}</button>
                    <Link to={`/student/loan/${row.loan.reference}`} style={{ width: '20rem' }}><button className='submit_button'>View</button></Link>
                    </>
                )
            ),
            sortable: true,
        },
    ];

    //datatable page navigation icons
    const nextIcon = <FontAwesomeIcon icon={faArrowRight} />;
    const prevIcon = <FontAwesomeIcon icon={faArrowLeft} />;

    //header custom style
    const customStyles = {
        headCells: {
          style: {
              background: '#5B6AF1',
              fontSize: '14px',
              fontWeight: '400',
              textTransform: 'capitalize',
              color: 'white'
          }
        },
    }

    return (
        <div>
            <DataTable
                title={'Loan Guarantor Requests'}
                columns={columns}
                data={filteredData}
                pagination={true}
                paginationPerPage={50}
                paginationRowsPerPageOptions={[50, 100, 150]}
                paginationIconNext={nextIcon}
                paginationIconPrevious={prevIcon}
                responsive={true}
                striped={true}
                highlightOnHover={true}
                pointerOnHover={true}
                persistTableHead={true}
                fixedHeader={true}
                subHeader={true}
                subHeaderComponent={
                <div className="dataTables_filter">
                    <label>
                        <input type="search"
                               className={'form-control form-control-sm'}
                               placeholder={'Search..'}
                               value={searchText}
                               onChange={handleSearch}
                        />
                    </label>
                </div>
                }
                subHeaderAlign={'right'}
                customStyles={customStyles}
            />
        </div>
    );
};

export default GuarantorRequest;