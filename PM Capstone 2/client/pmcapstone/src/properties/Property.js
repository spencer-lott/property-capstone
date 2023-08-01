import React from "react"
import { Link } from "react-router-dom"

export const Property = ({ property }) => {
    const isVacant = () => {
        if (property.vacant === false){
            return <td>N</td>
        }
        else return <td>Y</td>
    }
    return (
        <tbody>
            <tr>
                <td><Link to={`/properties/${property.id}`}> {property.streetAddress} </Link></td>
                <td> {property.city}, {property.state} </td>
                <td> {property.type} </td>
                <td> {property.sizeDescription}</td>
                <td> ${property.rent} </td>
                {isVacant()}
            </tr>
        </tbody>
    )
}