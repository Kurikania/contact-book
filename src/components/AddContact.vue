<template>
  <div>
    <div>Добавить контакт <button @click="show = !show">+</button></div>
    <div
      class="modalBackground"
      :style="show ? modalBackground : 'display: none'"
    >
      <div class="add-contact-form">
        <button id="close" @click="show = !show">X</button>
        <h2>Добавить новый контакт</h2>
        <form>
          <div
            class="add-contact-form-item"
            v-for="(field, index) in fields"
            :key="index"
          >
            <label :for="index">{{ Object.keys(field)[0] }}</label>
            <div style="display: flex; align-items: center">
              <input
                :id="index"
                type="text"
                v-model="field[Object.keys(field)[0]]"
                :placeholder="Object.keys(field)[0]"
              />
              <div v-if="Object.keys(field)[0] !== 'firstName' && Object.keys(field)[0] !== 'lastName'  "
                class="icons8-trash-can"
                @click.prevent="deleteField(index)"
              ></div>
            <div v-else style="width: 37px"> </div>
            </div>
          </div>
          <div style="display: flex; margin: auto">
            <button
              v-if="addField == false"
              @click.prevent="addField = !addField"
            >
              Добавить поле
            </button>
            <button style="align-self: baseline;" v-else @click.prevent="addField = !addField">X</button>
            <div v-if="addField">
              <input
                type="text"
                v-model="newFieldName"
                placeholder="Введите название поля"
              />
              <button @click.prevent="addNewFieldName">Добавить поле</button>
            </div>
          </div>
          <button @click.prevent="addContact">Добавить контакт</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    addField: false,
    fields: [{ firstName: "" }, { lastName: null }, { number: null }],
    newFieldName: "",
    id: 3,
    show: false,
    modalBackground: {
      position: "fixed",
      "z-index": 999,
      "padding-top": "25px",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      overflow: "auto",
      "background-color": "rgba(0, 0, 0, 0.5)",
    },
  }),
  methods: {
    addContact() {
      let newContact = {};
      for (let i = 0; i < this.fields.length; i++) {
        newContact[Object.keys(this.fields[i])[0]] = Object.values(
          this.fields[i]
        )[0];
        newContact.id = "" + ++this.id;
        this.fields[i][Object.keys(this.fields[i])[0]] = "";
      }
      this.$store.dispatch("addContact", newContact);
      this.show = false;
    },
    addNewFieldName() {
      if (this.newFieldName.length > 0) {
        this.$confirm(
          `Вы уверены что хотите добавить поле ${this.newFieldName} ?`
        ).then(() => {
          this.fields.push({ [this.newFieldName]: "" });
          this.newFieldName = "";
        });
      } else {
        this.$alert("Поле не должно быть пустым");
      }
    },
    deleteField(index) {
      if (
        Object.keys(this.fields[index])[0] == "firstName" ||
        Object.keys(this.fields[index])[0] === "lastName"        
      ) {
        this.$alert("Вы не можете удалить это поле");
        return;
      }
      this.$confirm(
        `Вы уверены что хотите удалить поле ${
          Object.keys(this.fields[index])[0]
        } ?`
      ).then(() => {
        this.fields.splice(index, 1);
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
label {
  color: #3e3e3e;
}
.add-contact-form {
  position: relative;
  background: white;
  width: 70%;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.add-contact-form-item {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 5px;
}
.add-contact-form button {
  background: #8360c3;
  color: white;
}
h2 {
  color: #8360c3;
  margin: 10px;
}
.icons8-trash-can {
  margin-left: 10px;
  border-radius: 50%;
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzgzNjBjMyI+PHBhdGggZD0iTTY0LjcyMzk2LC0wLjIyMzk2Yy0zLjMzMTM4LDAgLTYuMDQ2ODgsMi43MTU0OSAtNi4wNDY4OCw2LjA0Njg4djIwLjYwNDE3Yy0xOS40ODQzNywyLjIxMTU5IC0zMi45MjE4Nyw2LjY5MDc2IC0zMi45MjE4NywxMS44Njk3OXY5Ljg1NDE3YzAsMi4wMTU2MyAyLjE1NTYsMy44NjMyOCA1LjgyMjkyLDUuNTk4OTZjOS42MDIyMiw0LjUwNzE2IDMwLjM3NDM1LDcuNjE0NTggNTQuNDIxODgsNy42MTQ1OGMyNC4wNzU1MiwwIDQ0Ljc5MTY3LC0zLjEwNzQyIDU0LjQyMTg4LC03LjYxNDU4YzMuNjM5MzMsLTEuNzM1NjcgNS44MjI5MiwtMy41ODMzMyA1LjgyMjkyLC01LjU5ODk2di05Ljg1NDE3YzAsLTUuMzQ3MDEgLTE0LjUyOTMsLTkuOTk0MTQgLTM1LjE2MTQ2LC0xMi4wOTM3NXYtMjAuMzgwMjFjMCwtMy4zMzEzOCAtMi43MTU0OSwtNi4wNDY4NyAtNi4wNDY4NywtNi4wNDY4N3pNNzAuNzcwODMsMTAuNzVoMjguNDQyNzFjMC42MTU4OSwwIDAuODk1ODMsMi44ODM0NyAwLjg5NTgzLDYuNDk0Nzl2OC4wNjI1Yy00LjU2MzE1LC0wLjIyMzk2IC05LjE4MjI5LC0wLjQ0NzkyIC0xNC4xMDkzNywtMC40NDc5MmMtNS4wOTUwNSwwIC0xMC4wNzgxMiwwLjE5NTk3IC0xNC43ODEyNSwwLjQ0NzkybC0xLjU2NzcxLDAuMjIzOTZ2LTguMjg2NDZjMCwtMy42MTEzMyAwLjUzMTksLTYuNDk0NzkgMS4xMTk3OSwtNi40OTQ3OXpNMzQuMjY1NjMsNjguMzA3MjljLTAuNjQzODgsMC42NzE4OCAtMC45Nzk4MiwxLjI4Nzc2IC0xLjExOTc5LDIuMDE1NjN2MC40NDc5MmMwLDAuMTExOTggLTAuMDI3OTksMC4zNjM5MyAwLDAuNDQ3OTJsNC4wMzEyNSw4NC4yMDgzM2MwLjM2MzkzLDYuNjA2NzcgOC4wMDY1MSwxNi41NzI5MiA0OC44MjI5MiwxNi41NzI5MmM0MC44MTY0MSwwIDQ4LjQ1ODk5LC05Ljk2NjE1IDQ4LjgyMjkyLC0xNi41NzI5Mmw0LjAzMTI1LC04NC4yMDgzM2MwLC0wLjExMTk4IDAsLTAuMzM1OTQgMCwtMC40NDc5MnYtMC40NDc5MmMtMC4xMTE5OCwtMC43Mjc4NiAtMC40NzU5MSwtMS4zNDM3NSAtMS4xMTk3OSwtMi4wMTU2MmMtNS4yNjMwMiw1LjM0NzAxIC0yNi40NTUwOCw2LjA0Njg4IC01MS43MzQzNyw2LjA0Njg4Yy0yNS4yNzkzLDAgLTQ2LjQ0MzM2LC0wLjY5OTg3IC01MS43MzQzNywtNi4wNDY4N3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==")
    50% 50% no-repeat;
  background-size: 80%;
  transition: ease-in-out 0.3s;
}
.icons8-trash-can:hover {
  box-shadow: 0 0 15px rgb(74, 13, 131);
}
#close {
  position: absolute;
  left: 90%;
}

@media only screen and (max-width: 600px) {
  .add-contact-form-item {
    flex-direction: column;
  }
  input {
    width: 80%;
  }
  #close {
    padding: 5px;
  }
}
</style>