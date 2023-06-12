import { getProduct, getProducts } from './services/api.js';
import { createOrder, retrieveOrder } from './services/klarna.js';
import express from 'express';
const app = express();
import { config } from 'dotenv';
config();

app.get('/', async (req, res) => {
	const products = await getProducts();
	// Add CSS styling to the product list
	const markup = products
		.map(
			(p) =>
				`<a style="display:block;color:black;border:solid black 2px;margin: 20px; padding:10px; text-decoration:none; text-align:center; background-color: #f2f2f2; border-radius: 5px; box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);" href="/product/${p.id}">
                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">${p.title}</div>
                    <div style="font-size: 16px; margin-bottom: 10px;">${p.description}</div>
                    <div style="font-size: 18px; font-weight: bold;">${p.price}kr</div>
                </a>`
		)
		.join(' ');
	res.send(markup);
});

app.get('/product/:id', async function (req, res) {
	try {
		const { id } = req.params;
		const product = await getProduct(id);
		const klarnaJsonResponse = await createOrder(product);
		const html_snippet = klarnaJsonResponse.html_snippet;
		res.send(html_snippet);
	} catch (error) {
		res.send(error.message);
	}
});

app.get('/confirmation', async function (req, res) {
	const order_id = req.query.order_id;
	const klarnaJsonResponse = await retrieveOrder(order_id);
    const html_snippet = klarnaJsonResponse.html_snippet;
	res.send(html_snippet);
});

app.listen(process.env.PORT);