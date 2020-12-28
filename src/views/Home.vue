<template>
  <div class="home">
    <section class="main">
      <div class="search-wrapper">
        <input type="text" v-model="search" placeholder="Найти контакт" />
      </div>
      <div class="contact-list">
        <div
          class="contact-list-item"
          v-for="contact in filteredList"
          :item="contact"
          :key="contact.id"
        >
          <div>
            <h3>{{ contact.firstName }} {{ contact.lastName }}</h3>
            <p>Номер телефона: {{ contact.number }}</p>
            <router-link :to="{ name: 'Contact', params: { id: contact.id } }">
              <button>Вся информация</button>
            </router-link>
            <button @click="deleteContact(contact.id)">Удалить контакт</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    search: "",
  }),
  computed: {
    contactList() {
      return this.$store.getters.contacts;
    },
    filteredList() {
      return this.contactList.filter((contact) => {
        let fullName = contact.firstName + contact.lastName;
        return fullName.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    deleteContact(id) {
      if (confirm(`Вы уверены что хотите удалить контакт ?`)) {
      this.$store.dispatch("removeContact", id);
      }
    },
  },
};
</script>

<style scoped>
.contact-list {
  width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.contact-list-item {
  width: fit-content;
  margin: 5px;
  padding: 10px;
  border: 1px solid gray;
}
</style>