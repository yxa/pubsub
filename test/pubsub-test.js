(function($){
  
var uniqueToken = function() {
  if(uniqueToken.id === undefined) {
    uniqueToken.id = 0;
  }
  uniqueToken.id++;
  return uniqueToken.id + '';
};

buster.testCase("pub sub",{

  "should call subscribers only once": function() {
    var channel = uniqueToken();
    
    var spy1 = sinon.spy();
    var spy2 = sinon.spy();
    
    $.Topic(channel).subscribe(spy1);
    $.Topic(channel).subscribe(spy2);

    $.Topic(channel).publish('joe sixpack');

    assert( spy1.calledOnce );
    assert( spy2.calledOnce );
  },


  "should ony call subscribers on the right channel/topic": function() {
    var channelOne = uniqueToken();
    var channelTwo = uniqueToken();

    var spy1 = sinon.spy();
    var spy2 = sinon.spy();

    $.Topic(channelOne).subscribe(spy1);
    $.Topic(channelTwo).subscribe(spy2);

    $.Topic(channelOne).publish();

    assert(spy1.calledOnce);
    assert.equals(spy2.callCount,0);
  },

  "should be able to pass messages between publisher and subscriber": function() {
    var channel = uniqueToken();
    
    var spy1 = sinon.spy();
    
    $.Topic(channel).subscribe(spy1);
    $.Topic(channel).publish('joe sixpack');

    assert.calledWith(spy1, 'joe sixpack');
  },

  "should be able to unsubscribe to topic": function() {
    var channel = uniqueToken();
    
    var spy1 = sinon.spy();
    
    $.Topic(channel).subscribe(spy1);
    $.Topic(channel).publish('joe sixpack');

    assert.calledWith(spy1, 'joe sixpack');
    assert.equals(spy1.callCount,1);

    $.Topic(channel).unsubscribe(spy1);

    $.Topic(channel).publish('joe sixpack');
    assert.equals(spy1.callCount,1);
  }
     
});

  
}(jQuery));

