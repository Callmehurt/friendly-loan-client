import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Fuse from 'fuse.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

const LoansTable = ({loanData}) => {
    
    //search text state
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    //search functionality
    const fuse = new Fuse(loanData, { keys: ['reference', 'group.name'] });
    const filteredData = searchText ? fuse.search(searchText).map((result) => result.item) : loanData;

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
            name: 'Principal',
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
                row.status === 'active' || row.status === 'completed' ? (
                    <>{moment(row.loanStartDate).format('LL')} / {moment(row.loanEndDate).format('LL')}</>
                ): ''
            ),
            sortable: true,
        },
        {
            name: 'Requested By',
            cell: row => (
                row.user.fullname
            ),
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <Link to={`/admin/loan/manage/${row.reference}`}><button className='submit_button mb-2'>View</button></Link>
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

export default LoansTable;