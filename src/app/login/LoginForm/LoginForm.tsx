"use client"

import { authenticate } from "@/utils/actions/auth/actions";
import styles from "./loginForm.module.css"
import { useFormState } from "react-dom";

const  LoginForm = () => {
    const [state,formAction] = useFormState(authenticate,undefined)

    return (
        <div className={styles.container}>
            <form className={styles.form} action={formAction} >
                <h1>Login</h1>
                <input type="text" placeholder="username" 
                    id="username"      name="username" required/>
                <input type="password"
                    placeholder="password" id="password"  name="password" required/>
                <button>Login</button>
                {state && state}
            </form>   
        </div>
    )
};

export default LoginForm;