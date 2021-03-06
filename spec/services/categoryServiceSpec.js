var mockRequire = require("../../node_modules/mock-require/index.js");
mockRequire('../../app/repositories/categoryRepository', {
	findCategories: function(callback) {
		console.log('categoryRepository.find called');
		return callback(null);
	},
	saveCategory: function(callback) {
		console.log('categoryRepository.save called');
		return callback(null);
	},
});
var categoryRepository = require("../../app/repositories/categoryRepository");
var categoryService = require("../../app/services/categoryService.js");

describe("When there is no category data sent at all", () => {
	var result = null;
	beforeEach((done) => {
		categoryService.saveCategory(null, (res) => {
			result = res;
			done();
		});
	});
	
	it("should give an error message in the result", () => { 
		expect(result.message).toBe("No category object could be constructed");
		expect(result.status).toBe(400);
	});
});

describe("When there is no category description method in request", () => {
	var result = null;
	beforeEach((done) => {
		categoryService.saveCategory({ description: undefined }, (res) => {
			result = res;
			done();
		});
	});
	
	it("should give an error message in the result", () => { 
		expect(result.message).toBe("No category description was given");
		expect(result.status).toBe(400);
	});
});

describe("When the find Categories method returns an error", () => {
	var result = null;
	beforeEach((done) => {
		spyOn(categoryRepository, "findCategories").and.callFake((callback) => {
			return callback({ status: 404, error: "no categories found" });
		});
		
		categoryService.saveCategory({ description: "my category" }, (res) => {
			result = res;
			done();
		});
	});
	
	it("should give an error message in the result", () => { 
		expect(result.message).toBe("Handler rejected because : no categories found");
		expect(result.status).toBe(404);
	});
});

describe("When the find Categories method returns a duplicate category", () => {
	beforeEach((done) => {
		spyOn(categoryRepository, "findCategories").and.callFake((callback) => {
			return callback({ categories: [ { _id : 1, description: "my category" } ] });
		});
		
		categoryService.saveCategory({ description: "my category" }, (res) => {
			result = res;
			done();
		});
	});
	
	it("should give an error message in the result", () => { 
		expect(result.message).toBe("Duplicate description");
		expect(result.status).toBe(400);
	});
});

describe("When there is no duplicate category", () => {
	beforeEach((done) => {
		spyOn(categoryRepository, "findCategories").and.callFake((callback) => {
			return callback({ categories: [ { _id : 1, description: "other category" } ] });
		});
		
		spyOn(categoryRepository, "saveCategory").and.callFake((categoryData, callback) => {
			return callback("");
		});
		
		categoryService.saveCategory({ description: "my category" }, (res) => {
			result = res;
			done();
		});
	});
	
	it("should call the save category to db function", () => {
		 expect(categoryRepository.saveCategory).toHaveBeenCalled();
	});
});