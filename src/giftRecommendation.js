function countMatchedTags(gift, preferredTags) {
  return gift.tags.filter((tag) => preferredTags.includes(tag)).length;
}

export function recommendGiftForGroup(profile, gifts) {
  const candidates = gifts
    .filter((gift) => gift.available)
    .filter((gift) => gift.price <= profile.budget)
    .filter(
      (gift) => !profile.excludedCategories.includes(gift.category)
    )
    .map((gift) => ({
      gift,
      matchedTagCount: countMatchedTags(gift, profile.preferredTags),
    }))
    .filter(({ matchedTagCount }) => matchedTagCount > 0)
    .sort(
      (a, b) =>
        b.matchedTagCount - a.matchedTagCount ||
        a.gift.price - b.gift.price
    );

  return (
    candidates[0]?.gift.name ?? "おすすめできるギフトがありません"
  );
}
