import React from "react";
import { useSelector } from "react-redux";
import { PieChart,Pie,Tooltip,BarChart,XAxis,YAxis,Legend,CartesianGrid,Bar } from "recharts";

export function PokemonCharts() {
    const data = [];
    const state = useSelector((state) => state.api);

    for (var key in state.data) {
        let breed = state.data[key].breeds[0].id;

        // Находим индекс объекта с определенным значением свойства
        let index = data.findIndex((item) => item.name === breed);

        // Проверяем, существует ли в массиве объект с указанным значением свойства
        if (index === -1) {
            data.push({ name: breed, users: 1 });
        } else {
            let users_count = data[index].users + 1;
            data[index] = { name: breed, users: users_count };
        }
    }

    return (
        <>
        <div style={{ textAlign: "center" }}>
            <div className="charts">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="users"
                        isAnimationActive={false}
                        data={data}
                        cx={200}
                        cy={200}
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                </PieChart>

                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 80,
                        bottom: 5,
                    }}
                    barSize={20}
                    >
                    <XAxis
                        dataKey="name"
                        scale="point"
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
                </BarChart>
            </div>
        </div>
        </>
    )
    
}