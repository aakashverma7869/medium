
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

let loadMore  = async (req, res) =>{
  const loadMoree = req.body;
  let url = `https://medium.com/_/api/posts/${req.params.id}`

  console.log("URL IS ------->>>>>",url);

  let content = await fetch(url, {
    method: "get",
    headers: {
      "content-type": "application/json"
    },
  });
  var textContent = await content.text();
  var objContent = JSON.parse(textContent.slice(16));
  console.log("hi aakash----------- .... ..>>>>>>>",objContent);

  var obje = { 
    "sucess":objContent.payload.value.content.bodyModel.paragraphs
   }

   
  
  //console.log("hello aakash ->>",loadMoree);
  console.log(req.params.id);
  console.log(req.params.photoid);

  res.render("loadMore",{photo:req.params.photoid,data:obje});
  }

module.exports = {
    indexPage:indexPage,
    refresh:refresh,
    loadMore:loadMore
}