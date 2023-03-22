import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      wData: {
        city: null,
        temp: null,
        weather: null,
      },
    };
  },
  mutations: {
    setData(state, payload) {
      state.wData = payload;
    },
  },

  actions: {
    async loadWeatherData(context, query) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${
          import.meta.env.VITE_API_KEY
        }`
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.log(response);
        throw new Error(
          "Something went Wrong! Check your input and give it another try"
        );
      }
      context.commit("setData", {
        temp: Math.round(responseData.main.temp),
        city: `${responseData.name}, ${responseData.sys.country}`,
        weather: responseData.weather[0].main,
      });
    },
  },
  getters: {
    getData(state) {
      return state.wData;
    },
  },
});

export default store;
