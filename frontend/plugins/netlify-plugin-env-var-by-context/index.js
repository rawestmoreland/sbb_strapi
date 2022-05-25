module.exports = {
	onPreBuild: async ({ inputs }) => {
		if (process.env.BRANCH !== 'production') {
			const context = process.env.BRANCH.toUpperCase().replace(/-/g, '_')
			Object.keys(process.env).forEach((key) => {
				const envVar = `${context}_${key}`
				console.log({ envVar })
				const val = process.env[envVar]
				if (process.env[envVar]) {
					console.log(`Exporting ${key}=${val}`)
					process.env[key] = val
				}
			})
		}
	},
}
