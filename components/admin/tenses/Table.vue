<template>
  <div>
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 rtl:text-right">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th
              v-for="item in headers"
              :key="item"
              scope="col"
              class="px-6 py-3"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody v-if="dataTable?.length">
          <tr
            v-for="(item, index) in dataTable"
            :key="item.id"
            class="border-b odd:bg-white even:bg-gray-50"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ (pagination.currentPage - 1) * 10 + index + 1 }}
            </th>
            <td class="px-6 py-4">{{ item.title }}</td>
            <td class="px-6 py-4">{{ item?.slug || "sssssssssss" }}</td>
            <td class="px-6 py-4">{{ item.description }}</td>
            <td class="flex gap-4 px-6 py-4">
              <a
                @click="redirectEdit(item.id)"
                class="font-medium text-blue-600 cursor-pointer hover:underline"
                >Chỉnh sửa</a
              >
              <a
                @click="handleConfirm(item.id)"
                class="font-medium text-red-600 cursor-pointer hover:underline"
                >Xóa</a
              >
            </td>
          </tr>
        </tbody>
        <tbody class="h-60 flex justify-center items-center w-full" v-else>
          <tr>
            <td :colspan="5">No data available.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalText
      :isOpen="isOpenModalDelete"
      title="Cảnh báo"
      content="Bạn có chắc chắn muốn xóa bài viết này không?"
      btnClose="Hủy"
      btnSubmit="Xóa"
      @handleSubmit="handleDelete"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalText from "~/components/Modal/ModalText.vue";

export default {
  name: "Table",
  components: { ModalText },
  props: {
    headers: {
      type: Array,
      default: [],
    },
    dataTable: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      idDelete: "",
      isOpenModalDelete: false,
    };
  },
  computed: {
    ...mapGetters("admin", ["listTenses", "pagination"]),
  },
  methods: {
    ...mapActions("admin", ["deleteTense", "getTenses"]),
    ...mapActions(["setNotify"]),
    handleConfirm(id) {
      this.idDelete = id;
      this.isOpenModalDelete = true;
    },
    handleClose() {
      this.isOpenModalDelete = false;
    },
    async handleDelete() {
      try {
        await this.deleteTense(this.idDelete);
        this.setNotify({
          isOpen: true,
          text: "Xóa bài viết thành công",
          type: "success",
        });
        await this.getTenses(this.pagination);
      } catch (error) {}
    },
    redirectEdit(id) {
      this.$router.push(`/admin/tenses/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
