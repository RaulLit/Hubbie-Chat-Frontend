export const getSender = (loggedUser, users) => {
  return users[0].id === loggedUser.id ? users[1].name : users[0].name;
};

export const getSenderObj = (loggedUser, users) => {
  return users[0].id === loggedUser.id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender.id !== m.sender.id ||
      messages[i + 1].sender.id === undefined) &&
    messages[i].sender.id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender.id !== userId &&
    messages[messages.length - 1].sender.id
  );
};

export const formatChatTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  if (msgDate.getTime() === today.getTime()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (msgDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

export const isDifferentDay = (msg1, msg2) => {
  if (!msg1 || !msg2) return true;
  const d1 = new Date(msg1.createdAt);
  const d2 = new Date(msg2.createdAt);
  return (
    d1.getFullYear() !== d2.getFullYear() ||
    d1.getMonth() !== d2.getMonth() ||
    d1.getDate() !== d2.getDate()
  );
};

export const formatDatePill = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  if (msgDate.getTime() === today.getTime()) {
    return "Today";
  } else if (msgDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
};
