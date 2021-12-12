"use strict";

const { Requester } = require("cote");

const requester = new Requester({ name: "publisher" });

const thumbnailRequester = (foto) => {
	const req = {
		type: "convertir-thumbnail",
		foto: foto,
	};
	requester.send(req, (err, done) => {
        try{
            console.log(`transform ${foto} = ${req} ${done}`);}catch(err){console.log(err)}
	});
};

module.exports = thumbnailRequester;