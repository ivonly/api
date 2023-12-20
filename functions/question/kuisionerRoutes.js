const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Firebase Firestore instance
const db = admin.firestore();

router.post('/', async (req, res) => {
  // ... Endpoint POST /kuisioner
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

router.get('/', async (req, res) => {
  // ... Endpoint GET /kuisioner
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

router.put('/:id', async (req, res) => {
  // ... Endpoint PUT /kuisioner/:id
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

router.delete('/:id', async (req, res) => {
  // ... Endpoint DELETE /kuisioner/:id
  try {
    const { id } = req.params;

    // operasi penghapusan data kuisioner berdasarkan ID tertentu
    await db.collection('kuisioner').doc(id).delete();

    res.json({ message: `Data kuisioner dengan ID ${id} berhasil dihapus!` });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus data kuisioner.' });
  }
});

module.exports = router;
