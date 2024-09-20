const axios = require("axios");
const { response } = require("express");
const linkMapApi = "https://cep.awesomeapi.com.br/json"; 
//https://cep.awesomeapi.com.br/:format/:cep

/*versão nominatim
https://nominatim.openstreetmap.org/search?format=json&country=Brazil&lmit=1 */

async function obterLocal(cep) {
  try {
    const resposta = await axios.get(`${linkMapApi}/${cep}`);
 
    if (!resposta.data || !resposta.data.length === 0) {
      throw new Error ("coordenadas não encontradas para o CEP cadastrado!");
    }

    const { lat, lng } = resposta.data; 

    return resposta.data;
  } catch (error) {
    throw new Error("Erro ao obter coordenadas!");
  }
}

//axios retorna isso: data: {}, (status: 200, headers: {}, etc.)       // Os dados retornados pela requisição

async function obterLink(localUsuario) { 
  try {
   
    const { latitude, longitude } = localUsuario;

    if((!latitude || !latitude.length === 0) || (!longitude || !longitude.length === 0)){
      throw new Error ("Erro ao obter coordenadas para gerar o link!");
    }
    const lat = latitude
    const lon = longitude
    console.log('LAT:', lat)
    console.log('LON:', lon)
    const linkGmaps =  `https://www.google.com/maps?q=${lat},${lon}`
    // `https://www.google.com/maps/@${lat},${lon}`
         
    return linkGmaps
  } catch (error) {
    throw new Error("Erro ao obter link!");
  }
}

module.exports = { obterLocal, obterLink }