import { AgCharts } from 'ag-charts-react';
import { useEffect, useState } from 'react';

const LoanInterestChart = ({ loan, interest }) => {

    const [options, setOptions] = useState({
        data: [
            { asset: "Loan", amount: parseInt(loan) },
            { asset: "Interest", amount: parseInt(interest) },
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
    
    useEffect(() => {
      setOptions({
        data: [
            { asset: "Loan", amount: parseFloat(loan) },
            { asset: "Interest", amount: parseFloat(interest) },
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
    }, [loan, interest]);  

    return (
        <>
         <AgCharts options={options} style={{ height: '100%', width: '100%' }} />
        </>
    );
}

export default LoanInterestChart;