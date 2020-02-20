import constantes from "../constants.js";
//Esta clase es implementada en el arhivo components/main.jsx

export const cambiarCantidadOrigenes = cantidad_origenes => ({
  type: constantes.CAMBIAR_CANTIDAD_ORIGENES,
  cantidad_origenes
});

export const cambiarCantidadDestinos = cantidad_destinos => ({
  type: constantes.CAMBIAR_CANTIDAD_DESTINOS,
  cantidad_destinos
});

export const actualizarMatriz = datos => ({
  type: constantes.ACTUALIZAR_MATRIZ,
  datos
});

export const cambiarDemanda = demanda => ({
  type: constantes.CAMBIAR_DEMANDAS,
  demanda
});

export const cambiarOferta = oferta => ({
  type: constantes.CAMBIAR_OFERTAS,
  oferta
});

export const actualizarOfertaVolume = ofertaVolume => ({
  type: constantes.OBTENER_OFERTA_VOLUME,
  ofertaVolume
});

export const actualizarDemandaVolume = demandaVolume => ({
  type: constantes.OBTENER_DEMANDA_VOLUME,
  demandaVolume
});

export const updateState = newState => ({
  type: constantes.UPDATE_STATE,
  newState
});
