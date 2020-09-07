module.exports = function Greet() {
    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/greetings-webapp';
    
    const pool = new Pool({
        connectionString
    });
    
    var nameMap = {};
    async function addEntry(param){
        const INSERT_QUERY = ' insert into users (name,greeted_count) values ($1,1)';
        await pool.query(INSERT_QUERY, [param.name]);
    
          
    }
   
   async function names(userN) {
        const userName =await userN.charAt(0).toUpperCase() +await userN.toLowerCase().slice(1)
    
        if (nameMap[userName] === undefined) {
            nameMap[userName] = userName;
           nameMap[userName]=0;
            //addEntry()
        }
        nameMap[userName]++
    }
    async   function singleNameCount(nameParam) {

        return  await nameMap[nameParam.charAt(0).toUpperCase() + await nameParam.toLowerCase().slice(1)]


    }
    async function greetUser(name, lang) {
        var msg = "";
        name = await name.charAt(0).toUpperCase() +await name.toLowerCase().slice(1);
        
        if (!name == "") {
            names(name);
           // addEntry(name)
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

    async function getNames() {
// const SELECT_QUERY=
const users=await pool.query('SELECT name FROM users')      
// var userNames=Object.keys(users.rows);
    return users.rows;
}

    
   async function nameCounter() {
        // var count = Object.keys(nameMap)
        const SELECT_QUERY = 'SELECT id from users';
        const count=await pool.query(SELECT_QUERY);
        // return count.length
    //  console.log(count.rows)
return count.rowCount
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
        addEntry,
      
    }
}