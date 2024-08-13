import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Fuse from 'fuse.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const GuarantorRequest = ({guarantorRequests}) => {
    
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
                    <button className='submit_button' style={{ backgroundColor: 'green', width: '32rem', marginRight: '8px' }}>Approve</button>
                    <button className='submit_button' style={{ backgroundColor: 'red', width: '25rem', marginRight: '8px' }}>Reject</button>
                    <button className='submit_button' style={{ width: '20rem' }}>View</button>
                    </>
                ): 
                (
                    <>
                    <button className='submit_button'>{row.status}</button>
                    <button className='submit_button'>View</button>
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