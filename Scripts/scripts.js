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
        // console.log(data);
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
    alt.textContent = `${altura.toString()}0 cm`;
    // console.log(habilidades)

    // Carga de los tipos de pokemon
    let tipos = [];
    let icon_type =  document.getElementById('icon_type');
    let icon_type2 =  document.getElementById('icon_type2');
    console.log(icon_type)
    console.log(icon_type2)
    for (const property in type_pkm){
        // console.log(property)
        let val_property = type_pkm[property];
        // console.log(val_property)
        for (const value in val_property){
            var tipo = val_property[value];
        }
        tipos.push(tipo.name);
        // Muestra de el tipo al que pertenece el pokemon.
        icon_type.width = "55";
        icon_type.alt = tipos[0]
        icon_type2.width = "55";
        icon_type2.alt = tipos[1]
        console.log(tipos[0])
        console.log(tipos[1])

        switch(tipos[0]){
            case "fire":
                icon_type.src = "./Img/Tipos/fuego.png";
                break;
            case "water":
                icon_type.src = "./Img/Tipos/agua.png";
                break;
            case "poison":
                icon_type.src = "./Img/Tipos/veneno.png";
                break;
            case "grass":
                icon_type.src = "./Img/Tipos/planta.png";
                break;
            case "psychic":
                icon_type.src = "./Img/Tipos/psiquico.png";
                break;
            case "rock":
                icon_type.src = "./Img/Tipos/roca.png";
                break;
            case "ground":
                icon_type.src = "./Img/Tipos/tierra.png";
                break;
            default:
                icon_type.width = "30";
                icon_type.width = "./Img/pokeball_type.png";
                break;
        }
        if(tipos[1]){
            icon_type2.style = "visibility: visible"
            switch(tipos[1]){
                case "fire":
                    icon_type2.src = "./Img/Tipos/fuego.png";
                    break;
                case "water":
                    icon_type2.src = "./Img/Tipos/agua.png";
                    break;
                case "poison":
                    icon_type2.src = "./Img/Tipos/veneno.png";
                    break;
                case "grass":
                    icon_type2.src = "./Img/Tipos/planta.png";
                    break;
                case "psychic":
                    icon_type2.src = "./Img/Tipos/psiquico.png";
                    break;
                case "rock":
                    icon_type2.src = "./Img/Tipos/roca.png";
                    break;
                case "ground":
                    icon_type2.src = "./Img/Tipos/tierra.png";
                    break;
                default:
                    icon_type2.width = "30";
                    icon_type2.width = "./Img/pokeball_type.png";
                    break;
            }
        }
        else{
                icon_type2.style = "visibility: hidden"
            }
        // if(tipos.length > 1){
        //     type.textContent= `${tipos[0].charAt(0).toUpperCase() + tipos[0].slice(1)} / ${tipos[1].charAt(0).toUpperCase() + tipos[1].slice(1)}`;
        // }
        // else{
        //     type.textContent= `${tipos[0].charAt(0).toUpperCase() + tipos[0].slice(1)}`;
        // }
    }
}

// Stats base del pokemon
const bar_fill = (data) => {
    let stats = data.stats;
    // console.log(stats);
    // Obtención de  los elementos para cambio de cantidad.
    let hp = document.getElementById('hp-data');
    let atk = document.getElementById('atk-data');
    let def= document.getElementById('df-data');
    let es_atk = document.getElementById('es_atk-data');
    let es_def = document.getElementById('es_def-data');
    let speed = document.getElementById('speed-data');
    hp_value = stats[0].base_stat;
    atk_value = stats[1].base_stat;
    def_value = stats[2].base_stat;
    es_atk_value = stats[3].base_stat;
    es_def_value = stats[4].base_stat;
    speed_value = stats[5].base_stat;
    hp.textContent = hp_value;
    atk.textContent = atk_value;
    def.textContent = def_value;
    es_atk.textContent = es_atk_value;
    es_def.textContent = es_def_value;
    speed.textContent = speed_value;
    // Obtención de barras de estadísticas para cambio de porcentaje.
    let bar_hp = document.getElementById('bar_hp');
    let bar_atk = document.getElementById('bar_atk');
    let bar_def = document.getElementById('bar_def');
    let bar_es_atk = document.getElementById('bar_es_atk');
    let bar_es_def = document.getElementById('bar_es_def');
    let bar_speed = document.getElementById('bar_speed');

    bar_hp.classList.add(`skill-fill-${calcular_porcentaje(hp_value)}`)
    bar_atk.classList.add(`skill-fill-${calcular_porcentaje(atk_value)}`)
    bar_def.classList.add(`skill-fill-${calcular_porcentaje(def_value)}`)
    bar_es_atk.classList.add(`skill-fill-${calcular_porcentaje(es_atk_value)}`)
    bar_es_def.classList.add(`skill-fill-${calcular_porcentaje(es_def_value)}`)
    bar_speed.classList.add(`skill-fill-${calcular_porcentaje(speed_value)}`)

}
const calcular_porcentaje = (valor) => {
    let result =  Math.round(valor * 100 / 180)
    return result
}