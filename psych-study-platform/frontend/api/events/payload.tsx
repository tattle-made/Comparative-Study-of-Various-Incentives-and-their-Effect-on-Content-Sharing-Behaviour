const enum EventNames  {
  SHARE = "SHARE",
  REACTION = "REACTION",
  READ_MORE = "READ_MORE",
};

const enum EventValues {
  SHARE_YES = "YES",
  SHARE_NO = "NO",
  REACTION_HAPPY = "HAPPY",
  REACTION_ANGRY = "ANGRY",
  REACTION_DISGUST = "DISGUST",
  READ_MORE_YES = "YES",
  READ_MORE_NO = "NO",
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
    value: EventValues.SHARE_NO,
  }),
  REACTION_HAPPY: (postId) => ({
    postId,
    name: EventNames.REACTION,
    value: EventValues.REACTION_HAPPY,
  }),
  REACTION_ANGRY: (postId) => ({
    postId,
    name: EventNames.REACTION,
    value: EventValues.REACTION_ANGRY,
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
    value: EventValues.READ_MORE_NO,
  }),
};

const makePostPostMetricPayload = (reaction)=>{
  let reactionPayload;
  if (reaction === EventValues.REACTION_HAPPY)
    reactionPayload = EventPayload.REACTION_HAPPY;
  else if (reaction === EventValues.REACTION_ANGRY)
    reactionPayload = EventPayload.REACTION_ANGRY;
  else if (reaction === EventValues.REACTION_DISGUST)
    reactionPayload = EventPayload.REACTION_DISGUST;
  else throw new Error("Unexpected Reaction Value");
  
  return reactionPayload
}

module.exports = {
  EventPayload,
  EventValues,
  EventNames,
  makePostPostMetricPayload
};
