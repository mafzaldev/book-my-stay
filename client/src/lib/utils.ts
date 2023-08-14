import toast from 'react-hot-toast';
export const UserType = {
    Admin: "admin",
    Customer: "customer",
}

export const NULL_TIMESTAMP = "1970-01-01T00:00:00.000Z";


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

export const getDateFromTimeStamp = (utcTimestamp: string) => {
    const date = new Date(utcTimestamp);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;

    return formattedDate;
}