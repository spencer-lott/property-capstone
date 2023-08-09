import { EmployeeViews } from "./EmployeeViews"
import { TenantViews } from "./TenantViews"

export const ApplicationViews = () => {
    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)

    if (PMUserObject.isEmployee === true){
        return <EmployeeViews />
    } else {
        return <TenantViews />
    }

}