// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */

    this.get('songQueue').on('play', function(song){
      var sB = song.get('base');
      var pC = params.library.get(sB).get('playCount');
      params.library.get(sB).set('playCount',pC+1);
      this.set('currentSong', song);
    }, this);

    params.library.on('enqueue', function(song){
      var songClone = song.clone();
      songClone.set('base', song.cid); 
      this.get('songQueue').push(songClone);
      if (this.get('songQueue').length === 1) {
          this.get('songQueue').play();
      }
    }, this);

    this.get('songQueue').on('dequeue', function(model, song){
      if (song) {
        this.get('songQueue').remove(song.cid);
      }
      else {
        this.get('songQueue').shift();
        if (this.get('songQueue').length) {
          this.get('songQueue').play();
        }
        else {
          // do nothing trigger ('end') ??
        }
      }
    }, this);
  }

});
