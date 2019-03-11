Ext.define('QuickStart.view.nestoriaDescription.NestoriaDescriptionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nestoria-description',

    init: function () {
        Ext.Loader.loadScript({
            url: `https://api-maps.yandex.ru/2.1/?apikey=01c0be49-26bb-4a49-87c7-4e8f4590aa98&lang=en_US`,
            onLoad: this.createMap,
            scope: this
        });
    },

    createMap: function () {
        let vm = this.getViewModel(),
            latitude = vm.get('latitude'),
            longitude = vm.get('longitude'),
            title = vm.get('title');
            ymaps.ready(function () {
            var myMap = new ymaps.Map('YMapsID', {
                    center: [latitude, longitude],
                    zoom: 12
                }),

                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                    hintContent: title
                });

            myMap.geoObjects.add(myPlacemark);
        });
    }
});
