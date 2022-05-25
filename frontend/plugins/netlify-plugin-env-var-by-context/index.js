module.exports = {
	onPreBuild: async ({ inputs }) => {
		console.log(process.env.CONTEXT)
		console.log(process.env.BRANCH)

		const context = process.env.CONTEXT.toUpperCase().replace(/-/g, '_')
		Object.keys(process.env).forEach((key) => {
			const envVar = `${context}_${key}`
			const val = process.env[envVar]
			if (process.env[envVar]) {
				console.log(`Exporting ${key}=${val}`)
				process.env[key] = val
			}
		})
	},
}
