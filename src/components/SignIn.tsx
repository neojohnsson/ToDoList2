import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../utils/supabase';
import '../App.css';

function SignIn() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    const navigate = useNavigate();


    async function handleSignIn(e: React.FormEvent) {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({ email, password});

        if ( error ) {
            throw new Error(error.message)
        } else {
            navigate("/List")
        }
    }

    async function handleSignOut() {
        
    }

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <button type="submit">Sign In</button>
                <button type="button" onClick={handleSignOut}>Sign Out</button>
            </form>
        </div>
    );
}

export default SignIn;