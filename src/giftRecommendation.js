export function recommendGiftForGroup(profile, gifts) {
  const recommended = gifts.find(
    (gift) => gift.available && gift.price <= profile.budget
  );

  return recommended?.name ?? "おすすめできるギフトがありません";
}
