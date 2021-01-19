<template>
  <div>
    <div>
      <a href="javascript:;" @click="goBack">Все контакты</a>
    </div>
    <div class="edit-form">
      <div
        class="edit-form-field"
        v-for="(field, index) in fields"
        :key="index"
      >
        <label :for="index">{{ Object.keys(field)[0] }}</label>
        <div class="edit-form-item">
          <input
            v-if="Object.keys(field)[0] !== 'id'"
            :id="index"
            type="text"
            v-model="field[Object.keys(field)[0]]"
            :placeholder="Object.keys(field)[0]"
          />

          <input
            v-else
            disabled
            :id="index"
            type="text"
            v-model="field[Object.keys(field)[0]]"
            :placeholder="Object.keys(field)[0]"
          />

          <div
            v-if="
              Object.keys(field)[0] !== 'id' &&
              Object.keys(field)[0] !== 'firstName' &&
              Object.keys(field)[0] !== 'lastName'
            "
            class="delete edit-form-btn"
            @click="deleteField(field)"
          >
            -
          </div>
          <div v-else style="width: 35px"></div>
          <div
            v-if="Object.keys(field)[0] !== 'id'"
            class="restore edit-form-btn"
            @click="restoreValue(field)"
          ></div>
          <div v-else style="width: 35px"></div>
        </div>
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
      // Для удаления поля в store передается id пользователя и само поле
      if (
        Object.keys(field)[0] == "firstName" ||
        Object.keys(field)[0] == "lastName" ||
        Object.keys(field)[0] == "id"
      ) {
        this.$alert("Это обязательное поле");
        return;
      }
      this.$confirm(
        `Вы уверены что хотите удалить поле ${Object.keys(field)[0]}?`
      ).then(() => {
        let data = {
          id: this.contact.id,
          [Object.keys(field)[0]]: Object.values(field)[0],
        };
        this.$store.dispatch("removeField", data);
      });
    },
    updateInfo() {
      this.$store.dispatch("updateContact", this.updatedContact);
      this.$router.push({ path: "/" });
    },
    addNewFieldName() {
      // Добавление нового поля на верстку. В store оно попадает только при обновлении информации контакта.
      if (this.newFieldName.length > 0) {
        if (
          confirm(`Вы уверены что хотите добавить поле ${this.newFieldName}?`)
        ) {
          this.fields.push({ [this.newFieldName]: "" });
          this.newFieldName = "";
        }
      } else {
        this.$alert("Поле не должно быть пустым");
      }
    },
    restoreValue(field) {
      //метод возвращает значение поля, сохраненное в store
      this.$confirm(
        `Вы уверены что хотите восстановить значение поля ${
            Object.keys(field)[0]
          }?`
      ).then(() => {     
        let oldValue = this.contact[Object.keys(field)];
        this.contact[[Object.keys(field)][0]] = "";
        this.contact[[Object.keys(field)][0]] = oldValue;
      })
    },
    goBack() {
      //Если были внесены изменения, но не сохранены, то страница спросит пользователя
      if (
        JSON.stringify(this.contact) === JSON.stringify(this.updatedContact)
      ) {
        this.$router.push({ path: "/" });
      } else {
        if (
          this.$confirm(
            `Вы уверены что хотите вернуться на главную? Внесенные извенения не сохранены`
          )
        ) {
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
.edit-form-field {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.edit-form-btn {
  margin: 0 5px;
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 2px solid black;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: ease-in-out 0.3s;
}
.edit-form-btn:hover {
  box-shadow: 0 0 10px rgb(20, 20, 20);
}
.restore {
  background-image: url("https://img.icons8.com/ios-glyphs/30/000000/undo.png");
  background-size: cover;
}
.delete {
  background-image: url("https://img.icons8.com/android/20/000000/delete.png");
  background-size: 15px;
}
.edit-form {
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: auto;
}
.edit-form-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 5px;
}
.edit-form-item input[type="text"] {
  padding: 3px;
}
@media only screen and (max-width: 600px) {
  .edit-form-field {
    flex-direction: column;
  }
}
</style>