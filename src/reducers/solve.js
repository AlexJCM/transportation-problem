import constantes from "../constants";

const solve = (
  state = {},
  { type, oferta_volume, demanda_volume, newState }
) => {
  switch (type) {
    case constantes.OBTENER_OFERTA_VOLUME:
      return {
        ...state,
        oferta_volume
      };
    case constantes.OBTENER_DEMANDA_VOLUME:
      return {
        ...state,
        demanda_volume
      };
    case constantes.UPDATE_STATE:
      return {
        ...state,
        ...newState
      };

    default:
      return state;
  }
};

export default solve;
