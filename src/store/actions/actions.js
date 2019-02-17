export const showNewEntryForm = () => {
  return {
    type: "SHOW_ENTRY_FORM"
  };
};

export const confirmEntryForm = (entry) => {
  return {
    type: "CONFIRM_ENTRY_FORM",
    entry: entry,
  };
};

export const cancelEntryForm = () => {
  return {
    type: "CANCEL_ENTRY_FORM"
  };
};

export const addTagOnEditOrNewEntry = (addedTag) => {
  return {
    type: "ADD_TAG_EDIT_OR_NEW_ENTRY",
    addedTag: addedTag,
  };
};

export const removeTagOnEditOrNewEntry = (removedTag) => {
  return {
    type: "REMOVE_TAG_EDIT_OR_NEW_ENTRY",
    removedTag: removedTag,
  };
};
