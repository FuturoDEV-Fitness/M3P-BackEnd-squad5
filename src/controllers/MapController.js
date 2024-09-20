const Local = require('../models/Local')
const { obterLink } = require('../services/geoFinder')

class MapController {
async listarLinK(request, response){
try {
    const { local_id } = request.params

const localUsuario = await Local.findByPk(local_id)
if(!localUsuario){ return response.status(404).json({mensagem: 'local não encontrado para este ID'})}

if(localUsuario.idUsuario !== request.usuarioId){
    return response
    .status(401)
    .json({ mensagem: "O local buscado não foi cadastrado por você" });
}

const linkGmaps = await obterLink(localUsuario)
console.log('LOCAL:', localUsuario)
console.log('LINK:', linkGmaps)
response.status(201).json({ link: linkGmaps })

} catch (error) {
    console.log('Erro ao obter link do Google Maps:', error);
    response
    .status(500)
    .json({ mensagem: "erro ao gerar link do GoogleMaps" });
}

}


}

module.exports = new MapController()