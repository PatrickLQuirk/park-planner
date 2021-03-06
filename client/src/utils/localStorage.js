export const getSavedActivityIds = () => {
  const savedActivityIds = localStorage.getItem('saved_activities')
    ? JSON.parse(localStorage.getItem('saved_activities'))
    : [];

  return savedActivityIds;
};

export const saveActivityIds = (activityIdArr) => {
  if (activityIdArr.length) {
    localStorage.setItem('saved_activities', JSON.stringify(activityIdArr));
  } else {
    localStorage.removeItem('saved_activities');
  }
};

export const removeActivityId = (activityId) => {
  const savedActivityIds = localStorage.getItem('saved_activities')
    ? JSON.parse(localStorage.getItem('saved_activities'))
    : null;

  if (!savedActivityIds) {
    return false;
  }

  const updatedSavedActivityIds = savedActivityIds?.filter((savedActivityId) => savedActivityId !== activityId);
  localStorage.setItem('saved_activities', JSON.stringify(updatedSavedActivityIds));

  return true;
};
