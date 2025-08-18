export class AdminDashboardContr {
  constructor (model, view) {
    this.model = model;
    this.view = view;
    this.term = '';
  }

  async init () {
    this.view.onPageChange = async (pageNumber) => {
      const res = await this.model.getClientInformation(pageNumber, this.term);
      await this.view.displayClientInformation(res);
      await this.view.renderPagination(res);
    };

    this.view.onSearch = async (term) => {
      this.term = term;
      await this.view.onPageChange(1);
    }

    await this.view.onPageChange(1);
  }
}