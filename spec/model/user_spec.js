const User = require("./../../app/model/user.js");

describe("User model", function() {
	let user = new User();
	it("should return property", function() {
		expect(user.id).toBe(0);
		expect(user.name).toBe("");
		expect(user.username).toBe("");
		expect(user.password).toBe("");
	});
});