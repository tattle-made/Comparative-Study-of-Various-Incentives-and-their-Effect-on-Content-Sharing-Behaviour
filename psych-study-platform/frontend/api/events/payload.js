const EventNames = {
  SHARE: "SHARE",
  REACTION: "REACTION",
  READ_MORE: "READ_MORE",
};

const EventValues = {
  SHARE_YES: "YES",
  SHARE_NO: "NO",
  REACTION_HAPPY: "HAPPY",
  REACTION_ANGRY: "SAD",
  REACTION_DISGUST: "DISGUST",
  READ_MORE_YES: "YES",
  READ_MORE_NO: "NO",
};

const EventPayload = {
  SHARE_YES: (postId) => ({
    postId,
    name: EventNames.SHARE,
    value: EventValues.SHARE_YES,
  }),
  SHARE_NO: (postId) => ({
    postId,
    name: EventNames.SHARE,
    value: EventNames.SHARE_NO,
  }),
  REACTION_HAPPY: (postId) => ({
    postId,
    name: EventNames.REACTION,
    value: EventValues.REACTION_HAPPY,
  }),
  REACTION_ANGRY: (postId) => ({
    postId,
    name: EventNames.REACTION,
    value: EventNames.REACTION_ANGRY,
  }),
  REACTION_DISGUST: (postId) => ({
    postId,
    name: EventNames.REACTION,
    value: EventValues.REACTION_DISGUST,
  }),
  READ_MORE_YES: (postId) => ({
    postId,
    name: EventNames.READ_MORE,
    value: EventValues.READ_MORE_YES,
  }),
  READ_MORE_NO: (postId) => ({
    postId,
    name: EventNames.READ_MORE,
    value: EventNames.READ_MORE_NO,
  }),
};

module.exports = {
  EventNames,
  EventValues,
  EventPayload,
};
