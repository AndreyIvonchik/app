Ext.define('QuickStart.view.historyPage.HistoryPageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.history',

    delete: function () {
        let vm = this.getViewModel();
        localStorage.removeItem('nestoriaHistory');
        vm.get('history').removeAll();
        Ext.MessageBox.alert('Status', 'History cleared');
    },

});
