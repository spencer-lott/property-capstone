import React from "react"
import { Link } from "react-router-dom"

export const Tenant = ({ tenant }) => {

    function formatPhoneNumber(phone) {
        //formatPhoneNumber string and remove all unnecessary characters
        phone = phone.replace(/[^\d]/g, "");
    
        //check if number length equals to 10
        if (phone.length == 10) {
            //reformat and return phone number
            return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        }
    
        return null;
    }
    var phone = tenant.phone;
    phone = formatPhoneNumber(phone); //(123) 456-7890

    //when accessing the tables that are connected with a foreign key, you have to make a method that returns those values in the backend. This one is called GetAllTenantsWithPropertyAndUserProfile
    
    return (
        <tbody>
            <tr>
                <td> <Link to={`/tenants/${tenant.id}`}>{tenant?.userProfile.lastName}, {tenant?.userProfile.firstName}</Link></td>
                <td> {phone} </td>
                <td> {tenant?.userProfile.email}</td>
                <td> {tenant?.property.streetAddress}</td>
               
            </tr>
        </tbody>
    )
}