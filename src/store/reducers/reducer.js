const INITIAL_STATE = {
  isEntryFormVisible: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_NEW_ENTRY_FORM":
    return {
      ...state,
      isEntryFormVisible: true,
    };
    default:
    return state;
  }
};