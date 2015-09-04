// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({
  
  tagName: 'tr',

  template: _.template('<td>(<%= artist %>)</td><td><%= title %></td>'),

  events: {
    'click': function() {
      this.model.dequeue(null, this.model);
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});
