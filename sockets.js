function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());

  socket.on('getLang', function(pollId){
    socket.emit('pollLang', data.getLang(pollId));
  }
  )
  socket.on('pageLoaded', function (lang) {
    console.log('lang');
    console.log(lang);
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('editQuestion', function(d) {
    socket.emit('oldQuestion', data.editQuestion(d.pollId, d.questionNumber))
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(     d.pollId,
        {              q: d.q,
                       a: d.a,
          questionNumber: d.questionNumber,
          correctAnswer1: d.correctAnswer1,
          correctAnswer2: d.correctAnswer2,
          correctAnswer3: d.correctAnswer3,
          correctAnswer4: d.correctAnswer4
        });
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('deleteQuestion', function(d){
    data.deleteQuestion(  d.pollId, d.questionNumber);
    socket.emit('dataUpdate', data.getAnswers(d.pollId));

  })

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
    io.to(d.pollId).emit('getCorrect', data.getCorrectAnswers(d.pollId, d.questionNumber));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
    io.to(d.pollId).emit('getTheAnswer', data.getCorrectAnswers(d.pollId, d.questionNumber));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })
 
}

module.exports = sockets;