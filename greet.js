module.exports = function Greet() {

    var nameMap = {};

    function names(name) {
        var userName = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1)
        if (nameMap[userName] === undefined) {
            nameMap[userName] = 0
        }
        nameMap[userName]++
    }
    function singleNameCount(nameParam) {

        return nameMap[nameParam.charAt(0).toUpperCase() + nameParam.toLowerCase().slice(1)]


    }
    function greetUser(name, lang) {
        var msg = "";
        name = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1);
        if (!name == "") {
            names(name);
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

    function getNames() {

        return Object.keys(nameMap);
    }
    function nameCounter() {
        var count = Object.keys(nameMap)

        return count.length

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
        singleNameCount
    }
}