'use strict';

let filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(todo => !todo.completed)
  },
  completed: function (todos) {
    return todos.filter(todo => todo.completed)
  }
}

let app = new Vue({
  el: '.todoapp',
  data: {
    todoIdx: 1,
    todos: [],
    newTodo: '',
    editedTodo: null,
    visibility: 'all'
  },
  methods: {
    addTodo: function () {
      let todo = this.newTodo;
      if (!todo) {
        return
      }
      this.todos.push({ id: this.todoIdx++, title: todo, completed: false });
      this.newTodo = '';
    },
    removeTodo:function (todo) {
      let index=this.todos.indexOf(todo);
      this.todos.splice(index,1);
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit: function () {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
    },

    cancelEdit: function () {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo.title = this.beforeEditCache;
      this.editedTodo = null;
    },
    pluralize: function (count, word) {
      return word + (count > 1 ? 's' : '');
    },
    changeVisibilityType: function (type) {
      this.visibility = type;
    },
    removeCompleted: function () {
      this.todos = filters.active(this.todos);
    }
  },
  computed: {
    allDone: {
      get: function () {
        return this.todos.every(todo => todo.completed);
      },
      set: function (completed) {
        this.todos.forEach(todo => todo.completed = completed)
      }
    },
    filteredTodos: function () {
      return filters[this.visibility](this.todos);
    },
    remaining: function () {
      return filters.active(this.todos).length;
    }
  }
});