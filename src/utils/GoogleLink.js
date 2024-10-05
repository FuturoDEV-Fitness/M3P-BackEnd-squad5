module.exports.getGoogleMapsLink = async (lat, lon) => {
  try {
    const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
    return googleMapsLink;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao gerar o link do Google Maps");
  }
};
