const API_URL = "http://localhost:5000/api/auth";


async function signup(e, name, lastName, email, password, confirm){
    e.preventDefault();

    if(!name || !lastName || !email || !password || !confirm) return;

    const regex = /^[^\d\W]+$/; // matches only alphabetical characters -- thus if we pass a symbol/number will return FALSE if we pass a string, it'll return true when we test it


    //Validations
    if(!regex.test(name) || !regex.test(lastName)) throw new Error("Name and Last Name must not contain numbers or symbols!");
    if(password !== confirm) throw new Error("Confirm your password correctly!");
    if(password.trim().length <= 6 || confirm.trim().length <= 6) throw new Error("Password must be at least 7 characters long!");


    const newUser = {
        first_name: name.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password: password.trim()
    }

    
    try{
        const res = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(newUser)
        });

        const data = await res.json();
        
        if(data?.error) throw new Error(data.error);

        return data;
    }
    catch(error){
        throw new Error(error.message || error.error); 
    }
}




async function login(e, email, password){
    e.preventDefault();

    if(!email || !password) return;

    if(password.trim().length <= 6) throw new Error("Password must be at least 7 characters long!");

    const user = {
        email: email.trim(),
        password: password.trim()
    }

    try{
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(user)
        });

        const data = await res.json();

        if(data?.error) throw new Error(data?.error);

        console.log(data);
        return data;
    }
    catch(error){
        throw new Error(error.message || error.error); 
    }

}



async function verifyTokenForUse(){
    try{
        const res = await fetch(`${API_URL}/verify`, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if(data?.error) throw new Error(data?.error);

        // console.log("verifyTokenForUse: ", data);
        return data;
    }
    catch(error){
        throw new Error(error.message || error.error); 
    }
}




export { signup, login, verifyTokenForUse }