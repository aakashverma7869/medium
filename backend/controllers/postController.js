 const fetch = require('node-fetch');


let indexPage  = async (req, res) =>{
    console.log("hello this is after");
    const topic = req.body.fname;
    
    console.log("toic is ->>",topic);
    console.log("toic is ->>",req.body.relatedbtn);

 
    if(!req.session.number)
    {
        req.session.number = 10;
    }
     else
     {
    req.session.number = req.session.number+10

     }
    let opts = {
        limit: req.session.number,
        sortBy: "recent-vote-count",
      };
      if(req.body.relatedbtn)
      {
       
 
             url = `https://medium.com/_/api/tags/${req.body.relatedbtn}/stream`
           req.session.url = url
        
         console.log("inside the if--aaksaj----------");
      }
      else if(!req.session.url)
      {
            var url = `https://medium.com/_/api/tags/${topic}/stream`
            req.session.url = url
             console.log("inside the if 1st part------------")

     }
     else{
        url = req.session.url
        console.log("inside the else------------")
    }

 


    
    let content = await fetch(url, {
        method: "post",
        body: JSON.stringify(opts),
        headers: {
          "content-type": "application/json",
          "x-xsrf-token": "VLSJLufCen2i",
        },
      });
      var textContent = await content.text();
    //   console.log("textContentis -->>",textContent);
    // "postid":objContent.payload.streamItems.postPreview.postId,
    // "creatorid":objContent.payload.Post[this.postid].creatorId,
    // "user":objContent.payload.references.User[creatorid].name
    
      var objContent = JSON.parse(textContent.slice(16));
    //  console.log("objCont------------------->>>>>>>",objContent);
      const obje = { 
        "sucess":objContent.payload.relatedTags,
        "stream":objContent.payload.streamItems,
        "refrences":objContent.payload.references,
        "refrence":objContent.payload.references.Post,
        "user":objContent.payload.references.User,
        "tag":objContent.payload.tag
       }
      // console.log("name is -------->>",obje.user);
      // console.log("stream  is -------->>",obje.stream);
       //console.log("stream  length -------->>",obje.stream.length);
      res.render("indexPage",obje);

}



module.exports = {
    indexPage:indexPage
}