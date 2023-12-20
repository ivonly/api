const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();
const port = 5000;

// Inisialisasi Firebase Admin SDK
const serviceAccount = require('./key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Firebase Firestore instance
const db = admin.firestore();

// Endpoint untuk menyimpan data kuisioner ke Firebase
app.post('/kuisioner', async (req, res) => {
  try {
    const { age, gender, familyDiabetes, physicallyActive, smoking, alcohol, sleepCategory } = req.body;

    const kuisionerData = {
      age,
      gender,
      familyDiabetes,
      physicallyActive,
      smoking,
      alcohol,
      sleepCategory,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('kuisioner').add(kuisionerData);

    res.json({ message: 'Data kuisioner berhasil disimpan!' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menyimpan data kuisioner.' });
  }
});

// Read '/kuisioner'
app.get('/kuisioner', async (req, res) => {
  try {
    // pembacaan data kuisioner dari Firebase
    const kuisionerSnapshot = await db.collection('kuisioner').get();
    const kuisionerList = [];
    kuisionerSnapshot.forEach((doc) => {
      kuisionerList.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    res.json(kuisionerList);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data kuisioner.' });
  }
});

// Update operation for '/kuisioner'
app.put('/kuisioner/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    // operasi pembaruan data kuisioner berdasarkan ID tertentu
    await db.collection('kuisioner').doc(id).update(newData);

    res.json({ message: `Data kuisioner dengan ID ${id} berhasil diperbarui!` });
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui data kuisioner.' });
  }
});

// Delete operation for '/kuisioner'
app.delete('/kuisioner/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // operasi penghapusan data kuisioner berdasarkan ID tertentu
    await db.collection('kuisioner').doc(id).delete();

    res.json({ message: `Data kuisioner dengan ID ${id} berhasil dihapus!` });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus data kuisioner.' });
  }
});

// Endpoint untuk melakukan prediksi
app.post('/predict', async (req, res) => {
  try {
    // proses prediksi
    // ...

    await db.collection('predictions').add({ result: 'Hasil prediksi' });

    res.json({ message: 'Hasil prediksi berhasil disimpan!' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal melakukan prediksi.' });
  }
});

// Read operation for '/predict'
app.get('/predict', async (req, res) => {
  try {
    // operasi pembacaan data prediksi dari Firebase
    // ...

    res.json({ message: 'Mengambil data prediksi berhasil!' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data prediksi.' });
  }
});

// Update operation for '/predict'
app.put('/predict/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // operasi pembaruan data prediksi berdasarkan ID tertentu
    // ...

    res.json({ message: `Data prediksi dengan ID ${id} berhasil diperbarui!` });
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui data prediksi.' });
  }
});

// Delete operation for '/predict'
app.delete('/predict/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // operasi penghapusan data prediksi berdasarkan ID tertentu
    // ...

    res.json({ message: `Data prediksi dengan ID ${id} berhasil dihapus!` });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus data prediksi.' });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan pada http://localhost:${port}`);
});