export function fetchPokeList(){
    let list = [];
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
      .then(response => response.json())
      .then(data => 
        data.results.forEach(element => {
          fetch('https://pokeapi.co/api/v2/pokemon/' + element.name)
            .then(response => response.json())
            .then(data => list.push(data))
            list.sort((a, b) => { a.id - b.id });
            return list;
        }))
    return list;
}
