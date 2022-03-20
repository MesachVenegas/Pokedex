const consult = ()=> {
    // getElementById nos devuelve un elemento dentro del DOM.
    const pokeInput = document.getElementById("poke-name");
    let pokeName = pokeInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    // Fetch nos permite hacer una consulta al API y este nos devolverá una promesa.
        // then nos permite manejar las respuesta que sera una funcion.
    fetch(url).then((answer)=> {
        if (answer.status != "200"){
            img_switcher("https://64.media.tumblr.com/0c24dd41318464f5b6780e3bfb541e70/tumblr_mjm0bk3Nf21rjnki9o1_500.gif")
        }
        else{
            return answer.json();
        }
    }).then((data) => {  // con el segundo then se obtiene la información de la respuesta en formato Json.
        console.log(data);
        let img_pokemon = data.sprites.front_default;
        img_switcher(img_pokemon)
        load_data(data)
    })
}
const img_switcher = (url) => {
    const sprite = document.getElementById("poke-sprite")
    sprite.src = url;
}
// Inserción de los datos del pokemon.
const load_data = (data) => {
    let name_pokemon  = data.name;
    let type_pkm = data.types ;
    let id_pkm = data.id;
    let altura = data.height;
    const name = document.getElementById('nombre');
    const id = document.getElementById('id');
    const type = document.getElementById("types");
    const altu = document.getElementById("altura");
    name.textContent = `Nombre: ${name_pokemon.charAt(0).toUpperCase() + name_pokemon.slice(1)}`;
    id.textContent = `ID: ${id_pkm}`;
    altu.textContent = `ID: ${altura}`;
    
    // Carga de los tipos de pokemon
    let tipos = [];
    for (const property in type_pkm){
        // console.log(property)
        let val_property = type_pkm[property];
        // console.log(val_property)
        for (const value in val_property){
            var tipo = val_property[value]
        }
        tipos.push(tipo.name)
        type.textContent= 'Tipo(s): '+ tipos;
    }
}