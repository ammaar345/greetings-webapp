module.exports=function Greet() {
    var msg;
    var nameList=[]   

    // function countNamesStorage() {
    //     var namesCount = Object.keys(namesGreeted)
    //     return namesCount.length;
    // }
    function nameStorage() {
        return nameList;
    }
    function greetings(name,lang){
        if (lang === "English") {
            msg = "Hello, " + name;

        }
        else if (lang === "Afrikaans") {
            msg = "Halo, " + name;

        }

        else if (lang === "Xhosa") {
            msg = "Molo," + name;

        }
    //}

return msg
 }    
 
 function names(name){
    
    if (/*!nameList.includes(name)&&*/name!==""){
        nameList.push(
            name
          );
        
    }
    
}
function getNames(){
    for(var i=0;i<nameList.length;i++){
        var names=nameList[i];
        return names
     }
     
  //return nameList; 
}
// function getCurrentName(){
// return getNames()[i]


// }
function nameCounter(){

return nameList.length;

}
function flshMsg(input){
    if (input===""){
return "enter name"
    }
}
    return {
      nameCounter ,
            names,
        nameStorage,
        greetings,
        getNames,
        flshMsg
     //   getCurrentName
        // checked,
       // validate,
        // countNamesStorage
// ,greeter
    }
}
//  function greetCounter(userName) {
//         //when the greet button is pressed check if this user was already greeted before
//         //by looking if the userName exists in namesGreeted if not increment this counter and update the screen
//         if (namesGreeted[userName] === undefined) {
//             // greetingsCounter++;
//             //add an entry for the user that was greeted in the Object Map
//             namesGreeted[userName] = 1;
//             //update the DOM to display the counter

//         }
//         //        else if(namesGreeted[userName]===0){
//         // namesGreeted[userName]=1
//         //         } 
//         //         else if (namesGreeted[userName]=1){
//         //             greetingsCounter=  greetingsCounter;
//         //             msg="This name has already been added."
//         //             return msg
//         //         }

//         //    return greetingsCounter;
//     }
// function languageChoice(lang, name) {
    //     validate(lang, name)
    //    // if (name !== "" && lang !== "") {
    //         if (lang === "English") {
    //             msg = "Hello, " + name;

    //         }
    //         else if (lang === "Afrikaans") {
    //             msg = "Halo, " + name;

    //         }

    //         else if (lang === "Xhosa") {
    //             msg = "Molo ," + name;

    //         }
    //     //}
    //     return msg
    // }
     // function validate(lang, name) {
    //     if (name === "" && lang === "") {
    //         msg = "Please Select A Language And  Enter A Username."

    //     }
    //     else if (name === "") {
    //         msg = "Please enter a username."
    //     }

    //     else if (lang === "") {
    //         msg = "Please Select A Language"
    //     }


    // }