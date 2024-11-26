const API_URL = "http://localhost:5000/api/auth";


async function signup(e, name, email, password, confirm){
    e.preventDefault();

    if(!name || !email || !password || !confirm) {
        return console.log("Fill all fields")
    };

    //Validations
    if(password !== confirm) throw new Error("Confirm your password correctly!");
    if(confirm.length <= 6) throw new Error("Password must be at least 7 characters long!");


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



export { signup }