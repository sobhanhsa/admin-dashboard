import styles from "@/app/ui/login/loginPage.module.css";
import { authenticate } from "../../utils/actions/auth/actions";
import LoginForm from "./LoginForm/LoginForm";

const LoginPage  = () => {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    )
};

export default LoginPage;