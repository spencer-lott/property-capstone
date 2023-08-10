import { Route, Routes } from "react-router-dom"
import { PropertyList } from "../properties/PropertiesList"
import { PropertyDetails } from "../properties/PropertyDetails"
import { PropertiesForm } from "../properties/PropertyForm"
import { PropertyEdit } from "../properties/PropertyEdit"
import { AssignTenantEdit } from "../properties/AssignTenantEdit"
import { MaintenanceHistoryForm } from "../maintenanceHistory/MaintenanceHistoryForm"
import { MaintenanceHistoryEdit } from "../maintenanceHistory/MaintenanceHistoryEdit"
import { UserProfilesList } from "../userProfiles/UserProfilesList"
import { NewUserForm } from "../userProfiles/NewUserForm"
import { EmployeeEdit } from "../userProfiles/EmployeeEdit"
import { TenantEdit } from "../userProfiles/TenantEdit"
import { TenantsList } from "../tenants/TenantsList"
import { TenantDetails } from "../tenants/TenantDetails"
import { AllRequestsList } from "../maintenanceHistory/AllRequestsList"


import { EmployeeViews } from "./EmployeeViews"
import { TenantViews } from "./TenantViews"

export const ApplicationViews = () => {
    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)

    // if (PMUserObject.isEmployee === true){
    //     return <EmployeeViews />
    // } else {
    //     return <TenantViews />
    // }
    return(
        <Routes>
        {/* Home/Landing Page */}
        <Route path="/" element={"Welcome to Property Manager"} />

        {/* Properties & Maintenance History*/}
        <Route path="/properties" element={ <PropertyList />} />
        <Route path="/properties/:id" element={ <PropertyDetails /> } />
        <Route path="/properties/add" element={ <PropertiesForm />} />
        <Route path="/properties/edit/:propertyId" element={ <PropertyEdit />} />
        <Route path="/properties/assign-tenant/:propertyId" element={ <AssignTenantEdit />} />
        <Route path="/maintenance-history/add/:propertyId" element={ <MaintenanceHistoryForm />} />
        <Route path="/maintenance-history/edit/:noteId/:mhpropertyId" element={ <MaintenanceHistoryEdit />} />

        {/* User Profiles */}
        <Route path="/users" element={<UserProfilesList />} />
        <Route path="/users/add" element={<NewUserForm />} />
        <Route path="/users/employee-edit/:userId" element={<EmployeeEdit />} />
        <Route path="/users/tenant-edit/:userId" element={<TenantEdit />} />
        <Route path="/users/tenants" element={ <TenantsList />} />
        <Route path="/users/tenants/:id" element={ <TenantDetails /> } />

        {/*Requests*/}
        <Route path="/requests" element={<AllRequestsList />} />

        </Routes>
    )

}