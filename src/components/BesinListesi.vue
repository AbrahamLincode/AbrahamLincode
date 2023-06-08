<template>
    <!-- Toplam Kalori Bilgi Paneli -->
<div class="bg-sky-700 text-white p-4 rounded-lg mb-6">
  <div class="flex items-center">
    <div class="flex-1 text-center">
      <h1 class="text-3xl font-bold">
        Toplam Kalori: {{ toplamKaloriler }}
      </h1>
    </div>
  </div>
</div>
    <div class="container mx-auto">
      <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"  @click="showModal = true">
        Besin Ekle
      </button>
      <table class="table-auto w-full mt-4">
        <thead class="bg-sky-700 text-white">
          <tr>
            <th class="border px-4 py-2">Seç</th>
            <th class="border px-4 py-2">Besin</th>
            <th class="border px-4 py-2">Adet/Gramaj</th>
            <th class="border px-4 py-2">Kalori</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index" :class="index % 2 ? 'bg-sky-100' : 'bg-sky-200'">
          <td class="border px-4 py-2 w-20">
            <div class="flex items-center">
              <input type="checkbox" class="w-5 h-5" @change="toggleSelected(index)" />
              <button class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 px-2 mx-2 rounded" @click="prepareUpdate(index)">
                Güncelle
              </button>
            </div>
          </td>

            <td class="border px-4 py-2 ">{{ item.besin }}</td>
            <td class="border px-4 py-2 w-10    ">{{ item.gramaj }}</td>
            <td class="border px-4 py-2 w-10">{{ item.kalori }}</td>
          </tr>
        </tbody>
      </table>
  

  
      <!-- Besin ekleme modali ve besin ekleme formu  -->
        <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
            <div  class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"  aria-hidden="true"  @click="showModal = false"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-sky-200 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class=" bg-sky-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <!-- Besin ekleme formu -->
            <form @submit.prevent="addItem">
              <label for="besin" class="block">Besin Adı:</label>
              <input type="text" id="besin" v-model="yeniBesin.name" class="border-2 border-gray-300 p-2 rounded" />

              <label for="gramaj" class="block mt-2">Adet/Gramaj:</label>
              <input type="number" id="gramaj" v-model="yeniBesin.gramaj" class="border-2 border-gray-300 p-2 rounded" />

              <label for="kalori" class="block mt-2">Kalori:</label>
              <input type="number" id="kalori" v-model="yeniBesin.kalori" class="border-2 border-gray-300 p-2 rounded" />

              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded mt-4">
                Besin Ekle
              </button>
            </form>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded"
              @click="showModal = false"
            >
              İptal
            </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Besin Güncelle Modalı -->
        <div v-if="showUpdateModal" class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!-- ... -->
            <div
              class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Besin Güncelle
                    </h3>
                    <div class="mt-2">
                      <input
                        v-model="guncelleBesin.kalori"
                        type="number"
                        placeholder="Yeni Kalori Değeri"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  @click="updateItem"
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Güncelle
                </button>
                <button
                  @click="showUpdateModal = false"
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
  
  
  <script>
  export default {
    data() {
      return {
        items: [
          { besin: "Elma", gramaj: 1, kalori: 95, selected: false },
          { besin: "Muz", gramaj: 1, kalori: 89, selected: false },
          { besin: "Portakal", gramaj: 1, kalori: 47, selected: false },
        ],
        yeniBesin: {
          name: "",
          gramaj: 0,
          kalori: 0,
        },
        showModal: false,
        recentlyAddedIndex: null,
        showUpdateModal: false,
        guncelleBesin: {
          index: null,
          kalori: 0,
        },
      };
    },
    computed: {
  toplamKaloriler() {
    return this.items
      .filter((item) => item.selected)
      .reduce((toplam, item) => toplam + item.kalori * item.gramaj, 0);
  },
},

    methods: {
      toggleSelected(index) {
        this.items[index].selected = !this.items[index].selected;
      },
      addItem() {
        if (this.yeniBesin.name && this.yeniBesin.gramaj > 0 && this.yeniBesin.kalori > 0) {
          this.items.push({
            besin: this.yeniBesin.name,
            gramaj: this.yeniBesin.gramaj,
            kalori: this.yeniBesin.kalori,
            selected: false,
          });
  
          // Yeni eklenen besinin indeksini kaydedin
          this.recentlyAddedIndex = this.items.length - 1;
  
          // Formu temizle
          this.yeniBesin.name = "";
          this.yeniBesin.gramaj = 0;
          this.yeniBesin.kalori = 0;
  
          // Modalı kapat
          this.showModal = false;
        } else {
          alert("Lütfen tüm alanları doğru doldurun.");
        }
      },
      prepareUpdate(index) {
       this.guncelleBesin.index = index;
       this.guncelleBesin.kalori = this.items[index].kalori;
       this.showUpdateModal = true;
     },
     updateItem() {
    if (this.guncelleBesin.kalori > 0) {
      this.items[this.guncelleBesin.index].kalori = this.guncelleBesin.kalori;

      // Güncelleme işlemi tamamlandıktan sonra modalı kapat
      this.showUpdateModal = false;
    } else {
      alert("Lütfen geçerli bir kalori değeri girin.");
    }
  },
    },
  };
  </script>
    
  
  ``
  