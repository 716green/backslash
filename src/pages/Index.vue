<template>
  <div class="q-pa-md" style="height: 100%;">
    <q-layout
      style="height: 90vh; margin: 0; padding: 0"
      view="hHh lpR fFf"
      container
      class="shadow-2 rounded-borders"
    >
      <q-drawer show-if-above v-if="containsKeyword" side="right" bordered>
        <q-scroll-area class="fit">
          <q-list>
            <section v-if="containsKeyword === 'help'">
              <Hotkeys
                :showing="showing"
                :containsKeyword="containsKeyword"
                :specialCharList="specialCharList"
              />
            </section>

            <section class="row" v-else-if="containsKeyword === 'list'">
              <List :keywords="keywords" />
            </section>

            <section class="row" v-else-if="isMath(textInput)">
              <strong> {{ textInput.trim() }} = {{ clean(mathValue) }} </strong>
            </section>
            <section class="row" v-else-if="containsKeyword === 'github'">
              <GitHub
                :gh_username="gh_username"
                :gh_search="gh_search"
                :gh_search_term="gh_search_term"
                :gh_username_name="gh_username_name"
              />
            </section>
            <section class="row" v-else-if="containsKeyword === 'search'">
              <Search :search_term="search_term" />
            </section>
            <section
              class="row"
              v-else-if="websiteIndicators.includes(containsKeyword)"
            >
              <strong style="margin-right: 5px"> Go to</strong>
              {{ textInput }}
            </section>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page v-on:keypress="keypressHandler">
          <q-input
            :label="selectedFeature"
            v-model="newInput"
            style="font-size: 1.5rem; width: 50%; display: flex; margin: auto; margin-top: 15px;"
            size="large"
            v-if="showing"
            id="input"
            rounded
            outlined
            autofocus
            @keyup="setTextInput"
          >
            <template v-slot:append>
              <q-avatar>
                <img src="~assets/backslash-logo.png" />
              </q-avatar>
            </template>
          </q-input>

          <p
            class="p"
            style="text-align: center; justify-content: center; margin-top: 15px"
          >
            {{ !showing ? "Press / to start" : "" }}
          </p>

          <p class="p">
            {{
              showing && textInput !== ""
                ? "Press [SHIFT] + [SPACE] to clear"
                : ""
            }}
          </p>
          <p class="p">
            {{
              showing && textInput === ""
                ? "Press [SHIFT] + [SPACE] to toggle"
                : ""
            }}
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Hotkeys from "../components/Hotkeys.vue";
import List from "../components/List.vue";
import GitHub from "../components/GitHub.vue";
import Search from "../components/Search.vue";
import { specialCharList, keywords, websiteIndicators } from "../data/lists";

import { solve, isMath } from "../functions/math";

