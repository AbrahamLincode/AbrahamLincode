<template>
  <div>
    <h1>Seçili Yiyeğin Kalorisi:</h1>
    <table class="table-auto border-collapse border border-gray-400 mt-4">
      <thead>
        <tr>
          <th class="px-4 py-2 border">Besin</th>
          <th class="px-4 py-2 border">Kalori</th>
          <th class="px-4 py-2 border">Ekle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="besin in besinListesi" :key="besin.ad">
          <td class="px-4 py-2 border">{{ besin.ad }}</td>
          <td class="px-4 py-2 border">{{ besin.kaloriler }}</td>
          <td class="px-4 py-2 border">
            <button
              type="button"
              class="bg-green-600 text-white px-4 py-2 rounded-lg"
              @click="seciliBesinEkle(besin)"
            >
              Ekle
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <besin-list
      :besin-items="SecilenBesinler"
      @besinSil="besinSil"
    ></besin-list>
    <div class="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 class="text-2xl font-bold mb-4">Eklenen Yiyecekler</h2>
      <form @submit.prevent="besinEkle">
        <input
          type="text"
          v-model="yeniBesin.ad"
          placeholder="Besin Adı"
          class="border-2 border-gray-300 p-2 rounded-lg w-full mb-4"
        />
        <input
          type="number"
          v-model="yeniBesin.kaloriler"
          placeholder="Kalori"
          class="border-2 border-gray-300 p-2 rounded-lg w-full mb-4"
        />
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Besin Ekle
        </button>
      </form>
      <ul class="mt-6">
        <li
          v-for="besin in besinler"
          :key="besin.id"
          class="border-b border-gray-300 py-2"
        >
          {{ besin.ad }} - {{ besin.kaloriler }} kalori
          <button
            type="button"
            class="bg-red-600 text-white px-4 py-2 rounded-lg float-right"
            @click="besinSil(besin.id)"
          >
            Sil
          </button>
        </li>
      </ul>
      <p class="text-xl mt-6">
        Toplam Kalori: <span class="font-bold">{{ toplamKalori }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      besinler: [],
      yeniBesin: {
        id: null,
        ad: "",
        kaloriler: 0,
      },
      SecilenBesinler: [],
      besinListesi: [
        { ad: "Elma", kaloriler: 52 },
        { ad: "Portakal", kaloriler: 47 },
        { ad: "Muz", kaloriler: 89 },
        { ad: "Kivi", kaloriler: 61 },
        { ad: "Çilek", kaloriler: 32 },
        { ad: "Kiraz", kaloriler: 50 },
      ],
    };
  },
  computed: {
    toplamKalori() {
      return this.besinler.reduce(
        (toplam, besin) => toplam + Number(besin.kaloriler),
        0
      );
    },
  },
  methods: {
    besinEkle() {
      if (this.yeniBesin.ad && this.yeniBesin.kaloriler > 0) {
        this.yeniBesin.id = Date.now();
        this.besinler.push({ ...this.yeniBesin });
        this.yeniBesin.ad = "";
        this.yeniBesin.kaloriler = 0;
      }
    },
    besinSil(id) {
      this.besinler = this.besinler.filter((besin) => besin.id !== id);
    },
    seciliBesinEkle(besin) {
      this.SecilenBesinler.push(besin);
      this.besinler.push(besin);
    },
  },
};
</script>
