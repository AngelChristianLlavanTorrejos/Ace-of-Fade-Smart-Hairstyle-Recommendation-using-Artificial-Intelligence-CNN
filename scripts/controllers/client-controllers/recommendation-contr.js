export class RecommendationContr {
  constructor (model, view) {
    this.model = model;
    this.view = view;
  }

  async init () {
    await this.view.onCapture( async (file) => {
      const data = await this.model.analyzeFaceShape(file);
      setTimeout(async () => {
        await this.view.showResult(data);
      }, 2000)
    })

    await this.view.onUpload( async (file) => {
      const data = await this.model.analyzeFaceShape(file);
      setTimeout(async () => {
        await this.view.showResult(data);
      }, 2000)
    })
  }
}