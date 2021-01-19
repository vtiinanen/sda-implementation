'use strict';

const express = require('express');
const axios = require('axios');

const { config } = require('../utils');

const app = (module.exports = express());

/**
 * https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
 * @param {*} key
 * @param {*} order
 */

function compareValues(key, order = 'asc') {
	return function innerSort(a, b) {
		if (!Object.prototype.hasOwnProperty.call(a, key) || !Object.prototype.hasOwnProperty.call(a, key)) {
			// property doesn't exist on either object
			return 0;
		}

		const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
		const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

		let comparison = 0;
		if (varA > varB) {
			comparison = 1;
		} else if (varA < varB) {
			comparison = -1;
		}
		return order === 'desc' ? comparison * -1 : comparison;
	};
}

app.get('', async (req, res, next) => {
	try {
		let response = await axios.get(config.NAME_DATABASE_URL);
		let returnable = response.data.names;
		let data = response.data.names;
		let sort = req.query.sort;
		let aggregate = req.query.aggregate;
		if (sort && sort === 'amount') {
			returnable = data.sort(compareValues('amount', 'desc'));
		}
		if (sort && sort === 'alphabetical') {
			returnable = data.sort(compareValues('name', 'asc'));
		}
		if (aggregate && aggregate === 'amount') {
			let amount = 0;
			for (let i = 0; i < data.length; i++) {
				let obj = data[i];
				amount += obj.amount;
			}
			returnable = amount;
		}
		return res.status(200).json(returnable);
	} catch (error) {
		return next(error);
	}
});

app.get('/:name', async (req, res, next) => {
	try {
		let response = await axios.get(config.NAME_DATABASE_URL);
		let data = response.data.names;
		let name = req.params.name;
		let key = req.query.key;
		let returnable = null;
		for (let i = 0; i < data.length; i++) {
			let obj = data[i];
			if (name && obj.name === name) {
				if (key && key !== '') {
					returnable = obj[key];
					break;
				}
				returnable = obj;
				break;
			}
		}
		if (!returnable) throw { message: 'Document or key not found', status: 404 };
		return res.status(200).json(returnable);
	} catch (error) {
		return next(error);
	}
});
