const joinButton = document.getElementById("join-button");

joinButton.addEventListener('click', () => {
  const code = Number(document.getElementById("code").value.replace(/\s+/g, ' ').trim());
  const playerName = document.getElementById("player-name").value.replace(/\s+/g, ' ').trim();

  if (!isNaN(code) && playerName.length > 0) {
    const socket = io();

    socket.emit('joinGame', {
      code,
      playerName,
    });

    joinGame();
  }
});

joinButton.click();