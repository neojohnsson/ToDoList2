import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';
import './css/SignIn.css';

function SignIn() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    const navigate = useNavigate();


    async function handleSignIn(e: React.FormEvent) {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if ( error ) {
            throw new Error(error.message)
        } else {
            navigate("/List")
        }
    }

    async function signUp() {
        const { error } = await supabase.auth.signUp({ email, password });

        if ( error ) {
            throw new Error(error.message)
        } else {
            navigate("/List")
        }
    }

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSignIn}>
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <div className="signin-actions">
                        <button type="submit">Sign In</button>
                        <button type="button" onClick={signUp}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;