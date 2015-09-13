var express = require('express');
var router = express.Router();

router.get('/gi/:category', function(req, res, next){

	req.app.db.model.Fgi
		.find({ category: req.params.category })
		.exec(function(err, fgi){
			res.send({
				gis: fgi
			});
		});
});

router.post('/gi', function(req, res, next){
	var fgi = req.app.db.model.Fgi;

	var doc = new fgi({
		category: req.query.category,
		foodName: req.query.foodname,
		foodNameC: req.query.foodnamec,
		giValue: req.query.giValue,
		energy: req.query.energy
	});

	doc.save();
	console.log('its saved')
	res.send(doc);
});

module.exports = router;