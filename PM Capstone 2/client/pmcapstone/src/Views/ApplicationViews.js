import { Route, Routes } from "react-router-dom"
import { PropertyList } from "../properties/PropertiesList"
import { PropertiesForm } from "../properties/PropertyForm"
import { PropertyDetails } from "../properties/PropertyDetails"
import { PropertyEdit } from "../properties/PropertyEdit"
import { MaintenanceHistoryForm } from "../maintenanceHistory/MaintenanceHistoryForm"
import { MaintenanceHistoryEdit } from "../maintenanceHistory/MaintenanceHistoryEdit"
import { UserProfilesList } from "../userProfiles/UserProfilesList"
import { UserProfileEdit } from "../userProfiles/UserProfileEdit"
import { TenantsList } from "../tenants/TenantsList"
import { TenantDetails } from "../tenants/TenantDetails"
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
        <Route path="/users/add" element={<NewUserForm />} />
        <Route path="/users/edit/:userId" element={<UserProfileEdit />} />
        <Route path="/users/tenants" element={ <TenantsList />} />
        <Route path="/users/tenants/:id" element={ <TenantDetails /> } />



        </Routes>
    )
}