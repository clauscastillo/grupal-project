import instance from "../lib/axiosConfig";

const isLogged2 = async (navigate) => {
    try {
        const response = await instance.get("/api/isLogged2")
        console.log(response.data, "RESPUESTA")
        return response.data.active
    } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
            navigate("/login/error");
        }
    }
}


const isLogged = async (setLoaded, navigate) => {
    try {
        const response = await instance.get("/api/isLogged")
        setLoaded(true)
        console.log(response.data, "RESPUESTA")
        return response.data.active
    } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
            navigate("/login/error");
        }
    }
}

export { isLogged, isLogged2 }

