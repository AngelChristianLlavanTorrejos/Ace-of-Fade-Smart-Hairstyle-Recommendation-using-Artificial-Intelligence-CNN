export class AdminDashboardView {
  constructor() {
    this.clientInformation = document.querySelector('.js-client-information')
    this.pagination = document.querySelector('.js-pagination');
    this.pageResults = document.querySelector('.js-page-results');
    this.onPageChange = null;
    this.onSearch = null;
    
    this.search = document.querySelector('.js-search');
    if (this.search) {
      this.search.addEventListener('input', (e) => {
        const term = e.target.value.trim();
        if (typeof this.onSearch === 'function') {
          this.onSearch(term);
        }
      })
    }
  }

  createCell (value) {
    const cell = document.createElement('td');
    cell.textContent = value;
    return cell;
  }

  createButton (text, val) {
    const button = document.createElement('button');
    button.className = 'btn btn-primary ms-1';
    button.textContent = `${text}`
    button.onclick = () => {
      if (typeof this.onPageChange === 'function') {
        this.onPageChange(val);
      }
    }
    return button;
  }

  async displayClientInformation (clients) {

    if (!this.clientInformation) return;

    this.clientInformation.innerHTML = '';

    if (clients.data.length === 0) {
      this.clientInformation.innerHTML = '<tr><td colspan="3">No Clients Found</td></tr>';
      return;
    }

    clients.data.forEach(client => {
      const row = document.createElement('tr');
      row.style = "cursor: pointer";

      const cells = {
        userId: this.createCell(client.userId),
        name: this.createCell(client.name),
        registration: this.createCell(client.registrationDate)
      }

      Object.values(cells).forEach(cell => {
        row.appendChild(cell);
      })

      row.addEventListener('click', () => {
        location.href = `client-details.html?id=${client.userId}`;
      })

      this.clientInformation.appendChild(row);
    })
  }

  async renderPagination(result) {
    this.pagination.innerHTML = '';

    const totalPages = Math.ceil(result.totalCount / result.pageSize);
    let currentPage = result.pageNumber;

    if (result.data.length < 1) {
      this.pageResults.textContent = `Page 0 of 0 Page`;
    }
    else {
      this.pageResults.textContent = `Page ${currentPage} of ${totalPages} Pages`;
    }

    if (totalPages === 1) {
      const currentPageBtn = this.createButton('1', 1);
      currentPageBtn.disabled = true;

      const nextBtn = this.createButton('Next', 2);
      nextBtn.disabled = true;

      this.pagination.appendChild(currentPageBtn);
      this.pagination.appendChild(nextBtn);
      return;
    }

    if (currentPage === 1) {
      const currentPageBtn = this.createButton('1', 1);
      currentPageBtn.disabled = true;

      const nextBtn = this.createButton('Next', 2);

      this.pagination.appendChild(currentPageBtn);
      this.pagination.appendChild(nextBtn);
      return;
    }

    if (currentPage === totalPages) {
      const prevBtn = this.createButton('Prev', currentPage - 1);
      const prevPageBtn = this.createButton(currentPage - 1, currentPage - 1);
      const currentPageBtn = this.createButton(currentPage, currentPage);

      currentPageBtn.disabled = true;

      this.pagination.appendChild(prevBtn);
      this.pagination.appendChild(prevPageBtn);
      this.pagination.appendChild(currentPageBtn);
      return;
    }

    const prevBtn = this.createButton('Prev', currentPage - 1);
    const prevPageBtn = this.createButton(currentPage - 1, currentPage - 1);
    const currentPageBtn = this.createButton(currentPage, currentPage);
    const nextPageBtn = this.createButton(currentPage + 1, currentPage + 1);
    const nextBtn = this.createButton('Next', currentPage + 1);

    currentPageBtn.disabled = true;

    this.pagination.appendChild(prevBtn);
    this.pagination.appendChild(prevPageBtn);
    this.pagination.appendChild(currentPageBtn);
    this.pagination.appendChild(nextPageBtn);
    this.pagination.appendChild(nextBtn);
  }

}