exports.getChatId = (msg) => {
  const { id } = msg.chat;
  return id;
}

exports.getFirstName = (msg) => {
  const { first_name } = msg.chat;
  return first_name || 'not defined';
}

exports.getCmd = (msg) => {
  const { text } = msg;
  return text;
}

exports.getDocumentId = (msg) => {
  const { document: { file_id } } = msg;
  return file_id;
}

exports.getPhotoId = (msg) => {
  const file_id = msg.photo[0].file_id;
  return file_id;
}

exports.getLastName = (msg) => {
  const { last_name } = msg.chat;
  return last_name || 'not defined';
}

