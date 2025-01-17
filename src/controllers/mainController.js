const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const visitados = products.filter((product)=>{
			return product.category === 'visited';
		});
		const promociones = products.filter((product)=>{
			return product.category === 'in-sale';
		});
		res.render('index', {visitados, promociones});
	},

	search: (req, res) => {
		const {keywords} = req.query;
    	const resultados = products.filter(({description, name}) =>{
      		 return description.includes(keywords) || name.includes(keywords);
    	});
		res.render('results', {resultados, keywords});
	},	
};

module.exports = controller;