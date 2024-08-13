import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Fuse from 'fuse.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const LoanHistory = ({loanHistory}) => {
    
    //search text state
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    //search functionality
    const fuse = new Fuse(loanHistory, { keys: ['name'] });
    const filteredData = searchText ? fuse.search(searchText).map((result) => result.item) : loanHistory;

    //datatable columns 
    const columns = [
        {
            name: 'Reference',
            selector: row => row.reference,
            sortable: true,
        },
        {
            name: 'Group',
            selector: row => row.group.name,
            sortable: true,
        },
        {
            name: 'Principle',
            cell: row => (
                <span>£ {row.principalAmount}</span>
            ),
            sortable: true,
        },
        {
            name: 'Interest',
            cell: row => (
                <span>{row.interestRate}%</span>
            ),
            sortable: true,
        },
        {
            name: 'Start/End Date',
            cell: row => (
                row.status == 'active' ? row.loanEndDate : row.loanStartDate
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
            name: 'Action',
            cell: row => (
                <button className='submit_button'>View</button>
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
                title={'Loan History'}
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

export default LoanHistory;