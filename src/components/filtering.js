import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach(elementName => {
        const items = Object.values(indexes[elementName]);
        elements[elementName].append(
            ...items.map(name => {
                const opt = document.createElement('option');
                opt.value = name;
                opt.textContent = name;
                return opt;
            })
        );
    }); 

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const field = wrapper?.dataset?.field;
            const wrapper = action.closest('[data-field]');
            const input = wrapper?.querySelector('input, select, textarea');
            if (field && input) {
                input.value = '';
                if (state && field in state) state[field] = '';
            }
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}