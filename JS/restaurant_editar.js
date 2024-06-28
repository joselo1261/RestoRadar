console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // restaurant_update.html?id=1
console.log(id)

const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        name:"",
        logo:"",
        website:"",
        foto:"",
        direccion:"",
        barrio:"",
        cocina:[],
        horario:"",
        precio:"",
        latitud:0,
        longitud:0,
        capacidad:0,
        //url:'http://localhost:5000/restaurantes/'+id,
        url:'https://user1261.pythonanywhere.com/restaurantes/'+id,
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.name=data.name
                    this.logo=data.logo
                    this.website=data.website
                    this.foto=data.foto
                    this.direccion=data.direccion
                    this.barrio=data.barrio
                    this.cocina=data.cocina
                    this.horario=data.horario
                    this.precio=data.precio
                    this.latitud=data.latitud
                    this.longitud=data.longitud
                    this.capacidad=data.capacidad
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let restaurant = {
                name:this.name,
                logo:this.logo,
                website:this.website,
                foto:this.foto,
                direccion:this.direccion,
                barrio:this.barrio,
                cocina:this.cocina,
                horario:this.horario,
                precio: this.precio,
                latitud: this.latitud,
                longitud: this.longitud,
                capacidad: this.capacidad
                                
            }
            var options = {
                body: JSON.stringify(restaurant),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro Modificado")
                    window.location.href = "./restaurantes.html"; // navega a la pagina       
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
