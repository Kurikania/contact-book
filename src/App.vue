<template>
  <div id="app">
    <div class = "nav">
      <AddContact />
      <button @click="restore">Отменить последнее действие</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import AddContact from "./components/AddContact";
export default {

  components: { AddContact },
  methods: {
    restore() {
      if (JSON.stringify(this.$store.getters.contacts) === JSON.stringify(this.$store.getters.restore) ||
       this.$store.getters.restore.length == 0)  {
        this.$alert("Невозможно отменить действие")
        return
      }
      this.$confirm(`Вы хотите отменить последнее действие?`).then(() => {
        this.$store.dispatch("restore");
      })
    },
  },
};
</script>

<style>
* {
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  font-size: 1.1em;
}

.nav {
  display: flex;
  justify-content: space-around;
  padding: 5px;
  background-color:  #8360c3;
  font-size: large;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
}
.nav button {
    background: white;
    color: #8360c3;
}

button {
  font-size: inherit ;
    background: #8360c3;
    color: white;
    border: none;
    border-radius: 5px;
    margin: 10px 5px;
    padding: 10px; 
    transition: ease-in-out 0.3s;
  }
button:hover {
    box-shadow: 0 0 15px rgb(74, 13, 131);
}
h3 {
  margin: 10px;
}
input[type="text"] {
  margin: 5px;
  padding: 3px;
  font-size: 1.2em;
}
</style>
