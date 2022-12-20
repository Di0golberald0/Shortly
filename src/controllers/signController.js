async function signin(req, res) {
    try {
        console.log("signin")
        res.send("Login efetuado").status(200)
    } catch(error) {
        console.log("erro")
    }
};

async function signup(req, res) {
    try {
        console.log("signup")
        res.send("Signup efetuado").status(200)
    } catch(error) {
        console.log("erro")
    }
}

export { signin, signup }