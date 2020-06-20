
 const fetch = require('node-fetch');

let indexPage  = async (req, res) =>{
    console.log("hello this is after");
    const a = req.body;
    console.log(a);
    let url = `https://medium.com/_/api/tags/javascript/stream`
    let content = await fetch(url, {
        method: "get",
        headers: {
          "content-type": "application/json"
        },
      });
      var textContent = await content.text();
    //   console.log("textContentis -->>",textContent);
    
      var objContent = JSON.parse(textContent.slice(16));
      console.log("objCont------------------->>>>>>>",objContent);

      res.render("indexPage",{sucess:0,stream:0,user:0,dbs:0});

}
let refresh = (req,res) =>{
  req.session.destroy(function(err) {
    console.log("session is destroyed");
  })
  res.render("indexPage",{sucess:0,stream:0,user:0,dbs:0});

}

module.exports = {
    indexPage:indexPage,
    refresh:refresh
}