const INITIAL_STATE = {};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_ENTRY_FORM":
      return {
        ...state,
        entryBeingEdited: action.entryID,
      };
    case "CONFIRM_ENTRY_FORM":
      return {
        ...state,
      };
    case "CANCEL_ENTRY_FORM":
      return {
        ...state,
      };
    default:
      return state;
  }
};