<template>
  <div>
    <h1 class="text-center">Welcome {{ getUser.email }}</h1>
    <button @click="showForm = !showForm" class="btn btn-info my-4">Create a Note</button>
    <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
      <form v-if="showForm" @submit.prevent="addNote(newNote)">
        <div class="form-group">
          <label for="title">Title</label>
          <input v-model="newNote.title" type="text" class="form-control" id="title" aria-describedby="titleHelp" placeholder="Title here..." required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="newNote.note" class="form-control" id="description" placeholder="Description here..." rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Create Note</button>
     </form>
    </transition>
    <section class="mt-5">
      <div v-for="note in getNotes" class="card border-info mb-3" :key="note._id">
        <div class="card-header"><h1>{{ note.title }}</h1></div>
        <div class="card-body">
          <p class="card-text" v-html="renderMarkdown(note.note)"></p>
        </div>
    </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MarkdownIt from 'markdown-it';
import MDemoji from 'markdown-it-emoji';

const md = MarkdownIt();
md.use(MDemoji);

export default {
  name: 'dashboard',
  data() {
    return {
      showForm: false,
      newNote: {
        title: '',
        note: ''
      }
    }
  },
  mounted() {
    this.getUserFromToken();
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('notes', ['getNotes'])
  },
  methods: {
    ...mapActions('auth', ['getUserFromToken', 'logout']),
     ...mapActions('notes', ['addNote']),
     renderMarkdown(note) {
       return md.render(note)
     }
  }
}
</script>

<style>

</style>
