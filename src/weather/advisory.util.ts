export function generateAdvisory(day): string {
  const { avgtemp_c, daily_chance_of_rain, avghumidity, maxwind_kph } = day.day;

  const messages: string[] = [];

  // Combined factor warnings
  if (avgtemp_c >= 35 && avghumidity >= 85) {
    messages.push('Hot and humid – High fungal risk; avoid spraying, monitor crop health.');
  }
  if (daily_chance_of_rain >= 70 && maxwind_kph >= 35) {
    messages.push('Heavy rain and strong wind – Avoid all field operations and protect young plants.');
  }
  if (avgtemp_c <= 10 && avghumidity < 40) {
    messages.push('Cold and dry – Risk of frost and dehydration; irrigate carefully during daytime.');
  }

  // Temperature-based advice
  if (avgtemp_c >= 38) {
    messages.push('Very hot day – Irrigate early morning/evening, avoid pesticide/fertilizer.');
  } else if (avgtemp_c >= 30 && avgtemp_c < 38) {
    messages.push('Warm day – Ideal for fertilizer application if no rain expected.');
  } else if (avgtemp_c <= 10) {
    messages.push('Cold day – Avoid irrigation/spraying, monitor frost impact.');
  }

  // Rainfall-based advice
  if (daily_chance_of_rain >= 70) {
    messages.push('Rain expected – Avoid fertilizer, pesticide, and harvesting.');
  } else if (daily_chance_of_rain >= 40 && daily_chance_of_rain < 70) {
    messages.push('Light rain possible – Delay spraying, monitor fields.');
  } else if (daily_chance_of_rain < 20) {
    messages.push('Dry day – Suitable for fertilizer and pesticide use.');
  }

  // Humidity-based advice
  if (avghumidity >= 85) {
    messages.push('High humidity – Fungal risk; inspect crops, avoid late watering.');
  } else if (avghumidity >= 60 && avghumidity < 85) {
    messages.push('Moderate humidity – Good for most field activities.');
  } else if (avghumidity < 30) {
    messages.push('Low humidity – Increase irrigation, avoid spraying mid-day.');
  }

  // Wind-based advice
  if (maxwind_kph >= 35) {
    messages.push('Strong winds – Postpone spraying, secure equipment and plants.');
  } else if (maxwind_kph >= 20 && maxwind_kph < 35) {
    messages.push('Moderate wind – Spray with caution, avoid light-weight covers.');
  }

  if (messages.length === 0) {
    messages.push('Weather is favorable – Proceed with irrigation, fertilizer, and spraying.');
  }

  return messages.join(' ');
}
