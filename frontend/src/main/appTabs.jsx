import React, { useState } from 'react';
import Tabs from 'rc-tabs';
import Dashboard from '../dashboard/dashboard';
import SideBar from '../common/template/sideBar';
import Header from '../common/template/header'

const AppTabs = () => {

    const [dataTabs, setDataTabs] = useState(
        {
            activeKey: 'dashboardgeral',
            tabs: [
                {
                    key: 'dashboardgeral',
                    title: 'Dashboard',
                    component: <Dashboard />,
                    icon: 'tachometer-alt'
                }
            ]
        }
    );

    const onChange = (key) => {
        setDataTabs(
            {
                activeKey: key,
                tabs: dataTabs.tabs
            }
        )
    }

    const removeTabs = (key, e) => {
        e.stopPropagation();
        let foundIndex = 0;
        const after = dataTabs.tabs.filter((t, i) => {
            if (t.key !== key) {
                return true;
            }
            foundIndex = i;
            return false;
        });
        let activeKey = dataTabs.activeKey;
        if (activeKey === key) {
            if (foundIndex) {
                foundIndex--;
            }
            activeKey = after[foundIndex].key;
        }

        setDataTabs(
            {
                activeKey: activeKey,
                tabs: after
            }
        )
    }

    // const removeAllTabs = (key, e) => {
    //     e.stopPropagation();
    //     const after = dataTabs.tabs[0];
    //     let activeKey = after.key;        
    //     setDataTabs(
    //         {
    //             activeKey: activeKey,
    //             tabs: after
    //         }
    //     )
    // }

    const addTabs = (e, menu, component) => {
        e.stopPropagation();
        let newTab = dataTabs.tabs;
        let menuExiste = newTab.filter((tab) => {
            return tab.key === menu.name;
        });// retorna o objeto se achar

        if (!menuExiste.length) {// se não achar objeto, então cria
            newTab.push({
                key: menu.name,
                title: menu.label,
                component: component,
                icon: menu.icon
            });
        }

        setDataTabs(
            {
                activeKey: menu.name,
                tabs: newTab
            }
        )
    }

    const btnTabs = (title, key, close, icon) => {

        let btnClose = (close) ? <button
            className={'btn-sm'}
            style={{
                position: 'absolute',
                cursor: 'pointer',
                color: '#888888',
                right: '5px',
                width: '15px',
                height: '15px',
                border: 0,
                padding: 0,
                margin: 0,
                marginTop: '5px',
                backgroundColor: 'transparent'
            }}
            onClick={(e) => {
                removeTabs(key, e);
                // removeAllTabs(key, e)
            }}
        >
            <i className={`fa fa-${'times'} `}></i>
        </button>
            : null;

        return (
            <>
                <button className={'tabs_tab_btn'}
                    data-extra="tab-bar-title"
                    onMouseUp={(e) => {
                        if (close)
                            if (e.button === 1) {
                                removeTabs(key, e)
                            }
                    }}
                >
                    <i className={`fa fa-${icon} `}></i> {title}
                </button>
                {btnClose}
            </>
        )
    }

    let tabs = [];
    for (const key in dataTabs.tabs) {
        const element = dataTabs.tabs[key];
        tabs.push(
            {
                key: element.key,
                label: btnTabs(element.title, element.key, key > 0, element.icon),
                children: element.component,
                className: `tabs_pane`
            }
        )
    }

    return (
        <>
            <Header />
            <SideBar data-tabs={dataTabs} addTabs={addTabs} />
            <div className='content-wrapper content_wrapper'>
                <Tabs
                    className='tabs_tabs'
                    data-extra='tabs'
                    moreIcon='...'// pode ser um icone ou componente completo como um botão
                    activeKey={dataTabs.activeKey}
                    onChange={onChange}
                    items={tabs}
                />
            </div>
        </>
    );
}

export default AppTabs;
