import { useState } from "react";

function Login({onSubmit}) {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const handleSubmit=(e)=>{

        e.preventDefault()
        if(onSubmit){
        onSubmit({email,password});
        return; //return from here after the test excution
        }

        alert("Form is Submitted")
        setEmail("")
        setPassword("")
    }
    return(
        <div>
            <h1>Login Component</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="test@gmail.com"
                value={email} onChange={(e)=>setEmail(e.target.value)} />

                </div>
                <div>
                    
                    <label htmlFor="password" required>Password</label>
                    <input type="password" id="password" placeholder="password" required
                    value={password} onChange={(e)=>setPassword(e.target.value)} />
    
                    </div>
                    <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
