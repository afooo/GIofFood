var app = app || {} ;

app.GI = Backbone.Model.extend({
	url: function(){
		return 'http://localhost:3000/gi/' + this.category;
	},
	category: 'Grains',
	default: {
		errfor: {},
		gis: []
	}
});

app.GIView = Backbone.View.extend({
	el: '.container',
	events: {
		'click #category': 'click'
	},
	initialize: function(){
		this.model = new app.GI();

		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model, 'change', this.render);
		this.template = _.template($('#tmpl-fgi').html());

		this.model.fetch();
	},
	render: function(){
		var list = '#list' + this.model.category;

		$(list).html(this.template( this.model.attributes ));
	},
	click: function(evt){
		var category = $(evt.target).data('category');

		this.model.category = category;
		this.model.fetch();
	}
});



$(document).ready(function(){
	app.giView = new app.GIView();
});