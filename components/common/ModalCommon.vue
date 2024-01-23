<template>
  <div class="absolute top-0 left-0 right-0">
    <div :class="isOpen && 'modal-overlay'" @click="closeModal"></div>
    <transition name="fade">
      <div v-if="isOpen" class="modal">
        <div class="modal-content mobile:w-3/4 laptop:w-auto">
          <slot name="content"></slot>
          <div
            class="flex gap-4"
            :class="btnClose ? 'justify-end' : 'justify-center'"
          >
            <button
              v-if="btnClose"
              @click="closeModal"
              class="px-4 py-2 mt-4 font-bold text-white bg-gray-400 rounded hover:bg-gray-500"
            >
              {{ btnClose }}
            </button>
            <button
              @click="handleSubmit"
              class="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
              {{ btnSubmit }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ModalCommon",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    btnClose: {
      type: String,
      default: "",
    },
    btnSubmit: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("handleClose");
    },
    handleSubmit() {
      this.$emit("handleSubmit");
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Your modal styles go here */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: none;
  z-index: 99;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 10000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
