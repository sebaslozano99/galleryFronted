const API_URL = "http://localhost:5000/api/auth";


async function signup(e, name, lastName, email, password, confirm){
    e.preventDefault();

    if(!name || !lastName || !email || !password || !confirm) return console.log("Fill all fields");

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



export { signup }