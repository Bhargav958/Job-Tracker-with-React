import {useState, useEffect} from "react"
import { account } from '../appwrite/config' 
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) { 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        account.get()
            .then(setUser)
            .catch(()=>setUser(null))
            .finally(()=>setLoading(false));
    },[]);

    if(loading) return <p>Loading</p>

    return user? children : <Navigate to='/login' />;
}

export default ProtectedRoute