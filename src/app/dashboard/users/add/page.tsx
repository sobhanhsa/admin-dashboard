import { addUser } from "@/app/lib/actions/user/actions";
import styles from "@/app/ui/dashboard/users/add/addUserPage.module.css";

const AddUserPage = () => {
    return (
        <div className={styles.container}>
            <form  className={styles.form} action={addUser}>
                <input type="text" placeholder="name" name="username" required />
                <input type="email" placeholder="email" name="email" required />
                <input type="password" placeholder="password" name="password" required />
                <input type="phone" placeholder="phone" name="phone"/>
                <select name="isAdmin" id="isAdmin">
                    <option value="false" disabled>Choose a role</option>
                    <option value="true">admin</option>
                    <option value="false" selected>client</option>
                </select>
                <select name="isActive" id="isActive">
                    <option value="false" disabled>is active</option>
                    <option value="true">yes</option>
                    <option value="false" selected>no</option>
                </select>
                
                <textarea
                    name="address"
                    id="desc"
                    rows={16}
                    placeholder="Address"
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default AddUserPage;