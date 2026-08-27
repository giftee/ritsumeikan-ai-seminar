import { describe, expect, test } from "vitest";
import { recommendGiftForGroup } from "../src/giftRecommendation.js";

describe("recommendGiftForGroup", () => {
  test("recommends the gift with the most matching preferred tags", () => {
    const profile = {
      budget: 1000,
      preferredTags: ["coffee", "sweet"],
      excludedCategories: ["alcohol"],
    };
    const gifts = [
      {
        name: "コンビニコーヒー",
        price: 500,
        category: "convenience_store",
        tags: ["coffee"],
        available: true,
      },
      {
        name: "カフェセット",
        price: 900,
        category: "cafe",
        tags: ["coffee", "sweet"],
        available: true,
      },
    ];

    expect(recommendGiftForGroup(profile, gifts)).toBe("カフェセット");
  });

  test("ignores gifts that are unavailable or over budget", () => {
    const profile = {
      budget: 800,
      preferredTags: ["drink"],
      excludedCategories: [],
    };
    const gifts = [
      {
        name: "売り切れドリンク",
        price: 500,
        category: "drink",
        tags: ["drink"],
        available: false,
      },
      {
        name: "高級カフェチケット",
        price: 1200,
        category: "cafe",
        tags: ["drink"],
        available: true,
      },
      {
        name: "自販機ドリンクチケット",
        price: 300,
        category: "drink",
        tags: ["drink"],
        available: true,
      },
    ];

    expect(recommendGiftForGroup(profile, gifts)).toBe(
      "自販機ドリンクチケット"
    );
  });

  test("uses lower price when matched tag count is tied", () => {
    const profile = {
      budget: 1000,
      preferredTags: ["sweet"],
      excludedCategories: [],
    };
    const gifts = [
      {
        name: "焼き菓子セット",
        price: 800,
        category: "sweets",
        tags: ["sweet"],
        available: true,
      },
      {
        name: "チョコギフト",
        price: 500,
        category: "sweets",
        tags: ["sweet"],
        available: true,
      },
    ];

    expect(recommendGiftForGroup(profile, gifts)).toBe("チョコギフト");
  });

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

  test("returns fallback when no gifts match preferred tags", () => {
    const profile = {
      budget: 1000,
      preferredTags: ["coffee"],
      excludedCategories: [],
    };
    const gifts = [
      {
        name: "文房具ギフト",
        price: 600,
        category: "study",
        tags: ["stationery"],
        available: true,
      },
    ];

    expect(recommendGiftForGroup(profile, gifts)).toBe(
      "おすすめできるギフトがありません"
    );
  });
});
