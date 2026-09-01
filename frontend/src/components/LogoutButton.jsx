import { useAuth0 } from '@auth0/auth0-react'; 

export default function LogoutButton() {
    const { logout } = useAuth0(); 
    return ( 
        <button onClick={() => logout({ 
            logoutParams: { 
                returnTo: window.location.origin } })} 
                    className="rounded-full bg-slate-700 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-600" > 
                        Log Out
        </button> );
}