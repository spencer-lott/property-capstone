import { Route, Routes } from "react-router-dom"
import { PropertyList } from "../properties/PropertiesList"
import { PropertiesForm } from "../properties/PropertyForm"
import { PropertyDetails } from "../properties/PropertyDetails"
import { PropertyEdit } from "../properties/PropertyEdit"

export const ApplicationViews = () => {
    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)

    return(
        <Routes>
        <Route path="/" element={"wassup"} />
        <Route path="/properties" element={ <PropertyList />} />
        <Route path="/properties/:id" element={ <PropertyDetails /> } />
        <Route path="/properties/add" element={ <PropertiesForm />} />
        <Route path="/properties/edit/:propertyId" element={ <PropertyEdit />} />

        </Routes>
    )
}