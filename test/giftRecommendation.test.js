import { describe, expect, test } from "vitest";
import { recommendGiftForGroup } from "../src/giftRecommendation.js";

describe("recommendGiftForGroup", () => {
  test("returns fallback when no gifts are available within budget", () => {
    const profile = {
      budget: 500,
      preferredTags: ["coffee"],
      excludedCategories: [],
    };
    const gifts = [
      {
        name: "カフェチケット",
        price: 700,
        category: "cafe",
        tags: ["coffee"],
        available: true,
      },
    ];

    expect(recommendGiftForGroup(profile, gifts)).toBe(
      "おすすめできるギフトがありません"
    );
  });
});
