function searchMedicine() {
    const searchInput = document.getElementById('searchInput').value;
    const searchResultsContainer = document.getElementById('searchResults');
    
    // Clear previous search results
    searchResultsContainer.innerHTML = '';

    // Make API request for Russian language
    const apiUrl = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchInput}&format=json&origin=*`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const searchResults = data.query.search;

            // Display search results
            searchResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.innerHTML = `<h3>${result.title}</h3><p>${result.snippet}</p>`;
                
                // Add click event to show full article
                resultItem.addEventListener('click', () => showFullArticle(result.title));

                searchResultsContainer.appendChild(resultItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

function showFullArticle(title) {
    const fullArticleUrl = `https://ru.wikipedia.org/w/api.php?action=query&titles=${title}&prop=extracts&format=json&origin=*`;

    fetch(fullArticleUrl)
        .then(response => response.json())
        .then(data => {
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            const fullContent = pages[pageId].extract;

            // Display full article content in modal
            const modalContent = document.getElementById('fullArticleContent');
            modalContent.innerHTML = `<h2>${title}</h2>${fullContent}`;

            // Show the modal
            const modal = document.getElementById('modal');
            modal.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}

function closeModal() {
    // Close the modal
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}