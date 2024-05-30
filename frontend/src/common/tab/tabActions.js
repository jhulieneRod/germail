const tabChageKey = '_tabChange';
export function selectTab(tabId, parentID) {
    let tabsSelect = {};

    let tabChage = JSON.parse(localStorage.getItem(tabChageKey));

    if (tabChage) {
        tabsSelect = tabChage;
    }

    if (!tabsSelect[parentID]) {
        tabsSelect[parentID] = {
            select: '',
            show: []
        }
    }

    tabsSelect[parentID].select = tabId;

    localStorage.setItem(tabChageKey, JSON.stringify(tabsSelect))
    return {
        type: 'TAB_SELECTED_OBJ',
        payload: tabsSelect
    }
}

export function showTabs(tabIds, parentID) {
    let tabsToShow = {};
    let tabsList = {};

    let tabChage = JSON.parse(localStorage.getItem(tabChageKey));

    if (tabChage) {
        tabsToShow = tabChage;
    }

    if (!tabsToShow[parentID]) {
        tabsToShow[parentID] = {
            select: '',
            show: []
        }
    }

    tabIds.forEach(e => tabsList[e] = true);

    tabsToShow[parentID].show = tabsList;

    localStorage.setItem(tabChageKey, JSON.stringify(tabsToShow))

    return {
        type: 'TAB_SHOW_OBJ',
        payload: tabsToShow
    }
}
