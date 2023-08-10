import { Route, Routes } from "react-router-dom"
import { MyHome } from "../tenantPortal/MyHome"
import { MyProfile } from "../tenantPortal/MyProfile"
import { MyRequests } from "../tenantPortal/MyRequests"
import { MyProfileEdit } from "../tenantPortal/MyProfileEdit"

export const TenantViews = () => {
    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)

    return(
        <>
        <Routes>
        <Route path="/" element={<MyHome />} />
        <Route path={`/my-profile/${PMUserObject.id}`} element={<MyProfile />} />
        <Route path={`/my-profile/edit/${PMUserObject.id}`} element={<MyProfileEdit />} />
        <Route path={`/my-requests/${PMUserObject.id}`} element={<MyRequests />} />

        </Routes>
        </>
    )
}