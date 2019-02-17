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