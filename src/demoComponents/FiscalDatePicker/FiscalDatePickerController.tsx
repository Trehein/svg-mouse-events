import React from 'react'
import { calcFirstDayOfFiscalYear, isFiscalYear53Weeks } from './dateUtils'

const FiscalDatePickerController: React.FC = () => {
    console.log(isFiscalYear53Weeks(2012))
    console.log('2013', isFiscalYear53Weeks(2013))
    console.log('2017', isFiscalYear53Weeks(2017))

    console.log(calcFirstDayOfFiscalYear(2013))


    return (
        <div>

        </div>
    )
}

export default FiscalDatePickerController

