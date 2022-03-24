const consult = ()=> {
    // getElementById nos devuelve un elemento dentro del DOM.
    const pokeInput = document.getElementById("poke-name");
    let pokeName = pokeInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    // Fetch nos permite hacer una consulta al API y este nos devolverá una promesa.
        // then nos permite manejar las respuesta que sera una funcion.
    fetch(url).then((answer)=> {
        if (answer.status != "200"){
            img_switcher("/Img/sad_pokemon.png")
        }
        else{
            return answer.json();
        }
    }).then((data) => {  // con el segundo then se obtiene la información de la respuesta en formato Json.
        console.log(data);
        let img_pokemon = data.sprites.front_default;
        img_switcher(img_pokemon)
        load_data(data)
        bar_fill(data)
    })
}
const img_switcher = (url) => {
    const sprite = document.getElementById("poke-sprite")
    sprite.src = url;
    sprite.width = 250;
}
// Inserción de los datos del pokemon.
const load_data = (data) => {
    let name_pokemon  = data.name;
    let type_pkm = data.types ;
    let id_pkm = data.id;
    let altura = data.height;
    let habilidades = data.abilities
    const name = document.getElementById('nombre');
    const id = document.getElementById('id');
    const type = document.getElementById("types");
    const alt = document.getElementById("altura");
    name.textContent = `${name_pokemon.charAt(0).toUpperCase() + name_pokemon.slice(1)}`;
    id.textContent = `${id_pkm}`;
    alt.textContent = `${altura}`;
    console.log(habilidades)

    // Carga de los tipos de pokemon
    let tipos = [];
    for (const property in type_pkm){
        // console.log(property)
        let val_property = type_pkm[property];
        // console.log(val_property)
        for (const value in val_property){
            var tipo = val_property[value];
        }
        tipos.push(tipo.name);
        // Representacion de info de estados del pokemon según sus tipos.
        if(tipos.length > 1){
            type.textContent= `${tipos[0].charAt(0).toUpperCase() + tipos[0].slice(1)} / ${tipos[1].charAt(0).toUpperCase() + tipos[1].slice(1)}`;
        }
        else{
            type.textContent= tipos;
        }
    }
}

// Stats base del pokemon
const bar_fill = (data) => {
    let stats = data.stats;
    let hp = document.getElementById('hp-data')
    let atk = document.getElementById('atk-data')
    let df= document.getElementById('df-data')
    let es_atk = document.getElementById('es_atk-data')
    let es_df = document.getElementById('es_def-data')
    let speed = document.getElementById('speed-data')
    console.log(stats)
    hp.textContent = stats[0].base_stat
    atk.textContent = stats[1].base_stat
    df.textContent = stats[2].base_stat
    es_atk.textContent = stats[3].base_stat
    es_df.textContent = stats[4].base_stat
    speed.textContent = stats[5].base_stat
}