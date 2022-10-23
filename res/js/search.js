window.addEventListener(`load`, () => {
	searchBarInit()
})

const searchBarInit = () => {
	const searchBar = document.getElementById(`searchbar`)
	searchBar.focus()
	const fuse = new Fuse(COMPENDIUM, {
		keys: [`name`],
		minMatchCharLength: 3,
		threshold: 0.3,
	})
	searchBar.addEventListener(`keyup`, () => {
		const searchResults = fuse.search(searchBar.value)
		clearSearchResults()
		if (searchResults.length > 0) {
			renderSearchResults(searchResults)
		}
	})
}

const renderSearchResults = (searchResults) => {
	const resultTemplate = document.getElementById(`resultTemplate`).innerHTML
	for (i = 0; i < searchResults.length; i++) {
		const searchResult = searchResults[i].item
		const renderedResult = Mustache.render(resultTemplate, {
			name: searchResult.name,
			safety: searchResult.safety,
			details: searchResult.details,
			source: {
				name: searchResult.source.name,
				url: searchResult.source.url,
				date: renderUnixTimestamp(searchResult.source.date),
			}
		})
		const resultElement = document.createElement(`div`)
		resultElement.innerHTML = renderedResult
		document.getElementById(`results`).appendChild(resultElement)
	}
}

const clearSearchResults = () => {
	document.getElementById(`results`).innerHTML = ``
}

const renderUnixTimestamp = (timestamp) => {
	const a = new Date(timestamp)
	const m = [
		`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`,
		`Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`
	]
	return `${a.getDate()} ${m[a.getMonth()]} ${a.getFullYear()}`
}