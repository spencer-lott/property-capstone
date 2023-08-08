import { Route, Routes } from "react-router-dom"
import { PropertyList } from "../properties/PropertiesList"
import { PropertiesForm } from "../properties/PropertyForm"
import { PropertyDetails } from "../properties/PropertyDetails"
import { PropertyEdit } from "../properties/PropertyEdit"
import { MaintenanceHistoryForm } from "../maintenanceHistory/MaintenanceHistoryForm"
import { MaintenanceHistoryEdit } from "../maintenanceHistory/MaintenanceHistoryEdit"
import { UserProfilesList } from "../userProfiles/UserProfilesList"
import { NewEmployeeForm } from "../userProfiles/NewEmployeeForm"
import { UserProfileEdit } from "../userProfiles/UserProfileEdit"
import { TenantsList } from "../tenants/TenantsList"
import { TenantDetails } from "../tenants/TenantDetails"
import { NewTenantForm } from "../userProfiles/NewTenantForm"
import { NewUserForm } from "../userProfiles/NewUserForm"

export const ApplicationViews = () => {
    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)

    return(
        <Routes>
        {/* Home/Landing Page */}
        <Route path="/" element={"wassup"} />

        {/* Properties & Maintenance History*/}
        <Route path="/properties" element={ <PropertyList />} />
        <Route path="/properties/:id" element={ <PropertyDetails /> } />
        <Route path="/properties/add" element={ <PropertiesForm />} />
        <Route path="/properties/edit/:propertyId" element={ <PropertyEdit />} />
        <Route path="/maintenance-history/add/:propertyId" element={ <MaintenanceHistoryForm />} />
        <Route path="/maintenance-history/edit/:noteId/:mhpropertyId" element={ <MaintenanceHistoryEdit />} />

        {/* User Profiles */}
        <Route path="/users" element={<UserProfilesList />} />
        {/* <Route path="/users/add-employee" element={<NewEmployeeForm />} />
        <Route path="/users/add-tenant" element={<NewTenantForm />} /> */}
        <Route path="/users/add" element={<NewUserForm />} />
        <Route path="/users/edit/:userId" element={<UserProfileEdit />} />

        {/* Tenants */}
        {/* <Route path="/tenants" element={ <TenantsList />} />
        <Route path="/tenants/:id" element={ <TenantDetails /> } /> */}


        </Routes>
    )
}