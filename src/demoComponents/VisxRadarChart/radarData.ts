export const radarData = () => {
    const hoursMin = 10
    const hoursMax = 25
    const dollarsMin = 10000
    const dollarsMax = 50000

    return [
        {
            labelText: 'Trucking',
            hoursActual: Math.random() * (hoursMax - hoursMin) + hoursMin,
            hoursScheduled: Math.random() * (hoursMax - hoursMin) + hoursMin,
            dollarsActual: Math.random() * (dollarsMax - dollarsMin) + dollarsMin,
            dollarsScheduled: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
        },
        {
            labelText: 'Restocking',
            hoursActual: Math.random() * (hoursMax - hoursMin) + hoursMin,
            hoursScheduled: Math.random() * (hoursMax - hoursMin) + hoursMin,
            dollarsActual: Math.random() * (dollarsMax - dollarsMin) + dollarsMin,
            dollarsScheduled: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
        },
        {
            labelText: 'Registers',
            hoursActual: Math.random() * (hoursMax - hoursMin) + hoursMin,
            hoursScheduled: Math.random() * (hoursMax - hoursMin) + hoursMin,
            dollarsActual: Math.random() * (dollarsMax - dollarsMin) + dollarsMin,
            dollarsScheduled: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
        },
        {
            labelText: 'OMNI',
            hoursActual: Math.random() * (hoursMax - hoursMin) + hoursMin,
            hoursScheduled: Math.random() * (hoursMax - hoursMin) + hoursMin,
            dollarsActual: Math.random() * (dollarsMax - dollarsMin) + dollarsMin,
            dollarsScheduled: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
        },
        {
            labelText: 'Dressing Rooms',
            hoursActual: Math.random() * (hoursMax - hoursMin) + hoursMin,
            hoursScheduled: Math.random() * (hoursMax - hoursMin) + hoursMin,
            dollarsActual: Math.random() * (dollarsMax - dollarsMin) + dollarsMin,
            dollarsScheduled: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
        },
        {
            labelText: 'BOPUS',
            hoursActual: Math.random() * (hoursMax - hoursMin) + hoursMin,
            hoursScheduled: Math.random() * (hoursMax - hoursMin) + hoursMin,
            dollarsActual: Math.random() * (dollarsMax - dollarsMin) + dollarsMin,
            dollarsScheduled: Math.random() * (dollarsMax - dollarsMin) + dollarsMin
        }
    ]

}
