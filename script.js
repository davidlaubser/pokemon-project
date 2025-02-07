// Function to fetch Pokemon information from the PokeAPI
async function getPokemonInfo(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    // Attempt to fetch data from the PokeAPI
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Extract and return relevant Pokemon data
        return {
            name: data.name,
            weight: data.weight / 10, // Convert to kg
            abilities: data.abilities.map(ability => ({
                name: ability.ability.name,
                is_hidden: ability.is_hidden,
                slot: ability.slot
            }))
        };
        // Catches and logs any errors that occur during the fetch operation
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

// Function to display Pokemon information on the webpage
async function displayPokemonInfo(pokemonName) {
    const pokemonInfoElement = document.getElementById('pokemon-info');
    const loadingElement = document.getElementById('loading');

    // Clear previous info if no Pokemon is selected
    if (!pokemonName) {
        pokemonInfoElement.innerHTML = '';
        return;
    }

    // Show loading spinner and clear previous info
    loadingElement.style.display = 'flex';
    pokemonInfoElement.innerHTML = '';

    try {
        // Fetch and process Pokemon data
        const pokemonData = await getPokemonInfo(pokemonName);

        // Log Pokemon information to the console
        console.log(`Name: ${pokemonData.name}`);
        console.log(`Weight: ${pokemonData.weight} kg`);
        console.log('Abilities:');
        pokemonData.abilities.forEach(ability => {
            console.log(`- ${ability.name} (Hidden: ${ability.is_hidden}, Slot: ${ability.slot})`);
        });

        // Display Pokemon information on the webpage
        pokemonInfoElement.innerHTML = `
            <h2>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
            <p><strong>Weight:</strong> ${pokemonData.weight} kg</p>
            <p><strong>Abilities:</strong></p>
            <ul>
                ${pokemonData.abilities.map(ability => `
                    <li>
                        <span class="ability-name">${ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}</span>
                        <span class="ability-info">(Hidden: ${ability.is_hidden ? 'Yes' : 'No'}, Slot: ${ability.slot})</span>
                    </li>
                `).join('')}
            </ul>
        `;
    } catch (error) {
        console.error('Error displaying Pokemon info:', error);
        pokemonInfoElement.innerHTML = '<p class="error">Error fetching Pokemon information. Please try again.</p>';
    } finally {
        // Hide loading spinner
        loadingElement.style.display = 'none';
    }
}

// Event listener for Pokemon selection dropdown
document.getElementById('pokemon-select').addEventListener('change', function () {
    const selectedPokemon = this.value;
    displayPokemonInfo(selectedPokemon);
});

// Initialize the page with an empty state
displayPokemonInfo('');


// References:
// 1. MDN Web Docs: Using Fetch - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//    - Relevant to: Fetching Pokémon data in `getPokemonInfo` function

// 2. JavaScript.info: Promises - https://javascript.info/promise-basics
//    - Relevant to: Handling promises in `getPokemonInfo` and `displayPokemonInfo` functions

// 3. MDN Web Docs: Array.prototype.map() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//    - Relevant to: Mapping over Pokémon abilities in `getPokemonInfo` function

// 4. MDN Web Docs: DOM Manipulation - https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
//    - Relevant to: Updating the DOM with Pokémon data in `displayPokemonInfo` function

// 5. PokeAPI Documentation - https://pokeapi.co/docs/v2
//    - Relevant to: Understanding API response structure in `getPokemonInfo` function

// 6. JavaScript Fetch API Tutorial (YouTube) - https://www.youtube.com/watch?v=Oive66jrwBs
//    - Relevant to: Implementation of fetch in `getPokemonInfo` function

// 7. JavaScript Promises (YouTube) - https://www.youtube.com/watch?v=DHvZLI7Db8E
//    - Relevant to: Async operations in `getPokemonInfo` and `displayPokemonInfo` functions

// 8. Understanding Async Await (YouTube) - https://www.youtube.com/watch?v=V_Kr9OSfDeU
//    - Relevant to: Usage of async/await in `getPokemonInfo` and `displayPokemonInfo` functions

// 9. Error handling in async functions - https://javascript.info/async-await#error-handling
//    - Relevant to: Try-catch blocks in `getPokemonInfo` and `displayPokemonInfo` functions

// 11. MDN Web Docs: EventTarget.addEventListener - https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
//     - Relevant to: Event listener for Pokemon selection dropdown

// 12. MDN Web Docs: Working with JSON - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
//     - Relevant to: Parsing JSON response in `getPokemonInfo` function

// 14. Traversy Media: Pokemon API Project - https://www.youtube.com/watch?v=cuEtnrL9-H0
//     - Relevant to: Overall project structure and API integration

// 17. Kenny Yip Coding: Build a Pokedex with JavaScript and PokeAPI - https://www.youtube.com/watch?v=dVtnFH4m_fE
//     - Relevant to: Fetching and displaying Pokemon data

// 18. TA Coding: Build your own Pokédex with React JS - https://www.youtube.com/watch?v=E-T5R_GhT-k
//     - Relevant to: Project structure and API response handling

// 19. JustProgramIT: Level Up Your Node.js Skills with PokeAPI - https://www.youtube.com/watch?v=NZ1qQos2aEo
//     - Relevant to: Error handling and data display techniques

// 20. Kristina Dev: Building a Pokemon Card Collection with React and Chakra UI - https://dev.to/kristinadev/building-a-pokemon-card-collection-with-react-and-chakra-ui-1odc
//     - Relevant to: Styling ideas for Pokemon data display

// 21. Fidal Mathew: Build Pokemon Finder using React and Pokeapi - https://dev.to/fidalmathew/build-pokemon-finder-using-react-and-pokeapi-5b5k
//     - Relevant to: Fetching and displaying Pokemon data


// Referencing note:
// Not all the listed references are directly relevant to this task, but they provide additional context and insights into the project.
