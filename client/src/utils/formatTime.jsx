import React from 'react';

export default function formatTime(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const isPM = hours >= 12;

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // AM veya PM göstergesi
  const period = isPM ? 'PM' : 'AM';

  return `${hours}:${formattedMinutes} ${period}`;
}
