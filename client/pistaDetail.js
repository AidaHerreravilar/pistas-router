let params = [];
document.querySelector("#identificador").innerHTML = params['id'];
document.querySelector("#titulo").innerHTML = params['titulo'];
document.querySelector("#duracion").innerHTML = params['duracion'];
document.querySelector("#interprete").innerHTML = params['interprete'];


function processParams() {
    let paramstr = window.location.search.substr(1);
    let paramarr = paramstr.split("&");
    for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
    }

    }
    async function load(){
        try {
            processParams();
            let response = await fetch(`/pistas/${params["id"]}`);
            console.log(response);
            if (response.ok) {
            let t = await response.json();
            document.querySelector("#identificador").innerHTML = t['identificador'];
            document.querySelector("#titulo").innerHTML = t['titulo'];
            document.querySelector("#duracion").innerHTML = t['duracion'];
            document.querySelector("#interprete").innerHTML = t['interprete'];
            }
            Else
            container.innerHTML = "<h1>Error - Failed URL!</h1>";
            }
        
            catch (response) {
                console.log(response);
                container.innerHTML = "<h1>Connection error</h1>";
            };
        }