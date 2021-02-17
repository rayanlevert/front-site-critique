export default function roleToString(roleName) {
    switch (roleName) {
        case "ROLE_ADMIN":
            return "Administrateur";
        
        case "ROLE_USER":
            return "Utilisateur";
    }
}