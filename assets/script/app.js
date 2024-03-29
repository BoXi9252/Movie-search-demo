import movies from './movies.js';


// 获取页面元素: get elements 
const searchInput = document.querySelector('.movie-search-input');
const matchedMoviesDisplay = document.querySelector('.matched-movies-wrapper ul');
const findButton = document.querySelector('.find-button');
const movieContainer = document.querySelector('.movie-information-container');

// 搜索电影并更新匹配列表:find movie list
function listMovies(input) {
    if (input.length < 3) {
        matchedMoviesDisplay.innerHTML = '';
        return;
    }

    matchedMoviesDisplay.innerHTML = '';
    const occurences = movies.filter(movie =>
        movie.title.toLowerCase().includes(input.toLowerCase())
    ).map(movie => movie.title);

    if (occurences.length > 0) {
        occurences.forEach(occurence => {
            const newLi = document.createElement('li');
            newLi.textContent = occurence;
            matchedMoviesDisplay.appendChild(newLi);

            // 当点击搜索建议时，将文本复制到输入框并清空列表:click the search suggestions, and copy the query text to the input
            newLi.addEventListener('click', () => {
                searchInput.value = occurence;
                matchedMoviesDisplay.innerHTML = '';
            });
        });
    } else {
        matchedMoviesDisplay.innerHTML = '<li style="cursor: default; user-select: none;">Movie not found</li>';
    }
}

// 根据搜索输入显示电影信息: show the movie information
function getMovie() {
    const movieFound = movies.find(movie => movie.title.trim().toLowerCase() === searchInput.value.trim().toLowerCase());

    if (movieFound) {
        let genres = movieFound.genre.map(singleGenre => `<span>${singleGenre}</span>`).join("");

        let movieDetailsHTML = `
            <div class="poster-wrapper">
                <figure>
                    <img src="${movieFound.poster}" alt="${movieFound.title}">
                </figure>
            </div>
            <div class="information-container">
                <div class="information">
                    <h2>${movieFound.title}</h2>
                    <p class="release-duration">
                        <span>${movieFound.year}</span> | <span>${movieFound.runningTime}</span>
                    </p>
                    <p class="description">${movieFound.description}</p>
                    <p class="genres flex">${genres}</p>
                </div>
            </div>
        `;

        movieContainer.innerHTML = movieDetailsHTML;
        movieContainer.classList.remove('hidden');
    }
}

// 添加事件监听器: addEventListener:input \click\
searchInput.addEventListener('input', () => listMovies(searchInput.value));
findButton.addEventListener('click', getMovie);
document.querySelector('form').addEventListener('submit', event => event.preventDefault());