const path = require('path')

module.exports = (config, env) => {
	console.log(config)
	config.node.__dirname = false
	config.node.__filename = false
	config.watchOptions = {
		ignored: path.join(__dirname,'/public/ebook/')
	}
	
	return config
}