 const fetch = require('node-fetch');
 const Blog = require("../models/blog")


let indexPage  = async (req, res) =>{
    console.log("hello this is after");
    const topic = req.body.fname;
   const {fname} = req.body;
   //DB store
  
    
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
  
      if(req.body.relatedbtn)
      {
        

        const blog = new Blog(req.body);
        blog.save((err, category) => {
            if (err) {
              return res.status(400).json({
                error: "NOT able to save category in DB"
              });
            }
            else{
                console.log("Sucessful store in DB",category);
            }
          });
    
        req.session.number = 10;
             url = `https://medium.com/_/api/tags/${req.body.relatedbtn}/stream`
     
           req.session.url = url
        
         console.log("inside the if--aaksaj----------");
      }
      else if(!req.session.url)
      {
        const blog = new Blog(req.body);
        blog.save((err, category) => {
            if (err) {
              return res.status(400).json({
                error: "NOT able to save category in DB"
              });
            }
            else{
                console.log("Sucessful store in DB",category);
            }
          });
    
            var url = `https://medium.com/_/api/tags/${topic}/stream`
            req.session.url = url
             console.log("inside the if 1st part------------")

     }
     else{
        url = req.session.url
        console.log("inside the else------------")
    }

 

    let opts = {
        limit: req.session.number,
        sortBy: "recent-vote-count",
      };
    
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



 
      // console.log("name is -------->>",obje.user);
      // console.log("stream  is -------->>",obje.stream);
       //console.log("stream  length -------->>",obje.stream.length);
       var obje = { 
        "sucess":objContent.payload.relatedTags,
        "stream":objContent.payload.streamItems,
        "refrences":objContent.payload.references,
        "refrence":objContent.payload.references.Post,
        "user":objContent.payload.references.User,
        "tag":objContent.payload.tag
       }
       console.log("from last");


       
    //Store in DB

    // const blog = new Blog(obje);
    // blog.save((err, category) => {
    //     if (err) {
    //       return res.status(400).json({
    //         error: "NOT able to save category in DB"
    //       });
    //     }
    //     else{
    //         console.log("Sucessful store in DB",category);
    //     }
    //   });

   
let dbs = {}
     await Blog.find({ }, (err, user) => {
        console.log("Entry of DB..........")
     
          if (err || !user) {
            console.log("Inside Error->>>>",user);
            //res.render("editProfile",user);
            // res.render("indexPage",obje);
        }
        else{
            //console.log(schedule);
            console.log("user data is --->>>>>>>>>",user);
            //console.log("user schedule is is --->>>>>>>>>",schedule);
            // for(var i=0;i<user.length;i++)
            // {
            //   console.log("lenf=gth is ", i);
            //   dbs = { 
            //     "userName":user[i].fname,
            //     "userPhone":user[i].relatedbtn
            //    }
            // }     
            dbs = user;
              // console.log("user data is dbs  --->>>>>>>>>",dbs);
        } 
    });
//Endind of DB
  for(var i=0;i<dbs.length;i++)
            {
              console.log("aakash is gtrewds");
            }  

console.log("user data is dbs our=tside --->>>>>>>>>",dbs);
console.log("user data is dbs our=tside --->>>>>>>>>",dbs);
        res.render("indexPage",{...obje,dbs:dbs});
    //   res.render("indexPage",{...obje});

}



module.exports = {
    indexPage:indexPage
}