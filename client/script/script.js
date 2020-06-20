
function hideFun(){
    console.log("hello hide function")
    document.querySelector("#comb").style.display="none"
}



window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    console.log( { scrollTop, scrollHeight, clientHeight });
    
    if(clientHeight + scrollTop >= scrollHeight - 5) {
        // show the loading animation
        req.session.number = 7
        alert("you're at the bottom of the page");
    }
});

 function destroyfunction(){
     console.log("inside destoyed");
    req.session.destroy(function(err) {
        console.log("session is destroyed");
      })


}

