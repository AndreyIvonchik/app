Ext.define('QuickStart.view.nestoriaPage.NestoriaPage', {
    extend: 'Ext.container.Container',
    xtype: 'nestoria-page',

    controller: 'nestoria-page',

    layout: {
        type: 'fit'
    },
    padding: '0 5 0 5',
    items: [
        {
            xtype: 'panel',
            layout: 'border',
            defaults: {
                collapsible: true,
                split: false,
                bodyPadding: 10,
                margin: '5 0 0 0',
            },
            items: [
                {
                    title: 'Filters',
                    region: 'west',
                    collapsed: true,
                    floatable: true,
                    width: 200,
                    minWidth: 100,
                    maxWidth: 250,
                    border: 1,
                    layout: 'vbox',
                    ui: 'test-ui-panel',
                    bind: {
                        title: '{localizationStore.filters}',
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            labelAlign: 'top',
                            layout: 'vbox',
                            defaults: {
                                flex: 1,
                                hideLabel: true
                            },
                            bind: {
                                fieldLabel: '{localizationStore.price}'
                            },
                            items: [{
                                xtype: 'numberfield',
                                name: 'minPriceField',
                                fieldLabel: 'Start',
                                margin: '0 5 5 0',
                                bind: {
                                    value: '{minPriceField}'
                                }
                            }, {
                                xtype: 'numberfield',
                                name: 'maxPriceField',
                                fieldLabel: 'End',
                                bind: {
                                    value: '{maxPriceField}'
                                }
                            }]
                        },
                        {
                            xtype: 'multislider',
                            name: 'Bathrooms',
                            labelAlign: 'top',
                            width: '100%',
                            values: [0, 15],
                            increment: 1,
                            minValue: 0,
                            maxValue: 15,
                            bind: {
                                value: '{bathroomsValues}',
                                fieldLabel: '{localizationStore.bathrooms}',
                            }
                        },
                        {
                            xtype: 'multislider',
                            fieldLabel: 'Bedrooms',
                            name: 'Bedrooms',
                            labelAlign: 'top',
                            width: '100%',
                            values: [0, 15],
                            increment: 1,
                            minValue: 0,
                            maxValue: 15,
                            bind: {
                                value: '{bedroomsValues}',
                                fieldLabel: '{localizationStore.bedrooms}',
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Clear All',
                            width: '100%',
                            handler: 'clearFilter',
                            bind: {
                                text: '{localizationStore.clearAll}',
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    name: 'mainPanel',
                    waitMsgTarget: true,
                    collapsible: false,
                    region: 'center',
                    autoScroll: true,
                    ui: 'test-ui-panel',
                    bind: {
                        title: '{countryName}',
                        data: {
                            records: '{recordsStore}',
                            localizationStore: '{localizationStore}'
                        }
                    },
                    listeners: {
                        click: {
                            element: 'body',
                            fn: 'clickRecord'
                        }
                    },
                    tpl: `
                       <tpl for="records">
                                <div id="{#}" name="card" class="card horizontal">
                                    <div class="card-image">
                                        <img src="{img_url}">
                                    </div>
                                    <div class="card-stacked">
                                        <div class="card-content">                                            
                                            <p class="title">{title}</p>
                                            <p class="price">{price_formatted}</p>
                                            <p class="descr">{summary}</p>
                                            <tpl if="values.favorite">
                                                <button id="dellFavorite" class="btnFavoriteDell">{parent.localizationStore.deleteFavorite}</button>
                                            <tpl else>
                                                <button id="addFavorite" class="btnFavorite">{parent.localizationStore.addFavorite}</button>
                                            </tpl>                                                                               
                                        </div>  
                                    </div>
                                    <button id="btnDetailed" class="btnDetailed">{parent.localizationStore.detailed}</button>
                                </div>           
                        </tpl>`
                },
            ]
        }
    ]
});
