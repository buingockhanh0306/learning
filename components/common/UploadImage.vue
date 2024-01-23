<template>
  <div class="flex justify-start mt-8">
    <div class="w-full bg-transparent rounded-lg">
      <div class="w-full m-4">
        <label class="inline-block mb-2 font-semibold text-textPrimary"
          >Ảnh thumbnail</label
        >
        <div class="flex justify-center w-full">
          <div class="flex items-center justify-center w-2/3 h-64">
            <label
              @click="handleClickUpload"
              class="flex flex-col w-full h-64 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300"
            >
              <div
                v-if="!imageUrl && !initImage"
                class="flex items-center justify-center h-full"
              >
                <div class="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p
                    class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"
                  >
                    Attach a file
                  </p>
                </div>
              </div>
              <!-- <div class="flex flex-col items-center justify-center w-full"> -->
              <img
                v-else
                :src="initImage || imageUrl"
                alt=""
                class="object-cover h-full"
              />
              <!-- </div> -->
              <input
                ref="fileInput"
                type="file"
                class="opacity-0"
                @change="handleClickUpload"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UploadImage",
  data() {
    return {
      imageUrl: "",
    };
  },
  computed: {
    ...mapGetters("admin", ["initImage"]),
  },
  methods: {
    ...mapActions("admin", ["uploadImage", "setImageUpload", "setInitImage"]),
    async handleClickUpload() {
      const fileInput = this.$refs.fileInput;
      if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        this.setInitImage(null);
        this.imageUrl = URL.createObjectURL(selectedFile);
        await this.uploadImage(selectedFile);
        console.log(selectedFile.name);
        this.setImageUpload(selectedFile.name); //lấy tên ảnh để lưu vào db, sau còn lấy ra
      } else {
        this.imageUrl = null;
      }
    },
  },
};
</script>
