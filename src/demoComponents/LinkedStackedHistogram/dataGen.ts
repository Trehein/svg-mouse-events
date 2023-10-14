import { PayrollPhaseData } from "./Controller";

export const randomValue = (rangeMin: number, rangeMax: number) => {
    return Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);
  }

export const generatePayrollPhaseData = () => {
    const payrollPhases: string[] = ['recommended', 'scheduled', 'actuals']

    const basePayrollData: PayrollPhaseData = {
        phase: 'phase',
        bopus: randomValue(150, 450),
        fitting: randomValue(50, 150),
        register: randomValue(500, 800),
        restock: randomValue(120, 250),
        signs: randomValue(40, 150),
        trucks: randomValue(220, 450),
        visuals: randomValue(100, 300),
    }

    // const returnData: PayrollPhaseData[] = payrollPhases.map((phase: string, index: number) => {
    //     if(phase === 'recommended' || phase === 'scheduled') {
    //         return {...basePayrollData, phase: phase}
    //     } 
    //     // for randomizing actuals
    //     // else {
    //     //     return {
    //     //         phase: phase, 
    //     //         bopus: Math.floor(basePayrollData.bopus + basePayrollData.bopus * (.35 + (index * .15))),
    //     //         fitting: Math.floor(basePayrollData.fitting + basePayrollData.fitting * (-.05 + (index * .15))),
    //     //         register: Math.floor(basePayrollData.register + basePayrollData.register * (.13 + (index * .15))),
    //     //         restock: Math.floor(basePayrollData.restock + basePayrollData.restock * (-.22 + (index * .15))),
    //     //         signs: Math.floor(basePayrollData.signs + basePayrollData.signs * (.1 + (index * .15))),
    //     //         trucks: Math.floor(basePayrollData.trucks + basePayrollData.trucks * (-.14 + (index * .15))),
    //     //         visuals: Math.floor(basePayrollData.visuals + basePayrollData.visuals * (.12 + (index * .15))),
    //     //     }
    //     // }
    // })

    const returnData: PayrollPhaseData[] = payrollPhases.filter((phase: string) => {
        return (phase === 'recommended' || phase === 'scheduled')}).map((phase: string, index: number) => {
            return {...basePayrollData, phase: phase, bopus: basePayrollData.bopus + (150 * index)}
        })
        
    return returnData
}