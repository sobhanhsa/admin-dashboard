"use client"

import { Bounce, ToastContainer, toast } from "react-toastify";

const ToastC = () => {
    

    const handleBtn = () => {

        toast('🦄 Wow so easy!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: "0..1",
            theme: "dark",
            transition: Bounce,
        });
    }


    
    return (
        <div>
            <button onClick={handleBtn}>
                click me
            </button>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
};

export default ToastC;