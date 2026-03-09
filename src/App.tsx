import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import supabase from './utils/supabase'
import type { Session } from '@supabase/supabase-js'
import { AuthContext } from "./components/context/AuthContext.tsx"
import SignIn from './components/SignIn.tsx'
import List from './components/List.tsx'

function App() {

  // En ToDo lista där man kan "Lägga till", "Ta bort" och "Sortera listan"
  // Det kommer att vara en Login page först, där behöver vi en component
  // En component för ToDoListan

  const [ session, setSession ] = useState<Session | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ role, setRole ] = useState('user');

  useEffect(() => {
    supabase.auth.getSession().then(({ data : { session } }) => {
      setSession(session);
      if ( session ) {
        supabase.from("profiles").select("role").eq("id", session.user.id).single().then(({data}) => { if (data) setRole(data.role); });
      }
      setLoading(false)
    })
  }, [])

  if (loading) return null;
  

  return (
    <AuthContext.Provider value={{ role, userId: session?.user.id ?? ''}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ session ? <Navigate to="/list" replace /> : <SignIn /> } />
          <Route path="/list" element={ session ?  <List/> : <Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ AuthContext.Provider>
  )
}

export default App
