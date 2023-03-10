var vue_app = new Vue({
	el: "#app",
	vuetify: new Vuetify(),
	data: {
		text: '',
		hashed: '',
		info: { values: [] },
	},
	methods: {
		hash: function () {
			this.info.values.push(this.text); //Guardamos en el info values el texto, y mandamos el objeto info a través del body.
			fetch("http://localhost:7080/hash/",
				{
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					credentials: "include",
					body: JSON.stringify(this.info),
					mode: "cors",
					cache: "default"
				}
			).then(
				(response) => {
					return (response.json());
				}
			).then(
				(data) => {
					console.log(data);
					this.hashed = data; //guardamos el texto  hasheado enviado desde el server, y lo guardamos en la variable hashed, que la usaremos en el html
				}
			).catch(
				(error) => {
					console.log(error);
				}
			);
		}
	}
});