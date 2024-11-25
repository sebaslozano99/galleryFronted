const API_URL = "http://localhost:5000/api/auth";


async function login(e, email, password){
    e.preventDefault();

    try{
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {email, password}
        });

        const data = await res.json();
        
        console.log(data);

        return data;
    }
    catch(error){
        throw new Error(error.message || error.error); 
    }
}



export { login }