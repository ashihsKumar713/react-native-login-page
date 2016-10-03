import config from './../config'

const callAPI = (  api, data, method = 'post' ) => {
	return fetch(config.baseURL + api,{
		method: method,
		mode: 'cors',
		cache: 'no-cache',
		headers: new Headers({
			'Access-Control-Allow-Headers' : '*',
			'APP_ID': config.appBundle
		}),
		body: JSON.stringify(data)
	}).then( (response) => {
		if(response.status === 500){
			return new Promise( (resolve,reject) => {
				response.json().then((data) => {
					reject({message: 'Registration Failed'});
				}).catch( ( err ) => console.log("err:  ",err) );
			});
		}else{
			if(response.status == 200){
				return new Promise( (resolve,reject) => {
					response.json().then((data) => {
						resolve(data);
					});
				});
			}
		}
	}, ( err ) => console.log(err))
}



module.exports = callAPI;
