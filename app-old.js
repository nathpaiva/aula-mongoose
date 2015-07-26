var http = require("http");

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/workshop');

var db = mongoose.connection;
db.on('error', function(err){
	console.log('Erro de conexao.', err);
});
db.on('open', function () {
	console.log('Conexão aberta.');
});
db.on('connected', function(err){
	console.log('Conectado');
});
db.on('disconnected', function(err){
	console.log('Desconectado');
});

var Schema = mongoose.Schema,
_schema = {
	name: { type: String, default: '' },
	description: { type: String, default: '' },
	alcohol: { type: Number, min: 0, default: '' },
	price: { type: Number, min: 0, default: '' },
	category: { type: String, default: ''},
	created_at: { type: Date, default: Date.now() }
},
ModelSchema = new Schema(_schema),
Model = mongoose.model('Beer', ModelSchema);

var query = {},
	msg =  "",
	Controller = {
		create: function (req, res){
	 		var dados = {
				name: 'Heineken',
				description: 'Até que eh boazinha',
				alcohol: 5.5,
				price: 3.5,
				category: 'lager'
			}

			var model = new Model(dados);
			model.save(function (err, data) {
				if (err){
					console.log('Erro: ', err);
					msg=  JSON.stringify(err);
				} else{
					console.log('Success: ', data);
					msg=  JSON.stringify(data);
				};
				res.end(msg);
			});
		},
		retrieve: function(req, res){
			console.log(query);
			Model.find(query, function (err, data) {
				if (err){
					console.log('Erro: ', err);
					msg=  JSON.stringify(err);
				} else{
					console.log('Success: ', data);
					msg=  JSON.stringify(data);
				};
				res.end(msg);
			});
		},
		update: function(req, res){
			query = {name: /heineken/i};
			var mod = {
				name: 'Brahma',
				alcohol: 4,
				price: 6
			};
			Model.update(query, mod, function (err, data) {
				if (err){
					console.log('Erro: ', err);
					msg=  JSON.stringify(err);
				} else{
					console.log('Success: ', data);
					msg=  JSON.stringify(data);
				};
				res.end(msg);
			});

		},
		delete: function(req, res){
			query = {name: /brahma/i};
			Model.remove(query, function (err, data) {
				if (err){
					console.log('Erro: ', err);
					msg=  JSON.stringify(err);
				} else{
					console.log('Success: ', data);
					msg=  JSON.stringify(data);
				};
				res.end(msg);
			});
		}
	};


http.createServer(function(req, res) {
	console.log(url);
	var url = req.url;

	switch(url){
		case '/api/beers/create':
			Controller.create(req, res);
		break;
		case '/api/beers/retrieve':
			Controller.retrieve(req, res);
		break;
		case '/api/beers/update':
			Controller.update(req, res);
		break;
		case '/api/beers/delete':
			Controller.delete(req, res);
		break;
		default: res.end("Rota não encontrada");
	}

}).listen(3000);

console.log('Entre em http://localhost:3000/');





// função anonima porque vai executar uma unica vez
// http.createServer(function(request, response) {
// 	console.log(url);
// 	var url = request.url;

// 	if ( url === "/api/beers") {
// 		Beer.find(query, function (err, data) {
// 			if(err) {
// 				console.log(err);
// 				msg=  JSON.stringify(err);
// 			} else {
// 				console.log(data);
// 				msg=  JSON.stringify(data);
// 			}
// 			response.end(msg);
// 		});
// 	} else{
// 		response.end("Rota não encontrada");
// 	};
// }).listen(3000);

// http.createServer(function(request, response) {
// 	console.log(url);
// 	var url = request.url;

// 	switch(url){
// 		case '/create':

// 		var dados = {
// 			name: 'Heineken',
// 			description: 'Até que eh boazinha',
// 			alcohol: 5.5,
// 			price: 3.5,
// 			category: 'lager'
// 		}

// 		var model = new Beer(dados);
// 		model.save(function (err, data) {
// 			if (err){
// 				console.log('Erro: ', err);
// 				msg=  JSON.stringify(err);
// 			} else{
// 				console.log('Cerveja Inserida', data);
// 				msg=  JSON.stringify(data);
// 			}
// 		});
// 		response.end(msg);
// 		break;
// 		case '/retrieve':

// 		var query = {};

// 		Beer.find(query, function (err, data) {
// 			if(err) {
// 				console.log(err);
// 				msg =  JSON.stringify(err);
// 			} else {
// 				console.log(data);
// 				msg =  JSON.stringify(data);
// 			}
// 		});
// 		response.end(msg);

// 		break;
// 		case '/update':

// 		var query = {name: /heineken/i},
// 		mod = {
// 			name: 'Brahma',
// 			alcohol: 4,
// 			price: 6
// 		},
// 		optional = {
// 			upsert: false,
// 			multi: true
// 		};
// 		Beer.update(query, mod, function (err, data) {
// 			if (err){
// 				console.log('Erro: ', err);
// 				msg =  JSON.stringify(err);
// 			} else{
// 				console.log('Cervejas atualizadas com sucesso: ', data);
// 				msg=  JSON.stringify(data);
// 			}
// 			response.end(msg);
// 		});

// 		break;
// 		case '/delete':

// 		var query = {name: /brahma/i};
// 		Beer.remove(query, function (err, data) {
// 			if (err){
// 				console.log('Erro: ', err);
// 				msg=  JSON.stringify(err);
// 			}
// 			else{
// 				console.log('Cerveja deletada com sucesso', data.result);
// 				msg=  JSON.stringify(data);
// 			}
// 			response.end(msg);
// 		});
// 		break;
// 	}

// }).listen(3000);