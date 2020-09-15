const assert = require("assert");
const Greet = require("../greet");
describe("Tests greeting the user in the language selected.", function () {
	const pg = require("pg");
	const Pool = pg.Pool;
	const connectionString = process.env.DATABASE_URL || 'postgresql://sneakygoblin:codex123@localhost:5432/greetings_webapp';
	const pool = new Pool({
		connectionString
	});
	const INSERT_QUERY = "insert into users (name, greeted_count) values ($1, 1)";
		beforeEach(async function () {
		await pool.query("delete from users");
	
	});


	describe("Tests if counting function works correctly.", function () {
		it("Should count 3 names in the database.", async function () {
			let greet = Greet()
			await pool.query(INSERT_QUERY, ['Ammaar'])
			await pool.query(INSERT_QUERY, ['Lucy'])
			await pool.query(INSERT_QUERY, ['John'])
			assert.equal(await greet.nameCounter(), 3)
		})
		it("Should count 2 names in the database.", async function () {
			let greet = Greet()
			await pool.query(INSERT_QUERY, ['Ammaar'])
			await pool.query(INSERT_QUERY, ['John'])
			assert.equal(await greet.nameCounter(), 2)
		})
		it("Should count 6 names in the database.", async function () {
			let greet = Greet()
			await pool.query(INSERT_QUERY, ['Henderson'])
			await pool.query(INSERT_QUERY, ['Erin'])
			await pool.query(INSERT_QUERY, ['Thabo'])
			await pool.query(INSERT_QUERY, ['John'])
			await pool.query(INSERT_QUERY, ['Tom'])
			await pool.query(INSERT_QUERY, ['Jennifer'])
			assert.equal(await greet.nameCounter(), 6)

			it("Should count 1 name in the database , since the name Ammaar is already in the database.", async function () {
				let greet = Greet()
				await pool.query(INSERT_QUERY, ['Ammaar'])
				await pool.query(INSERT_QUERY, ['ammaar'])
				assert.equal(await greet.nameCounter(), 1)
			})
			it("Should count 2 names in the database since the name Lucy is already in the database.", async function () {
				let greet = Greet()
				await pool.query(INSERT_QUERY, ['Lucy'])
				await pool.query(INSERT_QUERY, ['lucy'])
				await pool.query(INSERT_QUERY, ['John'])
				assert.equal(await greet.nameCounter(), 2)
			})
		})
		describe("Tests greeting the user in the correct language selected.", function () {


			it("Should greet the username Ammaar in English.", async function () {
				let greet = Greet();
				var userName = "Ammaar"
				var language = "English";
				assert.equal(await greet.greetUser(userName, language), "Hello, Ammaar");
			});
			it("Should greet the username Thomas in Afrikaans.", async function () {
				let greet = Greet();
				var userName = "Thomas"
				var language = "Afrikaans";
				assert.equal(await greet.greetUser(userName, language), "Halo, Thomas");
			});
			it("Should greet the username John in Xhosa.", async function () {
				let greet = Greet();
				var userName = "Unalo";
				var language = "Xhosa";
				assert.equal(await greet.greetUser(userName, language), "Mholo, Unalo");
			});


		});
	})
	describe("Shows the names being stored in the object.", function () {
		it(" Should return 1 name in the list object that was added to the database.", async function () {
			let greet = Greet()
			await pool.query(INSERT_QUERY, ['Yolanda'])
			assert.deepEqual(await greet.getNames(), [{ name: "Yolanda" }])
		})
		it("Should return 2 names in the list object that were added to the database.", async function () {
			let greet = Greet()
			await pool.query(INSERT_QUERY, ['Tom'])
			await pool.query(INSERT_QUERY, ['Jerry'])
			assert.deepEqual(await greet.getNames(), [{
				name: "Tom"
			},
			{ name: "Jerry" }])
		})
		it("Should return 4 names in the list object that were added to the database.", async function () {
			let greet = Greet()
			await pool.query(INSERT_QUERY, ['Joe'])
			await pool.query(INSERT_QUERY, ['Lewis'])
			await pool.query(INSERT_QUERY, ['Themba'])
			await pool.query(INSERT_QUERY, ['Johnathan'])

			// greeting.names("Nwabile")
			assert.deepEqual(await greet.getNames(), [{ name: "Joe" },
			{ name: "Lewis" },
			{ name: "Themba" },
			{ name: "Johnathan" }
			])
		})
	})
	describe("Tests if the counter increases when a name is entered more than once.", function () {


		it("Should add Joe to the database and then increase the counter if the name Joe exists after being added.", async function () {
			let greet = Greet();
			var userName = "Joe"
			await greet.countGreeted(userName)
			await greet.countGreeted(userName)
			assert.equal(await greet.singleNameCount(userName), 2);
		});
		it("Should add Thomas to the database since Thomas is not in the database already.", async function () {
			let greet = Greet();
			var userName = "Thomas"
			await greet.countGreeted(userName)
			assert.equal(await greet.singleNameCount(userName), 1);
		});
		it("Should add the name Unalo to the database if its not there , but after unalo is added to the database the counter should increase 3 more times.", async function () {
			let greet = Greet();
			var userName = "Unalo";
			await greet.countGreeted(userName);
			await greet.countGreeted(userName);
			await greet.countGreeted(userName);
			await greet.countGreeted(userName);
			assert.equal(await greet.singleNameCount(userName), 4);
		});


	});
	describe("Tests if the database function works properly.", function () {


		it("Should clear 3 names from the database.", async function () {
			let greet = Greet();
			await pool.query(INSERT_QUERY, ['Joe'])
			await pool.query(INSERT_QUERY, ['Lewis'])
			await pool.query(INSERT_QUERY, ['Themba'])
			await greet.clearDB()
			assert.deepEqual(await greet.getNames(),[]);
		});
		it("Should clear 2 names from the database.", async function () {
			let greet = Greet();
			await pool.query(INSERT_QUERY, ['Tom'])
			await pool.query(INSERT_QUERY, ['Jerry'])
			await greet.clearDB()
			assert.deepEqual(await greet.getNames(), []);
		});
		it("Should clear 1 name from the database.", async function () {
			let greet = Greet();
			await pool.query(INSERT_QUERY, ['Yolanda'])
			await greet.clearDB()
			assert.deepEqual(await greet.getNames(), []);
		});


	});
})