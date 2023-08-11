import toast from 'react-hot-toast';
export const UserType = {
    Admin: "admin",
    Customer: "customer",
}


export const sendToast = (type: string, message: string, className?: string) => {
    type === "success" ? toast.success(message, {
        duration: 4000,
        position: "top-center",
        className: className,
    }) :
        toast.error(message, {
            duration: 4000,
            position: "top-center",
            className: className,
        });
};