function showMessage(textMes: string) {
  const message = document.querySelector('.message');
  const messageT = message?.querySelector('.message__text');
  if (!message || !messageT) {
    return;
  }
  messageT.innerHTML = textMes;
  message.classList.remove('hide');
  message.addEventListener('.click', () => {
    message.classList.add('hide');
  });
}

export default showMessage;
