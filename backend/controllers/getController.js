


let index = (req, res) => {
    console.log("Login page redirect")
 
    res.render("index");
}

module.exports = {
    index:index
}