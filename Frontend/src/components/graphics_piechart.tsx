
import { FC } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';


type Props = {
    name: string,
    value: number,
}

const dataMock = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const CGraphicsPieChart: FC<{ data: Props[] }> = ({ data = dataMock }) => {
    return <PieChart width={1000} height={500}>
        <Pie
            dataKey="value"
            data={data}
            cx={750}
            cy={200}
            outerRadius={180}
            fill="#8884d8"
            label
        />
        <Tooltip />
    </PieChart>
}

export default CGraphicsPieChart