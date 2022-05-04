class UnableToCreateNewStudyPhase extends Error {}
class UnableToUpdateStudyPhase extends Error {}
class UnableToGoToNextPhaseError extends Error {}

module.exports = {
  UnableToCreateNewStudyPhase,
  UnableToUpdateStudyPhase,
  UnableToGoToNextPhaseError,
};
