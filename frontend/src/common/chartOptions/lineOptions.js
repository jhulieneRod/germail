import { formatFloatPtBr } from '../useful/useful';

const lineOptions = {

    responsive: true,
    maintainAspectRatio: false,
    
    layout: {
        padding: {
            left: 10,
            right: 50,
            top: 0,
            bottom: 10
        }
    },
    plugins: {
        legend: {
            display: false,           
        },
        datalabels: {
            display: true,
            color: '#333',
            anchor: 'end',
            align: 'right',
            formatter: ((value, context) => formatFloatPtBr(value))
        }
    }
}

export default lineOptions;