// Time Zone data
const timeZoneData = {
  local: { name: "Local Time", description: "Your device's current time zone." },
  UTC: { name: "Coordinated Universal Time", description: "Primary time standard by which the world regulates clocks and time. It is effectively a successor to Greenwich Mean Time (GMT)." },
  PST: { name: "Pacific Standard Time", description: "North American time zone (UTC-8) used in the western United States and Canada." },
  EST: { name: "Eastern Standard Time", description: "North American time zone (UTC-5) used on the East Coast of the United States and Canada." },
  IST: { name: "Indian Standard Time", description: "Time zone for India and Sri Lanka (UTC+5:30)." }
};

// Function to convert local time to another timezone
function convertToTimeZone(date, timeZone) {
  const offsets = {
      UTC: 0,
      PST: -8,
      EST: -5,
      IST: 5.5,
      local: 0 // Local time doesn't need a conversion
  };
  const offset = offsets[timeZone];
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * offset));
}

// Function to update the digital clock and timezone description
function updateClock() {
  const timeZone = document.getElementById('timezone-selector').value;
  const format = document.getElementById('format-selector').value;
  let time = convertToTimeZone(new Date(), timeZone);

  let hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  let amPm = '';

  if (format === '12-hour') {
      amPm = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12;
      hours = hours || 12; // convert 0 to 12 for 12-hour format
  }

  hours = String(hours).padStart(2, '0');

  const clockElement = document.getElementById('clock');
  clockElement.textContent = format === '24-hour' ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}${amPm}`;

  // Update the timezone description
  const timezoneDetailElement = document.getElementById('timezone-detail');
  if (timezoneDetailElement) {
      timezoneDetailElement.textContent = timeZoneData[timeZone].description;
  }

  requestAnimationFrame(updateClock);
}

// Event listeners for the timezone and format selectors
document.getElementById('timezone-selector').addEventListener('change', updateClock);
document.getElementById('format-selector').addEventListener('change', updateClock);

// Initial call to update the clock
updateClock();
