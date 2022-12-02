export const popUpAlert = (type, message, image) => {
    Swal.fire({
            icon: `${image}`,
            title: `${type}`,
            text: `${message}`,
            background: "#1d204b",
            color: "#FFF",
            customClass: { popup: "swal2-border-radius" }
        } 
    );
}