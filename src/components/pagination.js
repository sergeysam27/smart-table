import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    // @todo: #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();

    return (data, state, action) => {
        // @todo: #2.1 — посчитать количество страниц, объявить переменные и константы
        const rowsPerPage = state.rowsPerPage;
        const pageCount = Math.ceil(Math.max(1, data.length) / Math.max(1, rowsPerPage));
        let page = Math.min(Math.max(1, state.page), Math.max(1, pageCount));    
        // @todo: #2.6 — обработать действия
        if (action) switch (action.name) {
            case 'prev':  page = Math.max(1, page - 1); break;
            case 'next':  page = Math.min(pageCount, page + 1); break;
            case 'first': page = 1; break;
            case 'last':  page = pageCount; break;
            default: break;
        }
        // @todo: #2.4 — получить список видимых страниц и вывести их
        const visiblePages = getPages(page, pageCount, 5);
        pages.replaceChildren(
            ...visiblePages.map(p => {
                const el = pageTemplate.cloneNode(true);
                return createPage(el, p, p === page);
        }));
        // @todo: #2.5 — обновить статус пагинации
        fromRow.textContent = data.length ? ((page - 1) * rowsPerPage + 1) : 0;
        toRow.textContent   = data.length ? Math.min(page * rowsPerPage, data.length) : 0;
        totalRows.textContent = data.length;
        // @todo: #2.2 — посчитать сколько строк нужно пропустить и получить срез данных
        const skip = (page - 1) * rowsPerPage;
        return data.slice(skip, skip + rowsPerPage);
    }
}