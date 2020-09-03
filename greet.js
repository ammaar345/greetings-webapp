module.exports = function Greet() {
    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://sneakygoblin:codex123@localhost:5432/greetings-webapp';
    
    const pool = new Pool({
        connectionString
    });
    
    var nameMap = {};
    async function addEntry(param){
        const INSERT_QUERY = "insert into tblNames (name,greeted_count) values ($1, $2)";
        await pool.query(INSERT_QUERY, [param.name, param.counter]);
    
          
    }
   async function names(userN) {
        var userName =await userN.charAt(0).toUpperCase() + userN.toLowerCase().slice(1)
    
        if (nameMap[userName] === undefined) {
            nameMap[userName] = 0
           
            //addEntry()
        }
        nameMap[userName]++
    }
    async   function singleNameCount(nameParam) {

        return  await nameMap[nameParam.charAt(0).toUpperCase() + nameParam.toLowerCase().slice(1)]


    }
    async function greetUser(name, lang) {
        var msg = "";
        name = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
        
        if (!name == "") {
            names(name);
            addEntry(name)
            if (lang === "English") {
                msg = "Hello, " + name;

            }
            else if (lang === "Afrikaans") {
                msg = "Halo, " + name;

            }

            else if (lang === "Xhosa") {
                msg = "Molo, " + name;

            }
        }
  
        return msg
    }

    async     function getNames() {

        return Object.keys(nameMap);
    }
   async function nameCounter() {
        // var count = Object.keys(nameMap)
        const SELECT_QUERY = 'SELECT count (*) as counter from tblNames';
       
        var count=await pool.query(SELECT_QUERY);
        // return count.length
      console.log(count.rows)
return count.rows
    }
    function flshMsg(input) {
        if (input === "") {
            return "Enter a name"
        }
    }
    return {
        nameCounter,
        names,
        greetUser,
        getNames,
        flshMsg,
        singleNameCount,
        addEntry
    }
}