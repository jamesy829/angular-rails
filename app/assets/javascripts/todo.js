app = angular.module('Todo', ['ngResource']);

app.factory('Task', function($resource) {
  return $resource('/tasks/:id', {id: '@id'}, {update: {method: 'PUT'}});
})

app.controller('TodoCtrl', function($scope, Task) {
  $scope.tasks = Task.query();

  $scope.addTask = function() {
    var task;
    task = Task.save({text: $scope.newTask.text, completed: 'false'});
    $scope.tasks.push(task);
    $scope.newTask = '';
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.tasks, function(task) {
      count += task.completed ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTasks = $scope.tasks;
    $scope.tasks = [];
    angular.forEach(oldTasks, function(task) {
      if (!task.completed) $scope.tasks.push(task);
    });
  };

  $scope.mark = function(task) {
    task.completed = !task.completed;
    task.$update();
  }
});
