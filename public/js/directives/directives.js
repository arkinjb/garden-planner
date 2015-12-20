(function(){
  var directives = angular.module("directives", ['ngRoute']);

  // activate tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // directive to set size of garden
  directives.directive('garden', function(){
    return {

    }
  })

  //  directive to create add to garden button
  directives.directive('addbutton', function(){
    return {
      restrict: 'E',
      template: "<button addtogarden>+</button>"
    }
  });

  // directive to add plant image to garden
  // need to extract the style (resized height/width) into another directive and call with ng-style
  // need to append to middle of div - if enough plants added, new plants added outside of garden
  directives.directive('addtogarden', function($compile){
    return function(scope, element, attrs){
      element.bind("click", function(){
        angular.element(document.getElementById('garden-layout')).append($compile('<img draggable height='+6*scope.plant.spacing_min+' width='+6*scope.plant.spacing_min+' class="layout-image" ng-src=' + scope.plant.photo_url + ' />')(scope));
      });
    };
  });

  // directive for plant element
  directives.directive('plant', [ 'Plant', function(){
    return {
      templateUrl: "views/_plant.html"
    }
  }]);

  //directive for plant in garden element
  directives.directive('gardenplant', [ 'plant',  function(){

  }]);

  // directive to remove plant image from garden
  directives.directive('removefromgarden', function(){
    return function(scope, element, attrs){

    }
  })

  // directive to show remove button when image is clicked on

  // directive to show modal to confirm clear garden
  directives.directive('modalClear', function(){
    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      replace: true, // replace with template below
      transclude: true, // to insert custom content into directive

    }
  })

  // directive to clear all plants from garden
  directives.directive('clearbutton', [ function(){
    return {
      link: function(scope){
        scope.clearGarden = function(){
          angular.element(document.getElementById('garden-layout')).empty();
        }
      },
      template: "<button id='clearAllButton' ng-click='clearGarden()' class='btn btn-warning'>Confirm Clear</button>"
    }
  }])

  // draggable directive for images in garden
  directives.directive('draggable', function(){
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        element.draggable({
          revert: "invalid",
          containment: "div.garden"
        });
      }
    };
  });

  // droppable directive for garden layout
  directives.directive('droppable', function($compile){
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        element.droppable({
          accept: "*",
          // drop: function(event, ui){}
        })
      }
    }
  })


})()
