import c from "../constants";

const solve = (state = {}, { type, ofertaVolume, demandaVolume, newState }) => {
  switch (type) {
    case c.GET_STORAGE_VOLUME:
      return {
        ...state,
        ofertaVolume
      };
    case c.GET_NEEDS_VOLUME:
      return {
        ...state,
        demandaVolume
      };
    case c.UPDATE_STATE:
      return {
        ...state,
        ...newState
      };

    default:
      return state;
  }
};

export default solve;
