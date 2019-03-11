Ext.define('QuickStart.view.nestoriaPage.NestoriaPageCoontroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nestoria-page',


    clearFilter: function () {
        let vm = this.getViewModel();

        vm.set('minPriceField', 0);
        vm.set('maxPriceField', 'max');
        vm.set('bathroomsValues', [0, 15]);
        vm.set('bedroomsValues', [0, 15]);
    },

    clickRecord: function (element) {
        let vm = this.getViewModel();
        if (element.target.closest('.card') && element.target.id === 'btnDetailed') {
            let record = vm.get('recordsStore')[+element.target.closest('.card').id - 1],
                item = {
                    title: record.title,
                    img: record.img_url,
                    price: record.price_formatted,
                    bedrooms: record.bedroom_number,
                    bathrooms: record.bathroom_number,
                    descr: record.summary,
                    urlSite: record.lister_url,
                    latitude: record.latitude,
                    longitude: record.longitude
                };
            window.open('#description/' + btoa(unescape(encodeURIComponent(JSON.stringify(item)))));
        } else if (element.target.id === 'addFavorite') {
            let record = vm.get('recordsStore')[+element.target.closest('.card').id - 1];
            this.saveLocalStorage(record);
        } else if (element.target.id === 'dellFavorite') {
            let id = +element.target.closest('.card').id - 1;
            this.dellLocalStorage(id);
        }

    },

    dellLocalStorage: function (id) {
        let view = this.getView(),
            vm = this.getViewModel(),
            country = vm.get('countryName'),
            records = Ext.JSON.decode(localStorage.getItem('nestoriaStore-' + country));
        records.splice(id, 1);
        records.length ? localStorage.setItem('nestoriaStore-' + country, Ext.JSON.encode(records)) : view.clearStorage();
        view.loadLocalStorage();
    },

    saveLocalStorage: function (record) {
        let vm = this.getViewModel(),
            country = vm.get('countryName'),
            records = localStorage.getItem('nestoriaStore-' + country) ?
                Ext.JSON.decode(localStorage.getItem('nestoriaStore-' + country)) : [];
        record.favorite = true;
        records.push(record);
        localStorage.setItem('nestoriaStore-' + country, Ext.JSON.encode(records));
        Ext.MessageBox.alert('Status', 'Saved successfully.');
    }
});
