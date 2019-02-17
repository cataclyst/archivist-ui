const INITIAL_STATE = {
  isEntryFormVisible: false,
  selectedTagsOnForm: [{"label":"Rechnung"}, {"label":"Kosten"}],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_NEW_ENTRY_FORM":
      return {
        ...state,
        isEntryFormVisible: true,
        selectedTagsOnForm: [],
      };
    case "CONFIRM_NEW_ENTRY":
      return {
        ...state,
        isEntryFormVisible: false,
      };
    case "CANCEL_EDIT_OR_NEW_ENTRY":
      return {
        ...state,
        isEntryFormVisible: false,
      };
    case "ADD_TAG_EDIT_OR_NEW_ENTRY": {
      var newSelectedTags = state.selectedTagsOnForm.slice();
      if (!newSelectedTags.map(x => x.label).includes(action.addedTag.label)) {
        newSelectedTags.push(action.addedTag);
      }
      return {
        ...state,
        selectedTagsOnForm: newSelectedTags,
      };
    }
    case "REMOVE_TAG_EDIT_OR_NEW_ENTRY": {
      var newSelectedTags = state.selectedTagsOnForm.filter(x => x.label !== action.removedTag.label);

      return {
        ...state,
        selectedTagsOnForm: newSelectedTags,
      };
    }
    default:
      return state;
  }
};