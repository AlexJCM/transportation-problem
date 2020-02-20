import c from "../constants.js";

export const changeRowsCount = cantidad_origenes => ({
  type: c.CHANGE_ROWS_COUNT,
  cantidad_origenes
});

export const changeColumnsCount = cantidad_destinos => ({
  type: c.CHANGE_COLUMNS_COUNT,
  cantidad_destinos
});

export const updateMatriz = datos => ({
  type: c.UPDATE_MATRIX,
  datos
});

export const changeDemanda = demanda => ({
  type: c.CHANGE_NEEDS,
  demanda
});

export const changeOferta = oferta => ({
  type: c.CHANGE_STORAGE,
  oferta
});

export const updateOfertaVolume = ofertaVolume => ({
  type: c.GET_STORAGE_VOLUME,
  ofertaVolume
});

export const updateDemandaVolume = demandaVolume => ({
  type: c.GET_NEEDS_VOLUME,
  demandaVolume
});

export const updateState = newState => ({
  type: c.UPDATE_STATE,
  newState
});
