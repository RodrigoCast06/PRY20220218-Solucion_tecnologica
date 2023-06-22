
import { FC } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

type Props = {
    name: string,
    pv: number,
    uv: number,
    amt: number,
}

const dataMock = [
    {
        name: 'Page A',
        pv: 2400,
        uv: 4000,
        amt: 2400,
    },
    {
        name: 'Page B',
        pv: 1398,
        uv: 3000,
        amt: 2210,
    },
    {
        name: 'Page C',
        pv: 9800,
        uv: 2000,
        amt: 2290,
    },
    {
        name: 'Page D',
        pv: 3908,
        uv: 2780,
        amt: 2000,
    },
    {
        name: 'Page E',
        pv: 4800,
        uv: 1890,
        amt: 2181,
    },
    {
        name: 'Page F',
        pv: 3800,
        uv: 2390,
        amt: 2500,
    },
    {
        name: 'Page G',
        pv: 4300,
        uv: 3490,
        amt: 2100,
    },
];

const CGraphicsBarChart: FC<{ data: Props[] }> = ({ data = dataMock }) => {
    return <BarChart
        width={1400}
        height={500}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="jugador_amateur" fill="#4372C4" />
        <Bar dataKey="jugador_elite" fill="#ED7D32" />
    </BarChart>
}

export default CGraphicsBarChart