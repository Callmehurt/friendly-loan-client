import { AgCharts } from 'ag-charts-react';
import { useState } from 'react';

const LoanInterestChart = ({ data }) => {

    const [options, setOptions] = useState({
        data: [
            { asset: "Loan", amount: 60000 },
            { asset: "Interest", amount: 22000 },
          ],
        series: [
          {
            type: "pie",
            angleKey: "amount",
            legendItemKey: "asset",
            fills: ['#50BF8A', '#F36056']
          },
        ],
      });

    return (
        <>
         <AgCharts options={options} style={{ height: '100%', width: '100%' }} />
        </>
    );
}

export default LoanInterestChart;