Ext.define('QuickStart.view.main.Main', {
    extend: 'Ext.panel.Panel',

    viewModel: {
        type: 'main'
    },
    controller: 'main',

    layout: {
        type: 'fit',
    },
    title: 'Nestoria',
    tools: [
        {
            xtype: 'button',
            handler: 'onFavoritesBtn',
            iconCls: 'x-fa fa-star',
            bind: {
                tooltip: '{localizationStore.showFavorites}',
                text: '{localizationStore.favorites}',
            }
        },
        {
            xtype: 'button',
            handler: 'onHistoryBtn',
            iconCls: 'x-fa fa-history',
            bind: {
                tooltip: '{localizationStore.showHistory}',
                text: '{localizationStore.history}',
            }
        },
        {
            xtype: 'combobox',
            name: 'countryField',
            id: 'countryField',
            autoSelect: true,
            editable: false,
            queryMode: 'local',
            bind: {
                value: '{countryFieldValue}',
                store: '{country}'
            },
            displayField: 'title',
            valueField: 'link',
            listeners: {
                change: 'changeCountry',
                added: 'loadLocalization'
            }
        }
    ],
    tbar: [
        {
            xtype: 'textfield',
            name: 'cityField',
            setEmptyText: function (emptyText) {
                this.emptyText = emptyText;
                this.applyEmptyText();
            },
            bind: {
                value: '{cityFieldValue}',
                emptyText: '{localizationStore.selectCity}...',
            }
        },
        {
            xtype: 'radiogroup',
            width: '20%',
            name: 'radioBtnType',
            items: [
                {
                    inputValue: 'rent',
                    bind: {
                        boxLabel: '{localizationStore.toRent}'
                    }
                },
                {
                    inputValue: 'buy', checked: true,
                    bind: {
                        boxLabel: '{localizationStore.toSale}'
                    }
                }
            ],
            simpleValue: true,
            bind: {
                value: '{typeValue}'
            }
        },
        {
            xtype: 'button',
            name: 'searchBtn',
            iconCls: 'x-fa fa-search',
            scale: 'small',
            iconAlign: 'left',
            bind: {
                disabled: '{!showSearchBtn}',
                text: '{localizationStore.search}',
            },
            handler: 'onSearchBtn'
        },
        '->',
        {
            xtype: 'button',
            handler: 'clearStorage',
            iconCls: 'x-fa fa-trash',
            bind: {
                tooltip: '{localizationStore.clearFavorites}',
                hidden: '{!showClearFavoriteBtn}'
            }
        }
    ],
    bbar: [
        {
            xtype: 'container',
            layout: 'hbox',
            bind: {
                hidden: '{!showPagination}'
            },
            items: [
                {
                    xtype: 'button',
                    name: 'pagePrev',
                    handler: 'clickPagination',
                    iconCls: 'x-fa fa-chevron-left',
                    bind: {
                        tooltip: '{localizationStore.previousPage}',
                    }
                },
                {
                    xtype: 'displayfield',
                    margin: '0 5',
                    bind: {
                        value: '{pageNumber}'
                    }
                },
                {
                    xtype: 'button',
                    name: 'pageNext',
                    handler: 'clickPagination',
                    iconCls: 'x-fa fa-chevron-right',
                    bind: {
                        tooltip: '{localizationStore.nextPage}',
                    }
                }
            ]
        }
    ],
    items: []
});
