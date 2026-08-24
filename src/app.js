import { recommendGiftForGroup } from "./giftRecommendation.js";
import "./styles.css";

const gifts = [
  {
    name: "コンビニスイーツ",
    price: 500,
    category: "convenience_store",
    tags: ["coffee", "sweet"],
    available: true,
    tone: "作業終わり",
  },
  {
    name: "カフェチケット",
    price: 800,
    category: "cafe",
    tags: ["coffee"],
    available: true,
    tone: "発表後",
  },
  {
    name: "焼き菓子セット",
    price: 900,
    category: "sweets",
    tags: ["sweet"],
    available: true,
    tone: "研究室",
  },
  {
    name: "高級カフェチケット",
    price: 1200,
    category: "cafe",
    tags: ["coffee", "special"],
    available: true,
    tone: "打ち上げ",
  },
  {
    name: "売り切れドリンク",
    price: 300,
    category: "drink",
    tags: ["drink"],
    available: false,
    tone: "休憩",
  },
  {
    name: "文房具ギフト",
    price: 600,
    category: "study",
    tags: ["stationery"],
    available: true,
    tone: "勉強会",
  },
];

const scenes = [
  {
    id: "lab",
    label: "研究室",
    profile: {
      budget: 1000,
      preferredTags: ["coffee", "sweet"],
      excludedCategories: ["convenience_store"],
    },
  },
  {
    id: "circle",
    label: "サークル",
    profile: {
      budget: 700,
      preferredTags: ["drink", "sweet"],
      excludedCategories: ["study"],
    },
  },
  {
    id: "seminar",
    label: "勉強会",
    profile: {
      budget: 900,
      preferredTags: ["stationery", "coffee"],
      excludedCategories: ["sweets"],
    },
  },
];

const tagOptions = ["coffee", "sweet", "drink", "stationery", "special"];
const categoryOptions = [
  ["convenience_store", "コンビニ"],
  ["cafe", "カフェ"],
  ["sweets", "お菓子"],
  ["drink", "ドリンク"],
  ["study", "学習"],
];

const state = {
  activeScene: "lab",
  profile: structuredClone(scenes[0].profile),
};

const app = document.querySelector("#app");

function setScene(sceneId) {
  const scene = scenes.find((item) => item.id === sceneId);
  state.activeScene = scene.id;
  state.profile = structuredClone(scene.profile);
  render();
}

function toggleValue(key, value) {
  const values = new Set(state.profile[key]);
  if (values.has(value)) {
    values.delete(value);
  } else {
    values.add(value);
  }
  state.profile[key] = [...values];
  render();
}

function setBudget(value) {
  state.profile.budget = Number(value);
  render();
}

function getRecommendedGift() {
  const name = recommendGiftForGroup(state.profile, gifts);
  return gifts.find((gift) => gift.name === name) ?? null;
}

function getTagMatches(gift) {
  return gift.tags.filter((tag) => state.profile.preferredTags.includes(tag));
}

function render() {
  const recommended = getRecommendedGift();
  const resultLabel = recommended?.name ?? "おすすめできるギフトがありません";
  const blockedByCategory =
    recommended &&
    state.profile.excludedCategories.includes(recommended.category);
  const overBudget = recommended && recommended.price > state.profile.budget;
  const unavailable = recommended && !recommended.available;

  app.innerHTML = `
    <section class="workspace">
      <header class="topbar">
        <div>
          <p class="eyebrow">AI x GitHub Hands-on</p>
          <h1>差し入れeギフト推薦</h1>
        </div>
        <div class="status ${blockedByCategory || overBudget || unavailable ? "status-alert" : "status-ok"}">
          ${blockedByCategory || overBudget || unavailable ? "Review Needed" : "Ready"}
        </div>
      </header>

      <section class="controls" aria-label="推薦条件">
        <div class="field">
          <span class="label">場面</span>
          <div class="segments">
            ${scenes
              .map(
                (scene) => `
                  <button class="segment ${scene.id === state.activeScene ? "active" : ""}" data-scene="${scene.id}">
                    ${scene.label}
                  </button>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="field">
          <div class="label-row">
            <span class="label">予算</span>
            <strong>${state.profile.budget}円</strong>
          </div>
          <input class="range" type="range" min="300" max="1300" step="100" value="${state.profile.budget}" data-budget />
        </div>

        <div class="field">
          <span class="label">好みタグ</span>
          <div class="chips">
            ${tagOptions
              .map(
                (tag) => `
                  <button class="chip ${state.profile.preferredTags.includes(tag) ? "selected" : ""}" data-preferred="${tag}">
                    ${tag}
                  </button>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="field">
          <span class="label">除外カテゴリ</span>
          <div class="chips">
            ${categoryOptions
              .map(
                ([value, label]) => `
                  <button class="chip danger ${state.profile.excludedCategories.includes(value) ? "selected" : ""}" data-excluded="${value}">
                    ${label}
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="result" aria-label="推薦結果">
        <div>
          <p class="eyebrow">Recommendation</p>
          <h2>${resultLabel}</h2>
          ${
            recommended
              ? `<p>${recommended.price}円 / ${categoryOptions.find(([value]) => value === recommended.category)?.[1] ?? recommended.category} / ${recommended.tone}</p>`
              : "<p>条件を変えると候補が見つかる場合があります。</p>"
          }
        </div>
        <div class="review-flags">
          ${blockedByCategory ? '<span class="flag bad">除外カテゴリ</span>' : ""}
          ${overBudget ? '<span class="flag bad">予算超過</span>' : ""}
          ${unavailable ? '<span class="flag bad">在庫なし</span>' : ""}
          ${recommended ? `<span class="flag">一致タグ ${getTagMatches(recommended).length}</span>` : ""}
        </div>
      </section>

      <section class="gift-grid" aria-label="候補ギフト">
        ${gifts
          .map((gift) => {
            const matches = getTagMatches(gift);
            const isRecommended = recommended?.name === gift.name;
            const excluded = state.profile.excludedCategories.includes(gift.category);
            const budgetOut = gift.price > state.profile.budget;
            return `
              <article class="gift ${isRecommended ? "recommended" : ""}">
                <div class="gift-head">
                  <h3>${gift.name}</h3>
                  <strong>${gift.price}円</strong>
                </div>
                <p>${categoryOptions.find(([value]) => value === gift.category)?.[1] ?? gift.category} / ${gift.tone}</p>
                <div class="mini-tags">
                  ${gift.tags.map((tag) => `<span class="${matches.includes(tag) ? "matched" : ""}">${tag}</span>`).join("")}
                </div>
                <div class="checks">
                  <span class="${gift.available ? "ok" : "ng"}">${gift.available ? "在庫あり" : "在庫なし"}</span>
                  <span class="${budgetOut ? "ng" : "ok"}">${budgetOut ? "予算外" : "予算内"}</span>
                  <span class="${excluded ? "ng" : "ok"}">${excluded ? "除外" : "対象"}</span>
                </div>
              </article>
            `;
          })
          .join("")}
      </section>
    </section>
  `;

  document.querySelectorAll("[data-scene]").forEach((button) => {
    button.addEventListener("click", () => setScene(button.dataset.scene));
  });
  document.querySelector("[data-budget]").addEventListener("input", (event) => {
    setBudget(event.target.value);
  });
  document.querySelectorAll("[data-preferred]").forEach((button) => {
    button.addEventListener("click", () => toggleValue("preferredTags", button.dataset.preferred));
  });
  document.querySelectorAll("[data-excluded]").forEach((button) => {
    button.addEventListener("click", () => toggleValue("excludedCategories", button.dataset.excluded));
  });
}

render();
