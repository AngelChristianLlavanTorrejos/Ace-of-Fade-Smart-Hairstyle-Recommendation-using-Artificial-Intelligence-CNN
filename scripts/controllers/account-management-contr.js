export const accountManagementContr = {
  async init (model, view, id) {
    const personalInformation = await model.fetchPersonalInformation(id);
    await view.renderPersonalInformation(personalInformation);
    await view.renderUpdate(personalInformation);
    await view.renderChangePassword();
    await view.onSubmit(async (data) => {
      try {
        console.log(data);

        const res = await model.updateProfileInformation(id, data);

        console.log(res);

        const updatedInformation = await model.fetchPersonalInformation(id);
        await view.renderPersonalInformation(updatedInformation);
        await view.renderUpdate(updatedInformation);
      }
      catch (error) {
        console.log(error);
      }
    })
    await view.onSubmitPasswordForm( async (data) => {
      const res = await model.changePassword(id, data);
      view.showChangePasswordErrors(res);
      view.renderChangePassword()
    })
  }
}