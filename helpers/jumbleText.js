function jumbleText(text) {
  try {
    const textArray = text.split("");
    const randomized = textArray.map((item) => ({
      item: item,
      random: Math.random(),
    }));
    const sorted = randomized.sort((a, b) => a.random - b.random);
    const jumbled = sorted.map((item) => item.item);
    return jumbled.join("");
  } catch (error) {
    console.log("jumbleText(): error", error);
    throw new Error("Oops - something went wrong!");
  }
}

module.exports = jumbleText;
