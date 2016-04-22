/**
 * Controller to list articles
 */
(function() {
    'use strict';

    function ArticlesCtrl() {
        var vm = this;
        vm.articles = [{
            name: 'Principio de legalidad.'
        }];
    }
    angular
        .module('starter')
        .controller('ArticlesCtrl', ArticlesCtrl);

    ArticlesCtrl.$inject = [];
}());
