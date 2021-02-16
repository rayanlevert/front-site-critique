export default function Role( { roles }) {

    function roleToString(roleName) {
        switch (roleName) {
            case "ROLE_ADMIN":
                return "Administrateur";
            
            case "ROLE_USER":
                return "Utilisateur";
        }
    }

    return (
        <>
            { roles !== undefined && roles.map((role, index) => <div key={index}><em>{roleToString(role.name)}</em><br /></div>)}
        </>
    );
}