import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {

    const { loginWithRedirect } = useAuth0();

    return (
        <button onClick={() => 
            loginWithRedirect()} className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500" > Log In </button>
    );
}