import roleToString from "../Role/roleToString";

export default function Role( { roles, role }) {

    return (
        <>
            { roles !== undefined && roles.map((role, index) => <div key={index}><em>{roleToString(role.name)}</em><br /></div>)}
        </>
    );
}