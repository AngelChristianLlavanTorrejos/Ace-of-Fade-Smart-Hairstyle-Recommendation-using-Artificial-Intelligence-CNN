export class AdminDashboardModel {
  constructor () {
    this.pageSize = 10;
  }
  async getClientInformation(pageNumber = 1, search = '') {
    try {
      const res = await fetch(`https://localhost:7109/api/User/GetUserWhereRoleIsClient?pageNumber=${pageNumber}&pageSize=${this.pageSize}&search=${search}`);

      return res.json();
    }
    catch (error) {
      console.log(error);
    }
  }
}