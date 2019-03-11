Ext.define('QuickStart.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: ['QuickStart.view.Localization'],
    alias: 'controller.main',

    routes: {
        'description/:obj': {
            action: 'showDescription',
            conditions: {
                ':obj': '([0-9a-zA-Z\=\/]+)'
            }
        },
        'search': {
            action: 'showMainPage'
        },
        'history': {
            action: 'showHistoryPage'
        }
    },

    showMainPage: function () {
        let mainAppContainer = this.getView(),
            vm = this.getViewModel(),
            self = this;
        mainAppContainer.removeAll();
        mainAppContainer.add({
            xtype: 'nestoria-page',
            loadLocalStorage: self.loadLocalStorage,
            clearStorage: self.clearStorage,
            viewModel: {
                parent: vm
            }
        });
    },

    showHistoryPage: function () {
        let mainAppContainer = this.getView(),
            vm = this.getViewModel();
        this.loadHistory();
        mainAppContainer.removeAll();
        mainAppContainer.add({
            xtype: 'history-page',
            viewModel: {
                parent: vm
            }
        });
        vm.set('showPagination', false);
        vm.set('showClearFavoriteBtn', false);
    },

    showDescription: function (obj) {
        let mainAppContainer = this.getView(),
            vm = this.getViewModel(),
            record = JSON.parse(decodeURIComponent(escape(window.atob(obj))));
        mainAppContainer.removeAll();
        mainAppContainer.add({
            xtype: 'nestoria-description',
            viewModel: {
                data: {
                    title: record.title,
                    img: record.img,
                    price: record.price,
                    bedrooms: record.bedrooms,
                    bathrooms: record.bathrooms,
                    descr: record.descr,
                    urlSite: record.urlSite,
                    latitude: record.latitude,
                    longitude: record.longitude
                },
                parent: vm
            }
        });
    },

    onSearchBtn: function () {
        this.createQuery(1);
    },

    onHistoryBtn: function () {
        this.redirectTo('history');
    },

    onFavoritesBtn: function () {
        this.redirectTo('search');
        this.loadLocalStorage();
    },

    changeCountry: function (elem, value) {
        let vm = this.getViewModel(),
            localization;
        localStorage.setItem('nestoriaLocalization', value);
        localization = Ext.create('QuickStart.view.Localization');
        vm.set('localizationStore', localization.getLocalization(elem.value));
    },

    loadLocalization: function (cmp) {
        let vm = this.getViewModel(),
            localization;
        cmp.value = localStorage.getItem('nestoriaLocalization') ?
            localStorage.getItem('nestoriaLocalization') :
            'nestoria.co.uk';
        localization = Ext.create('QuickStart.view.Localization');
        vm.set('localizationStore', localization.getLocalization(cmp.value));
    },


    createQuery: function (page) {
        let vm = this.getViewModel(),
            countryFieldValue = vm.get('countryFieldValue'),
            typeValue = vm.get('typeValue').radioBtnType,
            cityFieldValue = vm.get('cityFieldValue'),
            minPrice = vm.get('minPriceField'),
            maxPrice = vm.get('maxPriceField'),
            minBedrooms = vm.get('bedroomsValues')[0],
            maxBedrooms = vm.get('bedroomsValues')[1],
            minBathrooms = vm.get('bathroomsValues')[0],
            maxBathrooms = vm.get('bathroomsValues')[1],
            url = `https://api.${countryFieldValue}/api?action=search_listings&encoding=json` +
                `&listing_type=${typeValue}&place_name=${cityFieldValue}&page=${page}&price_min=${minPrice}` +
                `&price_max=${maxPrice}&bathroom_min=${minBathrooms}&bathroom_max=${maxBathrooms}` +
                `&bedroom_min=${minBedrooms}&bedroom_max=${maxBedrooms}`;
        vm.set('url', url);
        vm.getView('mainPanel').mask('Loading..');
        vm.set('pageNumber', page);
        //const proxyurl = 'https://cors.io/?';
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyurl + url)
            .then(response => response.text())
            .then(contents => this.callbackFunction(contents))
            .catch(() => Ext.MessageBox.alert('Error', 'Ошибка запроса'))
    },

    callbackFunction: function (contents) {
        let vm = this.getViewModel(),
            view = this.getView(),
            request = Ext.JSON.decode(contents);
        view.unmask();
        vm.set('mainTitle', request.response.locations[0].long_title);
        vm.set('recordsStore', request.response.listings);
        vm.set('showPagination', true);
        this.redirectTo('search');
        this.saveHistory();
    },

    saveHistory: function () {
        let vm = this.getViewModel(),
            city = vm.get('cityFieldValue'),
            country = vm.get('countryName'),
            url = vm.get('url'),
            records = localStorage.getItem('nestoriaHistory') ?
                (Ext.JSON.decode(localStorage.getItem('nestoriaHistory'))) : [];
        (records.length === 5) ? records.splice(0, 1) : '';
        records.push({
            url: url,
            date: Ext.Date.format(new Date(), 'Y-m-d H:i:s'),
            city: city,
            country: country
        });
        localStorage.setItem('nestoriaHistory', Ext.JSON.encode(records));
    },

    loadHistory: function () {
        let vm = this.getViewModel();
        if (localStorage.getItem('nestoriaHistory')) {
            vm.get('history').removeAll();
            vm.get('history').add(Ext.JSON.decode(localStorage.getItem('nestoriaHistory')));
        } else {
            Ext.MessageBox.alert('Status', 'History list is empty.');
        }
    },

    clickPagination: function (element) {
        let vm = this.getViewModel(),
            page = vm.get('pageNumber');

        if (element.name === 'pageNext') {
            page += 1;
            if (page > 50) page = 1;
            this.createQuery(page);
        }

        if (element.name === 'pagePrev') {
            page -= 1;
            if (page < 1) page = 50;
            this.createQuery(page);

        }
    },

    loadLocalStorage: function () {
        let vm = this.getViewModel(),
            country = vm.get('countryName');
        vm.set('showPagination', false);
        if (localStorage.getItem('nestoriaStore-' + country)) {
            vm.set('recordsStore', Ext.JSON.decode(localStorage.getItem('nestoriaStore-' + country)));
            vm.set('showClearFavoriteBtn', true);
        } else {
            Ext.MessageBox.alert('Status', 'Favorite list is empty.');
        }
    },

    clearStorage: function () {
        let vm = this.getViewModel(),
            country = vm.get('countryName');
        localStorage.removeItem('nestoriaStore-' + country);
        vm.set('recordsStore', []);
    }
});
