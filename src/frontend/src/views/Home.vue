<template>
  <div class="container">
     <a href="https://notesauthentication.auth.us-east-2.amazoncognito.com/logout?client_id=4hpus8ia5pc3fjs9j5v0fr2qpo&logout_uri=http://localhost:8080/logout">Logout</a>
    <h1>My Notes</h1>
    <ul>
      <li v-for="note in notes" style="margin-top:5px;" :key="note.id">
        {{ note.content }}
        <button @click="deleteNote(note.id)">Delete</button>
      </li>
    </ul>
    <textarea v-model="newNote" placeholder="Enter your note"></textarea>
    <button @click="saveNote">Save Note</button>
  </div>
</template>

<script>
import apiClient from '../services/api';

export default {
  data() {
    return {
      notes: [],
      newNote: ''
    };
  },
  mounted() {
    this.fetchNotes();
  },
  methods: {
    async fetchNotes() {
      const response = await apiClient.get('/notes');
      this.notes = response.data;
    },
    async saveNote() {
      if (this.newNote.trim() === '') return;
      await apiClient.post('/notes', { content: this.newNote });
      this.newNote = '';
      this.fetchNotes();
    },
    async deleteNote(id) {
      await apiClient.delete(`/notes/${id}`);
      this.fetchNotes();
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-top: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

li button:hover {
  background-color: #ff3333;
}

textarea {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}
</style>
