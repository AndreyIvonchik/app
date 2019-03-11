Ext.define('QuickStart.view.historyPage.HistoryPage', {
    extend: 'Ext.container.Container',
    xtype: 'history-page',

    controller: 'history',

    layout: {
        type: 'fit'
    },
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'fit'
            },
            defaults: {
                width: '80%'
            },
            items: [
                {
                    xtype: 'grid',
                    padding: '20 20 20 20',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    bind: {
                                        value: '{localizationStore.history}'
                                    }
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-trash',
                                    handler: 'delete',
                                    bind: {
                                        hidden: '{!history}',
                                        tooltip: '{localizationStore.clearHistory}'
                                    }
                                }]
                        }],
                    bind: {
                        store: '{history}',
                        selection: '{selHistoryItem}'
                    },
                    columns: [
                        {
                            dataIndex: 'city',
                            width: '40%',
                            bind:{
                                text: '{localizationStore.city}',
                            }
                        },
                        {
                            dataIndex: 'country',
                            width: '40%',
                            bind:{
                                text: '{localizationStore.country}',
                            }
                        },
                        {
                            dataIndex: 'date',
                            align: 'center',
                            flex: 1,
                            bind:{
                                text: '{localizationStore.date}',
                            }
                        }
                    ],
                }
            ]
        }
    ]
});