export default {
  name: "PageIndex",
  data() {
    return {
      isMath,
      solve,
      specialCharList,
      keywords,
      websiteIndicators,
      drawer: false,
      newInput: "",
      textInput: "",
      showing: false
    };
  },
  created() {
    window.addEventListener("keydown", e => {
      this.keypressHandler(e, "down");
    });
    window.addEventListener("keyup", e => {
      this.keypressHandler(e, "up");
    });
    window.addEventListener("www_goToUrl", this.goToUrl);
  },
  watch: {
    newInput() {
      if (this.specialChars.includes(this.newInput.trim()[0])) {
        this.textInput = this.textInput
          .split(" ")
          .join("")
          .split("/")
          .join("")
          .split(">")
          .join("");
      }
    },
    containsKeyword(newValue, oldValue) {
      console.log({ oldValue });
      if (!newValue) {
        this.setFooter("reset");
      }
      if (newValue?.length > 1) {
        this.setFooter(newValue);
      }
    }
  },
  methods: {
    clean(value) {
      return value
        .toString()
        .split("  ")
        .join(" ")
        .split("math")
        .join("")
        .trim();
    },
    www_goToUrl(url) {
      window.open(`https://${url}`, "_blank");
      this.clearInput({ hide: true });
    },
    executeCommand() {
      const input = this.textInput.trim();
      // todo - add more TLDs
      if (this.isUrl) {
        this.www_goToUrl(input);
      } else if (input === "mail") {
        this.www_goToUrl("mail.google.com");
      } else if (this.textInput.trim().includes("github")) {
        const searchTerm = this.textInput
          .replace("github", "")
          .replace("search", "")
          .split("  ")
          .join(" ")
          .trim()
          .split(" ")
          .join("+"); // "node+express"
        if (this.textInput.trim().includes("search")) {
          this.www_goToUrl(`github.com/search?q=${searchTerm}`);
        } else {
          this.www_goToUrl(`github.com/${searchTerm}`);
        }

        // alert("GH search");
      } else if (
        this.textInput.trim().includes("search") &&
        !this.textInput.trim().includes("github")
      ) {
        this.www_goToUrl("google.com/search?q=" + this.search_term);
      }
    },
    setTextInput() {
      this.textInput = this.filterInput(this.newInput.trim()).trim();
    },
    filterInput(value) {
      value = value.trim();
      let firstChar = value[0];
      if (this.specialChars.includes(firstChar)) {
        return value.replace(firstChar, "");
      } else {
        return value;
      }
    },
    focusOnInput(e) {
      if (this.newInput.length === 2) {
        this.clearInput({ hide: false });
        this.newInput = e.key;
        this.setTextInput(e.key);
      }
      document.querySelector("input").focus();
    },
    keypressHandler(e, dir) {
      if (this.showing === true) {
        if (e.key === "Enter") {
          this.executeCommand();
        }
        if (e.key === "Escape") {
          this.clearInput({ hide: true });
        } else if (this.specialChars.includes(e.key)) {
          this.focusOnInput(e);
        }
        if (dir === "up" && e.shiftKey && e.code === "Space") {
          this.clearInput({ hide: this.newInput.trim() === "" });
        }
      } else {
        if (this.specialChars.includes(e.key)) {
          this.showing = true;
        } else if (dir === "up" && e.shiftKey && e.code === "Space") {
          this.showing = true;
          this.clearInput({ hide: false });
        }
      }
    },
    setFooter(value) {
      this.$store.dispatch("setFooter", value);
    },
    clearInput(options) {
      this.setFooter("/backslash/");
      const { hide } = options;
      if (!hide) {
        this.newInput = "";
        this.setTextInput("");
      } else {
        this.newInput = "";
        this.setTextInput("");
        this.showing = false;
      }
    },
    toggleInputView() {
      this.showing = !this.showing;
    },
    searchForWord(searchFor, within) {
      return searchFor.includes(within);
    },
    matchWord(matchThis, withThis) {
      return matchThis === withThis;
    }
  },
  computed: {
    selectedChar() {
      if (this.specialChars.includes(this.newInput?.trim()[0])) {
        return this.newInput?.trim()[0];
      } else {
        return "";
      }
    },
    gh_username() {
      if (
        this.textInput.split(" ").length > 1 &&
        this.textInput.indexOf("search") === -1
      ) {
        return true;
      } else return false;
    },
    gh_search() {
      if (
        this.textInput.split(" ").length > 1 &&
        this.textInput.indexOf("search") > -1
      ) {
        return true;
      } else return false;
    },
    gh_search_term() {
      if (this.gh_search) {
        return this.textInput
          .replace("github", "")
          .replace("search", "")
          .trim();
      } else return null;
    },
    gh_username_name() {
      if (this.gh_username) {
        return this.textInput.replace("github", "").trim();
      } else return null;
    },
    search_term() {
      if (this.selectedFeature === "search") {
        return this.textInput
          .toLowerCase()
          .trim()
          .replace("search", "");
      } else return null;
    },
    isUrl() {
      return this.websiteIndicators.includes(this.selectedFeature);
    },
    mathValue() {
      if (isMath(this.textInput)) {
        return this.solve(
          this.textInput
            .trim()
            .split("math")
            .join("")
            .split("  ")
            .join(" ")
            .trim()
        );
      } else {
        return "";
      }
    },
    selectedFeature() {
      return this.$store.getters.getFooterText;
    },
    specialChars() {
      return this.specialCharList.map(specialChar => specialChar.key);
    },
    specialCharInfo() {
      return this.specialCharList.map(specialChar => {
        return `${specialChar.key} - ${specialChar.action}`;
      });
    },
    firstWord() {
      return this.textInput?.trim().split(" ")[0];
    },
    containsKeyword() {
      if (this.textInput === "") {
        return false;
      } else {
        return this.keywords.find(keyword => {
          return this.firstWord?.toLowerCase().includes(keyword);
        });
      }
    }
  },
  components: {
    Hotkeys,
    List,
    GitHub,
    Search
  }
};
</script>

<style>
li {
  list-style: none;
}
section {
  border: black solid 2px;
  padding: 5%;
  margin: 0;
}

p {
  margin: 0;
}

.p {
  text-align: center;
}
</style>
