const assert=require("assert");
const Greet=require("../greet");
const greet = require("../greet");
describe("Tests greeting the user in the language selected.", function () {


// describe("Tests if username textbox is empty or if no language is selected.", function () {
//     it("Should return a message to inform the user to select a language and enter a username.", function () {
//        // var userMap={Ammaar :1}
//         let greeting = Greet();
      

//      //   assert.equal(greeting.validate(language, userName), "Please Select A Language And  Enter A Username.")
//     });
//     it("Should return a message to inform the user to enter a username.", function () {
//         let greeting = Greet();
       
//      //   assert.equal(greeting.validate(language, userName), "Please enter a username.")
//     })
//     it("Should return a message to inform the user to select a language.", function () {
//         let greeting = Greet();
       
//       //  assert.equal(greeting.validate(language, userName), "Please Select A Language")
//     })

// });
describe("Tests if counting function works correctly.", function () {
    it("Should add the names John,Lucy and Thando to the map and then the getNames function will show it as an array.", function () {
         let greeting=Greet()
        greeting.names("John")
        greeting.names("Lucy")
        greeting.names("Thando")
                assert.deepEqual(greeting.getNames(), ['John','Lucy','Thando']);

    })
    it("Should add the names Andile and Tom to the map and then the getNames function will show it as an array.", function () {
        let greeting=Greet()
       greeting.names("Andile")
      greeting.names("Tom") 
        assert.deepEqual(greeting.getNames(), ['Andile','Tom']);
    })
    it("Should add the name melissa to the map and then the getNames function will show it as an array.", function () {
        let greeting=Greet()
    greeting.names("Melissa")
        assert.deepEqual(greeting.getNames(), ["Melissa"])
    })
})
describe("Shows the names being stored in the object.", function () {
    it(" Should count 2 names in the map.", function () {
        let greeting=Greet()
       greeting.names("Andy");
       greeting.names("Ammaar")
        assert.deepEqual(greeting.nameCounter(),2)
    })
    it("Should count 4 names in the map. , since the name Ammaar has been added already.", function () {
        let greeting=Greet()
        greeting.names("Ammaar");
       greeting.names("ammaar");
        greeting.names("John");
        greeting.names("Kennedy");
        greeting.names("Jenna");
        assert.deepEqual(greeting.nameCounter(),4)
    })
    it("Should count 1 name in the map.", function () {
        let greeting=Greet()
        greeting.names("Nwabile")
        assert.deepEqual(greeting.nameCounter(), 1)
    })
})
})