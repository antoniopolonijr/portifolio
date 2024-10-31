Build a Pokémon Search App Project Certification Project

This is one of the required projects to earn my certification.

For this project, I built a Pokémon search app.

In this project, I built an app that search for Pokémon by name or ID and display the results to the user. To retrieve the Pokémon data and images, I used freeCodeCamp's PokéAPI Proxy.

PokéAPI Proxy

Usage

Use the endpoint https://pokeapi-proxy.freecodecamp.rocks/api/pokemon to see a list of all valid Pokémon names, id numbers, and URLs.

Use the endpoint https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id} to get data for a Pokémon, where {name-or-id} is the Pokémon's name or id number.

Note: Pokémon names should be in lowercase, have special characters removed, and be dash separated. Also, if the Pokémon has either ♀ or ♂ as part of its name, the format is {name-f} or {name-m}, respectively.

Example Requests
Click any of the example requests below to see its response.

All valid Pokémon:
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon

Pikachu:
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/25

Nidoran♀:
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/nidoran-f
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/29

Mr. Mime:
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/mr-mime
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/122
