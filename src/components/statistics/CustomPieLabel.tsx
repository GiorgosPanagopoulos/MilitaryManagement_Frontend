import React from "react";

type CustomLabelProps = {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    percent?: number;
    index?: number;
    name?: string;
};

const RADIAN = Math.PI / 180;

const CustomPieLabel: React.FC<CustomLabelProps & { name: string }> = ({
                                                                           cx = 0,
                                                                           cy = 0,
                                                                           midAngle = 0,
                                                                           innerRadius = 0,
                                                                           outerRadius = 0,
                                                                           name,
                                                                       }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const isDarkMode = document.documentElement.classList.contains("dark");
    const fill = isDarkMode ? "#ffffff" : "#000000";

    return (
        <text
            x={x}
            y={y}
            fill={fill}
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            fontSize="12"
            fontWeight="bold"
        >
            {name}
        </text>
    );
};

export default CustomPieLabel;
