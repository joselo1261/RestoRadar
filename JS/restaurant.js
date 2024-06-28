const { createApp } = Vue
  createApp({
    data() {
      return {
        restaurantes:[],
        url:'https://user1261.pythonanywhere.com/restaurantes',
        // url:'http://localhost:5000/restaurantes', => Para usar con SQL 
        // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        error: null,
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
        capacidad:0
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                this.restaurantes = data;
                this.cargando = false;
              })
              .catch(err => {
                console.error('Error fetching data:', err);
                this.error = true;
              });
          },
        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.text();
        })
        .then(res => {
          alert('Registro Eliminado');
          location.reload(); // Recarga la página después de eliminar el registro
        })
        .catch(err => {
          console.error('Error deleting record:', err);
          alert('Error al eliminar registro');
        });
    },
    
        grabar(){
            let restaurant = {
                name:this.name,
                logo:this.logo,
                website: this.website,
                foto: this.foto,
                direccion: this.direccion,
                barrio:this.barrio,
                cocina:this.cocina,
                horario:this.horario,
                precio:this.precio,
                latitud:this.latitud,
                longitud:this.longitud,
                capacidad:this.capacidad
            }
            var options = {
                body:JSON.stringify(restaurant),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro Grabado")
                    window.location.href = "./restaurantes.html";  // recarga la pagina
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
