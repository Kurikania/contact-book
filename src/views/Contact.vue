<template>
  <div>
    <div>
      <a href="javascript:;" @click="goBack">Все контакты</a>
    </div>
    <div class="edit-form">
      <div class="edit-form-item" v-for="(field, index) in fields" :key="index">
        <input
          type="text"
          v-model="field[Object.keys(field)[0]]"
          :placeholder="Object.keys(field)[0]"
        />
        <div class = "delete edit-form-btn" @click="deleteField(field)">-</div>
        <div class="restore edit-form-btn" @click="restoreValue(field)"></div>
      </div>
      <div style="display: flex; margin: auto">
        <button v-if="addField == false" @click="addField = !addField">
          Добавить поле
        </button>
        <button v-else @click="addField = !addField">X</button>
        <div v-if="addField">
          <input
            type="text"
            v-model="newFieldName"
            placeholder="Введите название поля"
          />
          <button @click.prevent="addNewFieldName">Добавить поле</button>
        </div>
      </div>
      <div>
        <button @click="updateInfo">Обновить информацию</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    newFieldName: "",
    addField: false,
  }),

  computed: {
    contact() {
      return this.$store.getters.contacts.find((d) => {
        return d.id == this.id;
      });
    },
    fields() {
      var res = [];
      Object.keys(this.contact).forEach((key) => {
        res.push({ [key]: this.contact[key] });
      });
      return res;
    },
    updatedContact() {
      let upd = {};
      for (let i = 0; i < this.fields.length; i++) {
        upd[Object.keys(this.fields[i])[0]] = Object.values(this.fields[i])[0];
      }
      return upd;
    },
  },
  methods: {
    deleteField(field) {
      if (
        Object.keys(field)[0] == "firstName" ||
        Object.keys(field)[0] == "lastName" ||
        Object.keys(field)[0] == "id"
      ) {
        alert("Can't touch this");
        return;
      }
      if (
        confirm(`Вы уверены что хотите удалить поле ${Object.keys(field)[0]}?`)
      ) {
        let payload = {
          id: this.contact.id,
          [Object.keys(field)[0]]: Object.values(field)[0],
        };
        this.$store.dispatch("removeField", payload);
      }
    },
    updateInfo() {
      this.$store.dispatch("updateContact", this.updatedContact);
      this.$router.push({ path: "/" });
    },
    addNewFieldName() {
      if (
        confirm(`Вы уверены что хотите добавить поле ${this.newFieldName}?`)
      ) {
        this.fields.push({ [this.newFieldName]: "" });
        this.newFieldName = "";
      }
    },
    restoreValue(field) {
      if (confirm(`Вы уверены что хотите восстановить значение поля ${Object.keys(field)[0]}?`)) {
        let oldValue = this.contact[Object.keys(field)];
        console.log(oldValue);
        this.contact[[Object.keys(field)][0]] = "";
        this.contact[[Object.keys(field)][0]] = oldValue;
      }
    },
    goBack() {
      if (
        JSON.stringify(this.contact) === JSON.stringify(this.updatedContact)
      ) {
        this.$router.push({ path: "/" });
      } else {
        if (confirm(`Вы уверены что хотите вернуться на главную?`)) {
          this.$router.push({ path: "/" });
        } else {
          return;
        }
      }
    },
  },
};
</script>

<style scoped>
.edit-form-btn {
    margin: 0 5px;
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 2px solid black;
  background-position: center;
  background-repeat: no-repeat;
}
.restore {
  background-image: url("https://img.icons8.com/ios-glyphs/30/000000/undo.png");
   background-size: cover
  
}
.delete {
  background-image: url("https://img.icons8.com/android/20/000000/delete.png");
    background-size: 15px;
}
.edit-form {
  display: flex;
  flex-direction: column;
}
.edit-form-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
}
.edit-form-item input[type="text"] {
  padding: 3px;
}
</style>