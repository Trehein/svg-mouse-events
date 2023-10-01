import { PayrollPhaseData } from "./Controller";

export const randomValue = (rangeMin: number, rangeMax: number) => {
    return Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);
  }

export const generatePayrollPhaseData = () => {
    const payrollPhases: string[] = ['recommended', 'scheduled', 'actuals']

    const basePayrollData: PayrollPhaseData = {
        phase: 'phase',
        bopus: randomValue(200, 250),
        fitting: randomValue(60, 80),
        register: randomValue(400, 500),
        restock: randomValue(120, 150),
        signs: randomValue(40, 60),
        trucks: randomValue(60, 80),
        visuals: randomValue(100, 140),
    }

    const returnData: PayrollPhaseData[] = payrollPhases.map((phase: string, index: number) => {
        if(phase === 'recommended' || phase === 'scheduled') {
            return {...basePayrollData, phase: phase}
        } else {
            return {
                phase: phase, 
                bopus: Math.floor(basePayrollData.bopus + basePayrollData.bopus * .05),
                fitting: Math.floor(basePayrollData.fitting + basePayrollData.fitting * -.01),
                register: Math.floor(basePayrollData.register + basePayrollData.register * .03),
                restock: Math.floor(basePayrollData.restock + basePayrollData.restock * -.02),
                signs: Math.floor(basePayrollData.signs + basePayrollData.signs * .01),
                trucks: Math.floor(basePayrollData.trucks + basePayrollData.trucks * -.04),
                visuals: Math.floor(basePayrollData.visuals + basePayrollData.visuals * .02),
            }
        }
    })

    return returnData
}