import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [
      { id: "1", firstName: "Иван", lastName: "Иванов", number: 88121234567, email: "ivan@inbox.ru" },
      { id: "2", firstName: "Олег", lastName: "Олегов", number: 88127654321, email: "oleg@inbox.ru" },
      { id: "3", firstName: "Мария", lastName: "Семенова", number: 88127946134, email: "maria@Minbox.ru" },
    ], 
    restore:[]  // restore хранит значение полей до внесения изменения, поэтому при отмене последнего действия можно вернуть предыдущее значение store
  },
  mutations: {
    ADD_CONTACT(state, contact) {
      state.contacts.push(contact)
    },
    REMOVE_CONTACT(state, id) {
      state.contacts = state.contacts.filter(a => a.id !== id)
    },
    REMOVE_FIELD(state, field) {
      let contactEdit = state.contacts.filter(a => a.id === field.id)
      state.contacts = state.contacts.filter(a => a.id !== field.id)
      let key = Object.keys(field)[1]
      delete contactEdit[0][key]
      state.contacts.push(contactEdit[0])
    },
    UPDATE_CONTACT(state, contact) {
      state.contacts = state.contacts.filter(a => a.id !== contact.id)
      state.contacts.push(contact)
    },
    RESTORE_ACTION(state) {
      state.contacts = [...state.restore]
    },
    COPY_STATE(state) {
      state.restore = JSON.parse(JSON.stringify(state.contacts))
    }
  },
  actions: {
    addContact(context, contact) {
      context.commit("COPY_STATE")
      context.commit("ADD_CONTACT", contact);
    },
    removeContact(context, id) {
      context.commit("COPY_STATE")
      context.commit("REMOVE_CONTACT", id);
    },
    removeField(context, field) {
      context.commit("COPY_STATE")
      context.commit("REMOVE_FIELD", field);
    },
    updateContact(context, contact) {
      context.commit("COPY_STATE")
      context.commit("UPDATE_CONTACT", contact);  
    },
    restore(context) {
      context.commit("RESTORE_ACTION");  
    }
  },
  getters: {
    contacts: (state) => state.contacts,
    restore: (state) => state.restore,
  },
  modules: {
  }
})
