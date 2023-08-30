function countCharacters(text: string): number {
  return text.replace(/\s/g, "").length;
}

export function estimatedTimeString(text: string) {
  const charactersPerMinute = 600;
  const characterCount = countCharacters(text);
  const readingTimeMinutes = Math.ceil(characterCount / charactersPerMinute);
  if (readingTimeMinutes === 1) {
    return "1 min to read";
  } else {
    return `${readingTimeMinutes} min to read`;
  }
}
