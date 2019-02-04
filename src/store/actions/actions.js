export const showNewEntryForm = () => {
  return {
    type: "SHOW_NEW_ENTRY_FORM"
  };
};

export const confirmNewEntry = (newEntry) => {
  return {
    type: "CONFIRM_NEW_ENTRY",
    entry: newEntry,
  };
};

export const cancelEditOrNewEntry = () => {
  return {
    type: "CANCEL_EDIT_OR_NEW_ENTRY"
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
