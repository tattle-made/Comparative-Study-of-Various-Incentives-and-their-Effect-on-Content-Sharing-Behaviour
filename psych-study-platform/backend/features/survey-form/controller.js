const { sequelize, SurveyForm } = require("../../sequelize/models");

async function saveForm(userId, form) {
  var fields = Object.keys(form).map((key) => ({ key, value: form[key] }));

  try {
    await sequelize.transaction(async (t) => {
      for (const field of fields) {
        await SurveyForm.create(
          {
            user: userId,
            key: field.key,
            value: field.value,
          },
          { transaction: t }
        );
      }
    });
  } catch (err) {
    console.error("Could not Save Survey Form", err);
    throw new CouldNotSaveSurveyResponse();
  }
}

module.exports = {
  saveForm,
};
