Ext.define('QuickStart.view.nestoriaDescription.NestoriaDescription', {
    extend: 'Ext.container.Container',
    xtype: 'nestoria-description',

    controller: 'nestoria-description',


    layout: 'fit',
    padding: '0 5 0 5',
    autoScroll: true,
    items: [
        {
            xtype: 'container',
            layout: 'vbox',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'image',
                            flex: 1,
                            height: 300,
                            width: 400,
                            bind: {
                                src: '{img}',
                            }
                        },
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            padding: '5 5',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    cls: 'title',
                                    bind: {
                                        value: '{title}'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    bind: {
                                        value: '{localizationStore.bedrooms}: {bedrooms}'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    bind: {
                                        value: '{localizationStore.bathrooms}: {bathrooms}'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    cls: 'price',
                                    bind: {
                                        value: '{price}'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    bind: {
                                        value: '{descr}'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    bind: {
                                        text: '{localizationStore.openSite}',
                                        href: '{urlSite}'
                                    },
                                    handler: function () {
                                        if (this.href) {
                                            window.href = this.href;
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'box',
                    width: '100%',
                    height: 400,
                    html: `<div id="YMapsID" style="width: 100%; height: 100%"></div> `
                }
            ]
        }
    ]
});
