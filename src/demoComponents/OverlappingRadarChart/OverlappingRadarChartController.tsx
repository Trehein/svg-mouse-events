import React from 'react'
import OverlappingRadarChart from './OverlappingRadarChart'

const OverlappingRadarChartController: React.FC = () => {
    const hoursMin = 1
    const hoursMax = 5
    const dollarsMin = 10000
    const dollarsMax = 50000

    const data = [
        {
            labelKey: 'Scheduled',
            values: [
                {
                    labelText: 'Trucking',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
                {
                    labelText: 'Restocking',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
                {
                    labelText: 'Registers',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
                {
                    labelText: 'OMNI',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
                {
                    labelText: 'Dressing Rooms',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
                {
                    labelText: 'BOPUS',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
            ]
        },
        {
            labelKey: 'Actual ',
            values: [
                {
                    labelText: 'Trucking',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
                {
                    labelText: 'Restocking',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
                {
                    labelText: 'Registers',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
                {
                    labelText: 'OMNI',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
                {
                    labelText: 'Dressing Rooms',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
                {
                    labelText: 'BOPUS',
                    hours: Math.random() * (hoursMax - hoursMin) + hoursMin,
                    dollars: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
                },
            ]
        }
    ]


    return (
        <OverlappingRadarChart 
            height={600}
            width={600}
            data={data}
        />

    )
}

export default OverlappingRadarChartController