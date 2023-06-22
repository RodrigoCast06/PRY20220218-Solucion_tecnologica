import { baseUrl } from "@/utils/base";
import { toast } from "react-toastify";


export default async function ShowToast({ path, method = "GET", body }: any) {
    const id = toast.loading("Cargando...")
    const resp = await fetch(`${baseUrl}${path}`, {
        method,
        ...(method !== "GET" && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async res => {
        const data = await res.json()
        if (!data._id && (res.status !== 201 && res.status !== 200)) {
            toast.update(id, {
                render: data.message ?? "Resultados no encontrados",
                type: "error",
                isLoading: false,
                autoClose: 2000,
                closeButton: true,
            });

            return {
                status: false,
                data
            }

        }
        toast.update(id, {
            render: "¡Correcto!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
            closeButton: true
        });

        return {
            status: true,
            data
        }
    }).catch(err => {
        console.log("🚀 ----------------------------------------------🚀")
        console.log("🚀 ~ file: toast.tsx:46 ~ ShowToast ~ err:", err)
        console.log("🚀 ----------------------------------------------🚀")
        toast.update(id, {
            render: err.message ?? "Resultados no encontrados",
            type: "error",
            isLoading: false,
            autoClose: 2000,
            closeButton: true
        });
        return {
            status: false,
            data: err
        }
    });
    return resp
}