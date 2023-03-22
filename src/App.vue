<script setup></script>

<template>
  <div
    id="app"
    :class="
      isDayTime
        ? `day-${Math.round(Math.random())}`
        : `night-${Math.round(Math.random())}`
    "
  >
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search City..."
          v-model="query"
          @keypress="fetchWeather"
        />
      </div>

      <transition name="fade-in" mode="out-in">
        <div
          class="weather-wrap"
          v-if="weatherData.temp !== null && error === null"
        >
          <div class="location-box">
            <div class="location">{{ weatherData.city }}</div>
            <div class="date">{{ dateBuilder() }}</div>
          </div>

          <div class="weather-box">
            <div class="temp">{{ weatherData.temp }}° C</div>
            <div class="weather">{{ weatherData.weather }}</div>
          </div>
        </div>
        <div v-else-if="error === null">
          <div class="info">Search the City to fetch Temperature Info</div>
        </div>
        <div v-else>
          <div class="error">{{ error }}</div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      error: null,
      isDayTime: null,
    };
  },
  computed: {
    weatherData() {
      return this.$store.getters["getData"];
    },
  },
  methods: {
    async fetchWeather(e) {
      console.log(this.cssVars);
      try {
        if (e.key == "Enter") {
          this.error = null;
          await this.$store.dispatch("loadWeatherData", this.query);
          this.query = "";
        }
      } catch (error) {
        this.error = error || "Something Went Wrong! Maybe give it another try";
        this.query = "";
      }
    },

    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day}, ${date} ${month} ${year}`;
    },
    isItDay() {
      const hours = new Date().getHours();
      this.isDayTime = hours > 6 && hours < 20;
    },
  },
  created() {
    this.isItDay();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Inter&family=Roboto&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Lato", sans-serif;
}

#app {
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  font-size: 12.5;
}

#app.day-0 {
  background-image: url("/src/assets/day-0.jpg");
}
#app.day-1 {
  background-image: url("/src/assets/day-1.jpg");
}
#app.night-0 {
  background-image: url("/src/assets/night-0.jpg");
}
#app.night-1 {
  background-image: url("/src/assets/night-0.jpg");
}

main {
  min-height: 100vh;
  padding: 2.5rem;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}

.search-box {
  width: 100%;
  margin-bottom: 3rem;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 1.5rem;
  color: #313131;
  font-size: 2rem;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 1.6rem 0 1.6rem;
  transition: 0.4s ease-in-out;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.25);
}

.search-box .search-bar:focus {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 1.6rem 0px 1.6rem 0px;
  box-shadow: 0px 0px 1.6rem rgba(255, 255, 255, 0.5);
}

.location-box {
  color: aliceblue;
  text-align: center;
  font-family: "Roboto", sans-serif;
  margin: 1rem 0;
}

.location {
  font-size: 5rem;
  font-weight: 600;
  text-shadow: 3px 3px rgba(0, 0, 0, 0.25);
  padding: 1rem 0;
}

.date {
  font-size: 3rem;
  font-weight: 400;
  text-shadow: 3px 3px rgba(0, 0, 0, 0.25);
  padding: 1rem 0;
}

.weather-wrap {
  transition: 0.4s ease-out;
}

.weather-box {
  text-align: center;
  font-family: "Inter", sans-serif;
  margin: 1rem 0;
}

.temp {
  font-size: 9rem;
  color: white;
  font-weight: bolder;
  display: inline-block;
  padding: 2rem;

  text-shadow: 3px 3px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 1.6rem;
  margin: 3rem 0;
  box-shadow: 4px 8px rgba(0, 0, 0, 0.25);
}

.weather {
  font-size: 5rem;
  font-weight: 400;
  font-weight: bold;
  color: white;
}

.info {
  text-align: center;
  font-size: 5rem;
  font-weight: 400;
  font-weight: bold;
  color: white;
}

.error {
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 4rem;
  font-weight: 400;
  font-weight: bold;
  color: white;
  text-shadow: 4px 6px rgba(0, 0, 0, 0.25);
}

.fade-in-enter-active {
  transition: opacity 300ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.fade-in-leave-active {
  transition: opacity 225ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}
</style>
