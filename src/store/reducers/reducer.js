const INITIAL_STATE = {
  isEntryFormVisible: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_ENTRY_FORM":
      return {
        ...state,
        isEntryFormVisible: true,
      };
    case "CONFIRM_ENTRY_FORM":
      return {
        ...state,
        isEntryFormVisible: false,
      };
    case "CANCEL_ENTRY_FORM":
      return {
        ...state,
        isEntryFormVisible: false,
      };
    default:
      return state;
  }
};