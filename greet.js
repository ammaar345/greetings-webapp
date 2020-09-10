module.exports = function Greet() {
    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://sneakygoblin:codex123@localhost:5432/greetings-webapp';
    const pool = new Pool({
        connectionString
    });
    //    async function names(userN) {
    //         const userName =await userN.charAt(0).toUpperCase() +await userN.toLowerCase().slice(1)

    //         if (nameMap[userName] === undefined) {
    //             nameMap[userName] = userName;
    //            nameMap[userName]=0;
    //             //addEntry()
    //         }
    //         nameMap[userName]++
    //     }
    //async function greetings (name, language) {


    async function addEntry(param) {
        if (param !== '') {
          
            const INSERT_QUERY = ' insert into users (name,greeted_count) values ($1,1)';
            await pool.query(INSERT_QUERY, [param]);
        }
    }

    

    async function countGreeted(username) {
        const SELECT_QUERY = 'Select name from users where name=$1'
        const UPDATE_QUERY = 'UPDATE users set greeted_count=greeted_count+1  where name=$1 ';
        const user = await pool.query(SELECT_QUERY, [username])
       // const charName=(username.charAt(0).toUpperCase() + param.toLowerCase().slice(1))
        if (user.rows.length > 0) {
            await pool.query(UPDATE_QUERY, [username])
        }
        else {
            await addEntry(username)
        }

    }

    async function singleNameCount(nameParam) {
        const SELECT_QUERY = 'Select greeted_count from users where name=$1'
        const user = await pool.query(SELECT_QUERY, [nameParam])
        if (user.rows.length > 0) {
            return user.rows[0].greeted_count;
        }
        return 0;
       
    }
    async function greetUser(name, lang) {
        var msg = "";
        user = await (name.charAt(0).toUpperCase() + name.toLowerCase().slice(1));
        if (!user == "") {
            if (lang === "English") {
                msg = "Hello, " + user;

            }
            else if (lang === "Afrikaans") {
                msg = "Halo, " + user;

            }

            else if (lang === "Xhosa") {
                msg = "Mholo, " + user;

            }
        }

        return msg
    }

    async function getNames() {
        // const SELECT_QUERY=
        const users = await pool.query('SELECT name FROM users')
        // var userNames=Object.keys(users.rows);
        return users.rows;
    }


    async function nameCounter() {
        // var count = Object.keys(nameMap)
        const SELECT_QUERY = 'SELECT id from users';
        const count = await pool.query(SELECT_QUERY);
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
        ///  names,
        greetUser,
        getNames,
        flshMsg,
        singleNameCount,
        addEntry,
        countGreeted
    }
}