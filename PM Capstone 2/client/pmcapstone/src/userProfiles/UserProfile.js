export const UserProfile = ({ user }) => {
    const userType = () => {
        if (user.isAdmin === false && user.isEmployee === false)
            return <td>Tenant</td>
        else if (user.isEmployee === true && user.isAdmin === true) {
            return <td>Admin</td>
        }
        else if (user.isEmployee === true) {
            return <td>Employee</td>
        }
        else {
            return <td>N/A</td>
        }
    }

    return (
        <tbody>
            <tr>
                <td> {user.email} </td>
                {userType()}
            </tr>
        </tbody>
    )

}