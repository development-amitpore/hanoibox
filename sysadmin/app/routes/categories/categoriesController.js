import angular from 'angular';
import 'angular-route';

import categoryQueryModule from 'sysadmin/app/queries/getCategories';

var mystuff = angular.module('categoriesControllerModule', [
  'ngRoute',
  categoryQueryModule.name
]).controller('CategoriesController', function(allCategories, $location, $scope) {
   this.categories = allCategories.data.categories;
   
   $scope.create = () => {
     $location.path("/categories/create");
   }
});

export default mystuff;