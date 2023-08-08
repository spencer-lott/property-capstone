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
    
    const addressOrNoAddress = () => {
        if (!tenant?.property) {
            return "N/A"
        } else {
            return tenant?.property?.streetAddress
    }}

    return (
        <tbody>
            <tr>
                <td> <Link to={`/users/tenants/${tenant.id}`}>{tenant.lastName}, {tenant.firstName}</Link></td>
                <td> {phone} </td>
                <td> {tenant.email}</td>
                <td> {addressOrNoAddress()}</td>
               
            </tr>
        </tbody>
    )
}