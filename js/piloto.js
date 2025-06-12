document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const driverId = params.get("id");

    const pilotName = document.getElementById("pilot-name");
    const pilotImg = document.getElementById("pilot-img");
    const pilotNacionalidad = document.getElementById("pilot-nacionalidad");
    const pilotEquipo = document.getElementById("pilot-equipo");
    const pilotBio = document.getElementById("pilot-bio");
    const pilotVictorias = document.getElementById("pilot-victorias");
    const pilotPodios = document.getElementById("pilot-podios");
    const pilotDebut = document.getElementById("pilot-debut");

    const imagenesPilotos = {
        "max_verstappen": "verstappen.png",
        "lewis_hamilton": "hamilton.png",
        "charles_leclerc": "leclerc.png",
        "fernando_alonso": "fernando.png",
        "sergio_perez": "perez.png",
        "george_russell": "russell.png",
        "carlos_sainz": "sainz.png",
        "alexander_albon": "albon.png",
        "lando_norris": "norris.png",
        "yuki_tsunoda": "tsunoda.png",
        "valtteri_bottas": "bottas.png",
        "oscar_piastri": "piastri.png",
        "oliver_bearman": "bearman.png",
        "franco_colapinto": "colapinto.png",
        "jack_doohan": "doohan.png",
        "pierre_gasly": "gasly.png",
        "esteban_ocon": "ocon.png",
        "daniel_ricciardo": "ricciardo.png",
        "lance_stroll": "stroll.png",
        "nico_hulkenberg": "hulkenberg.png",
        "logan_sargeant": "sargeant.png",
        "zhou_guanyu": "zhou.png",
        "liam_lawson": "lawson.png",
        "kevin_magnussen": "magnussen.png"
    };

    fetch("https://my-json-server.typicode.com/camsanz10/f1-fakeapi/drivers-details")
        .then(response => response.json())
        .then(drivers => {
            const piloto = drivers.find(p => p.id === driverId);

            if (!piloto) {
                pilotName.textContent = "Piloto no encontrado.";
                return;
            }

            pilotName.textContent = piloto.nombre;
            const nombreArchivo = imagenesPilotos[driverId] || "default.png";
            pilotImg.src = `../img/${nombreArchivo}`;
            pilotImg.alt = piloto.nombre;

            pilotNacionalidad.textContent = `Nacionalidad: ${piloto.nacionalidad}`;
            pilotEquipo.textContent = `Equipo: ${piloto.equipo}`;
            pilotBio.textContent = `Biografía: ${piloto.biografia}`;
            pilotVictorias.textContent = `Victorias: ${piloto.victorias}`;
            pilotPodios.textContent = `Podios: ${piloto.podios}`;
            pilotDebut.textContent = `Debut en F1: ${piloto.debut}`;

            const botonFavorito = document.querySelector(".add-to-favorites");
            const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
            const favoritos = JSON.parse(localStorage.getItem("favoritos")) || {};
            const imagen = `../img/${nombreArchivo}`;

            if (usuario) {
                if (!favoritos[usuario.nombre]) {
                    favoritos[usuario.nombre] = { pilotos: [], circuitos: [] };
                }

                const yaExiste = favoritos[usuario.nombre].pilotos.some(p => p.id === driverId);
                if (yaExiste) {
                    botonFavorito.textContent = "✅ En Favoritos";
                    botonFavorito.disabled = true;
                }

                botonFavorito.addEventListener("click", () => {
                    if (!usuario) {
                        alert("Debes iniciar sesión para agregar favoritos.");
                        return;
                    }

                    const yaExisteAhora = favoritos[usuario.nombre].pilotos.some(p => p.id === driverId);
                    if (yaExisteAhora) {
                        alert("Este piloto ya está en tus favoritos.");
                        return;
                    }

                    favoritos[usuario.nombre].pilotos.push({
                        id: driverId,
                        nombre: piloto.nombre,
                        imagen
                    });

                    localStorage.setItem("favoritos", JSON.stringify(favoritos));
                    alert("Piloto agregado a favoritos.");

                    botonFavorito.textContent = "✅ En Favoritos";
                    botonFavorito.disabled = true;
                });
            } else {
                botonFavorito.addEventListener("click", () => {
                    alert("Debes iniciar sesión para agregar favoritos.");
                });
            }
        })
        .catch(error => {
            console.error("Error al cargar los datos del piloto:", error);
        });
});