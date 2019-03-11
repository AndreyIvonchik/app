Ext.define('QuickStart.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',
    data: {
        mainTitle: 'United Kingdom',
        showSearchBtn: false,
        showClearFavoriteBtn: false,
        cityFieldValue: null,
        typeValue: 'buy',
        minPriceField: 0,
        maxPriceField: 'max',
        bedroomsValues: [0, 15],
        bathroomsValues: [0, 15],
        pageNumber: 1,
        showPagination: false,
    },

    formulas: {
        showSearchBtn: {
            bind: {
                val1: '{countryFieldValue}',
                val2: '{cityFieldValue}',
                val3: '{typeValue}'
            },
            get: function (data) {
                return data.val1 && data.val2 && data.val3;
            }
        },

        countryName: {
            bind: {
                val: '{countryFieldValue}',
                val2: '{country}'
            },

            get: function (data) {
                return data.val2.findRecord('link', data.val).get('title');
            }
        }

    },

    stores: {
        country: {
            fields: [],
            data: [
                {
                    title: 'United Kingdom',
                    link: 'nestoria.co.uk'
                },
                {
                    title: 'Deutschland',
                    link: 'nestoria.de'
                },
                {
                    title: 'Brasil',
                    link: 'nestoria.com.br'
                },
                {
                    title: 'Spain',
                    link: 'nestoria.es'
                },
                {
                    title: 'France',
                    link: 'nestoria.fr'
                },
                {
                    title: 'India',
                    link: 'nestoria.in'
                },
                {
                    title: 'Italia',
                    link: 'nestoria.it'
                },
                {
                    title: 'Mexico',
                    link: 'nestoria.mx'
                }
            ]
        },

        history: {
            fields: [],
            data: []
        }
    }
});
